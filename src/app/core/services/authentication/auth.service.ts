import { inject, Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  firstValueFrom,
  of,
  tap,
  throwError,
} from 'rxjs';
import { UserProps } from '../../models/authentication/user-props';
import { LoginOutput } from '../../models/authentication/login-output';
import { LoginInput } from '../../models/authentication/login-input';
import { AuthGoogleService } from './auth-google.service';
import { ResetPasswordInput } from '../../models/authentication/reset-password-input';
import { ResetPasswordErrorCode } from '../../enums/authentication/reset-password-error-code';
import { AuthApiService } from './auth-api.service';
import { jwtDecode } from 'jwt-decode';
import { StorageService } from '../app/storage.service';
import { NotifyService } from '../notifications/notify.service';
import { NotificationSeverity } from '../../enums/notifications/notification-severity';
import { LoginErrorCode } from '../../enums/authentication/login-error-code';

export type ExternalLoginProvider = 'Google';

const ONE_HOUR_IN_SECONDS = 60 * 60;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUserSubject = signal<UserProps | null>(null);
  public readonly currentUser = this.currentUserSubject.asReadonly();
  private readonly isAuthenticatedSubject = new BehaviorSubject(false);
  public readonly isAuthenticatedSub =
    this.isAuthenticatedSubject.asObservable();
  public get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private readonly api = inject(AuthApiService);
  private readonly router = inject(Router);
  private readonly storageService = inject(StorageService);
  private readonly googleAuthService = inject(AuthGoogleService);
  private readonly notifyService = inject(NotifyService);

  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private tokenRefreshTimer: any;

  constructor() {
    this.initializeAuth();
  }

  public async login(input: LoginInput): Promise<void> {
    const request = this.api.login(input).pipe(
      tap((response) => {
        this.handleLogin(response);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          this.handleLogin(error.error);
          return of(true);
        }
        return throwError(() => error);
      })
    );
    await firstValueFrom(request);
  }

  public async logout(): Promise<void> {
    try {
      const request = this.api.logout().pipe(catchError(() => of()));
      await firstValueFrom(request);
    } finally {
      this.clearAuth();
      await this.router.navigate(['/authentication/login']);
    }
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
    return await firstValueFrom(this.api.sendResetPasswordEmail(email))
      .then(() => true)
      .catch(() => {
        this.emmitSendResetErrorMessage();
        return false;
      });
  }

  public async resetPassword(input: ResetPasswordInput): Promise<boolean> {
    const result = await firstValueFrom(this.api.resetPassword(input));

    const success =
      (typeof result === 'boolean' && result) ||
      (typeof result === 'object' && result.success);
    const errorCode = typeof result === 'object' ? result.errorCode : null;

    if (!success && errorCode) this.emmitResetErrorMessage(errorCode);

    return success;
  }

  public getToken(): string | null {
    return this.storageService.loadFromLocalStorage<string>(this.TOKEN_KEY);
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
        this.tokenRefreshTimer = setTimeout(async () => {
          this.performTokenRefresh();
        }, timeUntilRefresh);
      } else {
        this.performTokenRefresh();
      }
    } catch (error) {
      console.error('Error setting refresh timer:', error);
    }
  }

  private async performTokenRefresh(): Promise<void> {
    await this.refreshToken().catch((error) => {
      console.error('Token refresh failed:', error);
      this.logout();
    });
  }

  private clearTokenRefreshTimer(): void {
    if (this.tokenRefreshTimer) {
      clearTimeout(this.tokenRefreshTimer);
      this.tokenRefreshTimer = null;
    }
  }

  private refreshToken(): Promise<LoginOutput> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    const request = this.api.refreshToken(refreshToken).pipe(
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
    return firstValueFrom(request);
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
    this.storageService.removeFromLocalStorage(this.TOKEN_KEY);
    this.storageService.removeFromLocalStorage(this.REFRESH_TOKEN_KEY);
    this.currentUserSubject.set(null);
    this.isAuthenticatedSubject.next(false);
  }

  private setToken(token: string): void {
    this.storageService.saveToLocalStorage(this.TOKEN_KEY, token);
  }

  private setRefreshToken(refreshToken: string): void {
    this.storageService.saveToLocalStorage(
      this.REFRESH_TOKEN_KEY,
      refreshToken
    );
  }

  private getRefreshToken(): string | null {
    return this.storageService.loadFromLocalStorage<string>(
      this.REFRESH_TOKEN_KEY
    );
  }

  private setCurrentUser(): void {
    const token = this.getToken();
    if (!token) return;
    try {
      const payload = jwtDecode(token) as {
        userId?: string;
        role?: 'Admin' | 'User';
        imageUrl?: string;
        tenantId?: string;
        unique_name?: string;
      };

      const user = new UserProps({
        userId: payload.userId || '',
        name: payload.unique_name || '',
        role: payload.role || 'User',
        imageUrl: payload.imageUrl || '',
        tenantId: payload.tenantId || '',
      });

      this.currentUserSubject.set(user);
      this.isAuthenticatedSubject.next(true);
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
    let errorMsg: string;

    switch (error.errorCode) {
      case LoginErrorCode.EmailNotFound:
        errorMsg = 'emailNotFound';
        break;
      case LoginErrorCode.DoNotHasPassword:
        errorMsg = 'doNotHasPassword';
        break;
      case LoginErrorCode.MaxAttemptsReached:
        errorMsg = 'maxAttemptsReached';
        break;
      case LoginErrorCode.InactivatedUser:
        errorMsg = 'inactivatedUser';
        break;
      case LoginErrorCode.InvalidPassword:
        errorMsg = 'invalidPassword';
        break;
      case LoginErrorCode.InvalidRefreshToken:
        errorMsg = 'invalidRefreshToken';
        break;
      case LoginErrorCode.DifferentGoogleAccountLinked:
        errorMsg = 'differentGoogleAccountLinked';
        break;
      case LoginErrorCode.CantCreateUser:
        errorMsg = 'cantCreateUser';
        break;
      default:
        errorMsg = 'loginError';
    }

    this.notifyService.notifyMessage(
      'finCore.auth.erros.title',
      `finCore.auth.erros.${errorMsg}`,
      NotificationSeverity.Error
    );
  }

  private emmitResetErrorMessage(errorCode: ResetPasswordErrorCode) {
    let errorMsg: string;

    switch (errorCode) {
      case ResetPasswordErrorCode.InvalidPassword:
        errorMsg = 'invalidPassword';
        break;
      case ResetPasswordErrorCode.NotSamePassword:
        errorMsg = 'notSamePassword';
        break;
      case ResetPasswordErrorCode.InvalidToken:
        errorMsg = 'invalidToken';
        break;
      case ResetPasswordErrorCode.ExpiredToken:
        errorMsg = 'expiredToken';
        break;
      default:
        errorMsg = 'resetPasswordError';
    }

    this.notifyService.notifyMessage(
      'finCore.auth.erros.title',
      `finCore.auth.erros.${errorMsg}`,
      NotificationSeverity.Error
    );
  }

  private emmitSendResetErrorMessage() {
    this.notifyService.notifyMessage(
      'finCore.auth.erros.title',
      'finCore.auth.erros.sendResetError',
      NotificationSeverity.Error
    );
  }
}
