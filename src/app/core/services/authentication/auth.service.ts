import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { catchError, first, Observable, tap, throwError } from 'rxjs';
import { UserProps } from '../../models/authentication/user-props';
import { LoginOutput } from '../../models/authentication/login-output';
import { ensureTrailingSlash } from '../../functions/ensure-trailing-slash';
import { LoginInput } from '../../models/authentication/login-input';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUserSubject = signal<UserProps | null>(null);
  public currentUser = this.currentUserSubject.asReadonly();
  private readonly isAuthenticatedSubject = signal<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asReadonly();

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly API_URL =
    ensureTrailingSlash(environment.apiUrl) + 'authentications/';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  constructor() {
    this.initializeAuth();
  }

  public login(input: LoginInput): Observable<LoginOutput> {
    return this.http.post<LoginOutput>(`${this.API_URL}login`, input).pipe(
      tap((response) => {
        this.setToken(response.token);
        this.setRefreshToken(response.refreshToken);
        this.setCurrentUser();
        this.router.navigate(['/']);
      }),
      catchError((error: HttpErrorResponse) => {
        this.emmitErrorMessage(error.error);
        return throwError(() => error);
      })
    );
  }

  public async logout(): Promise<void> {
    this.http.post(`${this.API_URL}logged-out`, null).pipe(first()).subscribe();

    this.clearAuth();
    await this.router.navigate(['/authentication/login']);
  }

  public refreshToken(): Observable<LoginOutput> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken)
      return throwError(() => new Error('No refresh token available'));

    return this.http
      .post<LoginOutput>(`${this.API_URL}refresh-token`, { refreshToken })
      .pipe(
        tap((response) => {
          this.setToken(response.token);
          this.setRefreshToken(response.refreshToken);
        }),
        catchError((error: HttpErrorResponse) => {
          this.clearAuth();
          this.emmitErrorMessage(error.error);
          return throwError(() => error);
        })
      );
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private initializeAuth(): void {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      this.setCurrentUser();
    }
  }

  private clearAuth(): void {
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

  private emmitErrorMessage(error: LoginOutput) {
    // TODO here we notify user via snack ou dialog.
  }
}
