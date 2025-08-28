import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, of, throwError } from 'rxjs';
import { LoginOutput } from '../../models/authentication/login-output';
import { ensureTrailingSlash } from '../../functions/ensure-trailing-slash';
import { LoginInput } from '../../models/authentication/login-input';
import { ResetPasswordInput } from '../../models/authentication/reset-password-input';
import { ValidationResultDto } from '../../../shared/models/validation-results/validation-result-dto';
import { ResetPasswordErrorCode } from '../../enums/authentication/reset-password-error-code';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly API_URL =
    ensureTrailingSlash(environment.apiUrl) + 'authentications/';
  private readonly http = inject(HttpClient);

  public login(input: LoginInput): Observable<LoginOutput> {
    return this.http.post<LoginOutput>(`${this.API_URL}login`, input);
  }

  public logout(): Observable<void> {
    return this.http.post<void>(`${this.API_URL}logged-out`, null);
  }

  public sendResetPasswordEmail(email: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}send-reset-password-email`, {
      email,
    });
  }

  public resetPassword(
    input: ResetPasswordInput
  ): Observable<
    boolean | ValidationResultDto<boolean, ResetPasswordErrorCode>
  > {
    return this.http.post<boolean>(`${this.API_URL}reset-password`, input).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          return of(
            error.error as ValidationResultDto<boolean, ResetPasswordErrorCode>
          );
        }
        return throwError(() => error);
      })
    );
  }

  public refreshToken(refreshToken: string): Observable<LoginOutput> {
    return this.http.post<LoginOutput>(`${this.API_URL}refresh-token`, {
      refreshToken,
    });
  }
}
