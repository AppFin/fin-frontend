import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ensureTrailingSlash } from '../../../core/functions/ensure-trailing-slash';
import { environment } from '../../../../environments/environment';
import { UserStartCreateInput } from '../models/user-start-create-input';
import { UserStartCreateOutput } from '../models/user-start-create-output';
import { ValidationResultDto } from '../../../shared/models/validation-results/validation-result-dto';
import { catchError, firstValueFrom, map, of, throwError } from 'rxjs';
import { UserStartCreateErrorCode } from '../enums/user-start-create-error-code';
import { UserUpdateOrCreateInput } from '../../../shared/models/users/user-update-or-create-input';
import { UserDto } from '../../../shared/models/users/user-dto';

@Injectable({
  providedIn: 'root',
})
export class UserCreateService {
  private readonly API_URL =
    ensureTrailingSlash(environment.apiUrl) + 'users/create/';
  private readonly http = inject(HttpClient);

  public async start(
    input: UserStartCreateInput
  ): Promise<UserStartCreateOutput | null> {
    const request = this.http
      .post<UserStartCreateOutput>(`${this.API_URL}start`, input)
      .pipe(
        map((r) => {
          return new UserStartCreateOutput(r);
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 422)
            return of(
              error.error as ValidationResultDto<
                UserStartCreateOutput,
                UserStartCreateErrorCode
              >
            );
          return throwError(() => error);
        })
      );

    const result = await firstValueFrom(request);

    if (result instanceof UserStartCreateOutput) return result;

    if (!!result.errorCode) this.emitStaertCreateErrorMessage(result.errorCode);
    return null;
  }

  public async resendEmail(creationToken: string): Promise<Date | null> {
    const request = this.http
      .post<Date>(
        `${this.API_URL}resend-email?creationToken=${creationToken}`,
        null
      )
      .pipe(
        map((r) => new Date(r)),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 422)
            return of(error.error as ValidationResultDto<Date>);
          return throwError(() => error);
        })
      );
    const result = await firstValueFrom(request);

    if (result instanceof Date) return result;
    this.emitErrorMessage('ERRO MESSAGE HERE');
    return result.data;
  }

  public async validEmail(
    creationToken: string,
    emailCode: string
  ): Promise<boolean> {
    const request = this.http
      .post<boolean>(
        `${this.API_URL}valid-email?creationToken=${creationToken}&emailCode=${emailCode}`,
        null
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 422)
            return of(error.error as ValidationResultDto<boolean>);
          return throwError(() => error);
        })
      );
    const result = await firstValueFrom(request);

    if (typeof result === 'boolean') return result;
    this.emitErrorMessage('ERRO MESSAGE HERE');
    return result.data ?? false;
  }

  public async createUser(
    creationToken: string,
    input: UserUpdateOrCreateInput
  ): Promise<boolean> {
    const request = this.http
      .post<UserDto>(
        `${this.API_URL}create-user?creationToken=${creationToken}`,
        input
      )
      .pipe(
        map((e) => new UserDto(e)),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 422)
            return of(error.error as ValidationResultDto);
          return throwError(() => error);
        })
      );
    const result = await firstValueFrom(request);

    if (result instanceof UserDto) return true;
    this.emitErrorMessage('ERRO MESSAGE HERE');

    return false;
  }

  private emitStaertCreateErrorMessage(code: UserStartCreateErrorCode): void {
    // TODO here we notify user via push ou dialog.
  }

  private emitErrorMessage(erromessagehere: string): void {
    // TODO here we notify user via push ou dialog.
  }
}
