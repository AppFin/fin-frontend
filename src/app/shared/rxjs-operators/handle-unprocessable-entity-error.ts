import { catchError, map, Observable, of, OperatorFunction, pipe } from 'rxjs';
import { ValidationResultDto } from '../models/validation-results/validation-result-dto';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Callback function to handle 422 validation errors.
 *
 * @template ErrorD - Type of validation error data
 * @template ErrorE - Type of validation error extras
 *
 * @callback HandleErrFn
 * @param {ValidationResultDto<ErrorD, ErrorE>} err - Object containing validation error details
 * @returns {void}
 *
 * @example
 * const handleError: HandleErrFn<FieldError, ExtraInfo> = (err) => {
 *   console.error('Validation error:', err);
 *   // Show toast, update form, etc.
 * };
 */
export type HandleErrFn<ErrorD, ErrorE> =
  | ((err: ValidationResultDto<ErrorD, ErrorE>) => void)
  | null;

/**
 * Tuple representing the result of a validated operation.
 *
 * @template SuccessD - Type of data returned on success
 *
 * @typedef {[boolean, SuccessD | null]} ValidationReturn
 *
 * - Index 0 (boolean): `true` if operation succeeded, `false` otherwise
 * - Index 1 (SuccessD | null): Data returned on success, or `null` on error
 *
 * @example
 * const [success, data] = result;
 * if (success && data) {
 *   console.log('Data:', data);
 * } else {
 *   console.log('Operation failed');
 * }
 */
export type ValidationReturn<SuccessD> = [boolean, SuccessD | null];

/**
 * Observable that emits validated results.
 *
 * @template SuccessD - Type of success data
 *
 * @typedef {Observable<ValidationReturn<SuccessD>>} ObservableValidated
 *
 * @example
 * const user$: ObservableValidated<UserDto> = this.http.get<UserDto>('/api/user')
 *   .pipe(handleUnprocessableEntityError());
 */
export type ObservableValidated<SuccessD> = Observable<ValidationReturn<SuccessD>>;

/**
 * RxJS operator that catches HTTP 422 (Unprocessable Entity) errors and transforms them
 * into a tuple format `[success, data]` for easier handling in code.
 *
 * This operator is useful for standardizing validation error handling in REST APIs,
 * avoiding the need for try-catch blocks or multiple error handlers.
 *
 * @template ErrorE - Type of validation error extras (default: any)
 * @template ErrorD - Type of validation error data (default: any)
 * @template SuccessD - Type of success response data (default: any)
 *
 * @param {HandleErrFn<ErrorD, ErrorE>} [handleErrFn=null] - Optional callback function to handle validation errors
 *
 * @returns {OperatorFunction<SuccessD, ValidationReturn<SuccessD>>} RxJS operator function
 *
 * @example
 * // Basic usage without error handler
 * this.http.post<User>('/api/users', userData)
 *   .pipe(handleUnprocessableEntityError())
 *   .subscribe(([success, user]) => {
 *     if (success && user) {
 *       console.log('User created:', user);
 *     } else {
 *       console.log('Failed to create user');
 *     }
 *   });
 *
 * @example
 * // With custom error handler
 * this.http.post<User>('/api/users', userData)
 *   .pipe(
 *     handleUnprocessableEntityError<ErrorExtra, ErrorData, User>((err) => {
 *       this.toastr.error('Validation failed');
 *       this.updateFormErrors(err);
 *     })
 *   )
 *   .subscribe(([success, user]) => {
 *     if (success && user) {
 *       this.router.navigate(['/users', user.id]);
 *     }
 *   });
 *
 * @example
 * // Type-safe usage with interfaces
 * interface UserDto {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 *
 * interface ValidationError {
 *   field: string;
 *   message: string;
 * }
 *
 * interface ErrorMetadata {
 *   code: string;
 *   timestamp: string;
 * }
 *
 * this.userService.createUser(data)
 *   .pipe(
 *     handleUnprocessableEntityError<ErrorMetadata, ValidationError, UserDto>(
 *       (err) => this.showValidationErrors(err)
 *     )
 *   )
 *   .subscribe(([success, user]) => {
 *     // TypeScript knows user is UserDto | null here
 *   });
 */
export function handleUnprocessableEntityError<ErrorE = any, ErrorD = any, SuccessD = any>(
  handleErrFn: HandleErrFn<ErrorD, ErrorE> = null
): OperatorFunction<SuccessD, ValidationReturn<SuccessD>> {
  return pipe(
    map((result: SuccessD): ValidationReturn<SuccessD> => {
      return [true, result];
    }),
    catchError((err: HttpErrorResponse): ObservableValidated<SuccessD> => {
      const isUnprocessableEntityErr = err.status == 422;
      if (isUnprocessableEntityErr && handleErrFn) handleErrFn(err.error);
      return of([false, null]);
    })
  );
}