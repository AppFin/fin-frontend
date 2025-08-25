import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { catchError, first, firstValueFrom, Observable, of, tap, throwError, } from 'rxjs';
import { UserProps } from '../../models/authentication/user-props';
import { LoginOutput } from '../../models/authentication/login-output';
import { ensureTrailingSlash } from '../../functions/ensure-trailing-slash';
import { LoginInput } from '../../models/authentication/login-input';
import { AuthGoogleService } from './auth-google.service';
import { ResetPasswordInput } from '../../models/authentication/reset-password-input';
import { ValidationResultDto } from '../../../shared/models/validation-results/validation-result-dto';
import { ResetPasswordErrorCode } from '../../enums/authentication/reset-password-error-code';

export type ExternalLoginProvider = 'Google';

const ONE_HOUR_IN_SECONDS = 60 * 60;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUserSubject = signal<UserProps | null>(null);
  public readonly currentUser = this.currentUserSubject.asReadonly();
  private readonly isAuthenticatedSubject = signal<boolean>(false);
  public readonly isAuthenticated = this.isAuthenticatedSubject.asReadonly();

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly googleAuthService = inject(AuthGoogleService);

  private readonly API_URL =
    ensureTrailingSlash(environment.apiUrl) + 'authentications/';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private tokenRefreshTimer: any;

  constructor() {
    this.initializeAuth();
  }

  public async login(input: LoginInput): Promise<void> {
    const request = this.http
      .post<LoginOutput>(`${this.API_URL}login`, input)
      .pipe(
        tap((response) => {
          this.handleLogin(response);
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 422) {
            this.handleLogin(error.error);
          }
          return throwError(() => error);
        })
      );
    await firstValueFrom(request);
  }

  public async logout(): Promise<void> {
    const request = this.http
      .post(`${this.API_URL}logged-out`, null)
      .pipe(catchError(() => of()));
    await firstValueFrom(request);

    this.clearAuth();
    await this.router.navigate(['/authentication/login']);
  }

  public async externalLogin(provider: ExternalLoginProvider): Promise<void> {
    try {
      let loginOutput: LoginOutput;

      switch (provider) {
        case 'Google':
          loginOutput = await this.googleAuthService.loginWithGoogle();
          break;
      }

      if (!!loginOutput) await this.handleLogin(loginOutput);
    } catch (error) {
      console.error(error);
    }
  }

  public async sendResetPasswordEmail(email: string): Promise<boolean> {
    const request = this.http.post<void>(
      `${this.API_URL}send-reset-password-email`,
      { email }
    );
    return await firstValueFrom(request)
      .then(() => true)
      .catch(() => {
        this.emmitSendResetErrorMessage();
        return false;
      });
  }

  public async resetPassword(input: ResetPasswordInput): Promise<boolean> {
    const request = this.http
      .post<boolean>(`${this.API_URL}reset-password`, input)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 422) {
            return of(
              error.error as ValidationResultDto<
                boolean,
                ResetPasswordErrorCode
              >
            );
          }
          return throwError(() => error);
        })
      );
    const result = await firstValueFrom(request);

    const success =
      (typeof result === 'boolean' && result) ||
      (typeof result === 'object' && result.success);
    const errorCode = typeof result === 'object' ? result.errorCode : null;

    if (!success && errorCode) this.emmitResetErrorMessage(errorCode);

    return success;
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private startTokenRefreshTimer(): void {
    this.clearTokenRefreshTimer();

    const token = this.getToken();
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilRefresh =
        (payload.exp - currentTime - ONE_HOUR_IN_SECONDS) * 1000;

      if (timeUntilRefresh > 0) {
        this.tokenRefreshTimer = setTimeout(() => {
          this.performTokenRefresh();
        }, timeUntilRefresh);
      } else {
        this.performTokenRefresh();
      }
    } catch (error) {
      console.error('Error setting refresh timer:', error);
    }
  }

  private performTokenRefresh(): void {
    this.refreshToken()
      .pipe(first())
      .subscribe({
        error: (error) => {
          console.error('Token refresh failed:', error);
          this.logout();
        },
      });
  }

  private clearTokenRefreshTimer(): void {
    if (this.tokenRefreshTimer) {
      clearTimeout(this.tokenRefreshTimer);
      this.tokenRefreshTimer = null;
    }
  }

  private refreshToken(): Observable<LoginOutput> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken)
      return throwError(() => new Error('No refresh token available'));

    return this.http
      .post<LoginOutput>(`${this.API_URL}refresh-token`, { refreshToken })
      .pipe(
        tap((response) => {
          this.setToken(response.token);
          this.setRefreshToken(response.refreshToken);
          this.startTokenRefreshTimer();
        }),
        catchError((error: HttpErrorResponse) => {
          this.clearAuth();
          this.emmitLoginErrorMessage(error.error);
          return throwError(() => error);
        })
      );
  }

  private initializeAuth(): void {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      this.setCurrentUser();
    } else if (token) {
      this.clearAuth();
    }
  }

  private clearAuth(): void {
    this.clearTokenRefreshTimer();
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    this.currentUserSubject.set(null);
    this.isAuthenticatedSubject.set(false);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private setCurrentUser(): void {
    const token = this.getToken();
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const user = new UserProps({
        userId: payload.userId || '',
        name: payload['unique_name'] || '',
        role: payload.role || 'User',
        imageUrl: payload.imageUrl || '',
        tenantId: payload.tenantId || '',
      });

      this.currentUserSubject.set(user);
      this.isAuthenticatedSubject.set(true);
    } catch (error) {
      console.error('Error parsing token:', error);
      this.clearAuth();
    }

    this.startTokenRefreshTimer();
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }

  private async handleLogin(response: LoginOutput): Promise<void> {
    if (response.success) {
      this.setToken(response.token);
      this.setRefreshToken(response.refreshToken);
      this.setCurrentUser();
      await this.router.navigate(['/']);
    } else this.emmitLoginErrorMessage(response);
  }

  private emmitLoginErrorMessage(error: LoginOutput) {
    // TODO here we notify user via snack ou dialog.
  }

  private emmitResetErrorMessage(errorCode: ResetPasswordErrorCode) {
    // TODO here we notify user via snack ou dialog.
    // If error codeis invalid token bring user to login page.
  }

  private emmitSendResetErrorMessage() {
    // TODO here we notify user via snack ou dialog.
  }
}
