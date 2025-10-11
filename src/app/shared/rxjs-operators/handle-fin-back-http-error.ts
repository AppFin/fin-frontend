import { catchError, map, Observable, of, OperatorFunction, pipe } from 'rxjs';
import { ValidationResultDto } from '../models/validation-results/validation-result-dto';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '../../core/services/notifications/notify.service';
import { NotificationSeverity } from '../../core/enums/notifications/notification-severity';

/**
 * Callback function to handle 422 (Unprocessable Entity) or 404 (Not Found) validation errors.
 *
 * @template ErrorD - Type of validation error data
 * @template ErrorE - Type of validation error extras
 *
 * @callback HandleErrFn
 * @param {ValidationResultDto<ErrorD, ErrorE>} err - Object containing validation error details from the server response body.
 * @returns {void}
 *
 * @example
 * const handleError: HandleErrFn<FieldError, ExtraInfo> = (err) => {
 * console.error('Validation error:', err);
 * // Show toast, update form, etc.
 * };
 */
export type HandleErrFn<ErrorD, ErrorE> =
  | ((err: ValidationResultDto<ErrorD, ErrorE>) => void)
  | null;

/**
 * Tuple representing the result of a validated operation, including the full error object on failure.
 *
 * @template SuccessD - Type of data returned on success
 * @template ErrorD - Type of validation error data
 * @template ErrorE - Type of validation error extras
 *
 * @typedef {[boolean, SuccessD | null, ValidationResultDto<ErrorD, ErrorE> | null]} ValidationReturn
 *
 * - Index 0 (boolean): `true` if operation succeeded, `false` otherwise.
 * - Index 1 (SuccessD | null): Data returned on success, or `null` on error.
 * - Index 2 (ValidationResultDto<ErrorD, ErrorE> | null): The detailed validation error object on 422/404 failure, or `null` on success.
 *
 * @example
 * const [success, data, error] = result;
 * if (success && data) {
 * console.log('Success data:', data);
 * } else if (error) {
 * console.log('Validation/Not Found error details:', error);
 * } else {
 * console.log('Other HTTP error occurred.');
 * }
 */
export type ValidationReturn<SuccessD, ErrorD, ErrorE> = [
  boolean,
  SuccessD | null,
  ValidationResultDto<ErrorD, ErrorE> | null,
];

/**
 * Observable that emits validated results in the extended tuple format.
 *
 * @template SuccessD - Type of success data
 * @template ErrorD - Type of validation error data
 * @template ErrorE - Type of validation error extras
 *
 * @typedef {Observable<ValidationReturn<SuccessD, ErrorD, ErrorE>>} ObservableValidated
 *
 * @example
 * const user$: ObservableValidated<UserDto, FieldError, Metadata> = this.http.get<UserDto>('/api/user')
 * .pipe(handleFinBackHttpError());
 */
export type ObservableValidated<SuccessD=any, ErrorD=any, ErrorE=any> = Observable<
  ValidationReturn<SuccessD, ErrorD, ErrorE>
>;

/**
 * RxJS operator that catches HTTP 422 (Unprocessable Entity) and 404 (Not Found) errors,
 * transforming them into a standardized **three-element tuple** format for easier handling.
 *
 * This operator prevents these specific HTTP errors from triggering the Observable's `error` callback,
 * allowing success and failure (422/404) to be handled within the `subscribe` block.
 *
 * @template ErrorE - Type of validation error extras (default: any)
 * @template ErrorD - Type of validation error data (default: any)
 * @template SuccessD - Type of success response data (default: any)
 *
 * @param {HandleErrFn<ErrorD, ErrorE>} [handleErrFn=null] - Optional callback function to handle 422/404 errors by receiving the `ValidationResultDto`.
 *
 * @returns {OperatorFunction<SuccessD, ValidationReturn<SuccessD, ErrorD, ErrorE>>} RxJS operator function.
 *
 * @example
 * // Basic usage
 * this.http.post<User>('/api/users', userData)
 * .pipe(handleFinBackHttpError())
 * .subscribe(([success, user, error]) => {
 * if (success && user) {
 * console.log('User created:', user);
 * } else if (error) {
 * console.log('Validation failed:', error.errors);
 * }
 * });
 *
 * @example
 * // With custom error handler and type-safety
 * this.http.post<User>('/api/users', userData)
 * .pipe(
 * handleFinBackHttpError<ErrorExtra, ErrorData, User>((err) => {
 * this.toastr.error('Validation failed');
 * this.updateFormErrors(err.errors);
 * })
 * )
 * .subscribe(([success, user]) => {
 * if (success && user) {
 * this.router.navigate(['/users', user.id]);
 * }
 * });
 */
export function handleFinBackHttpError<
  ErrorE = any,
  ErrorD = any,
  SuccessD = any,
>(
  handleErrFn: HandleErrFn<ErrorD, ErrorE> = null
): OperatorFunction<SuccessD, ValidationReturn<SuccessD, ErrorD, ErrorE>> {
  return pipe(
    map((result: SuccessD): ValidationReturn<SuccessD, ErrorD, ErrorE> => {
      return [true, result, null];
    }),
    catchError(
      (err: HttpErrorResponse): ObservableValidated<SuccessD, ErrorD, ErrorE> => {
        const isUnprocessableEntityErr = err.status == 422;
        const isNotFoundErr = err.status == 404;
        const errorObj = err.error as ValidationResultDto<ErrorD, ErrorE> | null;

        if ((isUnprocessableEntityErr || isNotFoundErr)) {
          // 1. Execute optional callback if the error object is valid and 'success' is false
          if (
            handleErrFn &&
            !!errorObj &&
            typeof errorObj === 'object' &&
            errorObj.success !== null &&
            errorObj.success !== undefined &&
            !errorObj.success
          ) {
            handleErrFn(err.error);
          }
          // 2. Return the tuple [false, null, errorObj]
          return of([false, null, errorObj]);
        }

        // 3. For all other errors (5xx, 401, 403, etc.), re-throw or return a minimal failure tuple.
        // NOTE: The current implementation catches ALL errors and returns [false, null, errorObj].
        // To only handle 422/404 gracefully, a conditional re-throw might be necessary,
        // but based on the code returning 'of([false, null, errorObj])' for all errors,
        // we'll keep the logic that all caught errors lead to a failure tuple.
        return of([false, null, errorObj]);
      }
    )
  );
}

/**
 * A map used to associate numeric error codes (usually from a backend API response)
 * with specific notification details for user feedback.
 *
 * @typedef {Map<E, { title?: string | null; message: string, severity?: NotificationSeverity | null }>} ErrorMessagesMap
 *
 * @template E - The type of the error code key (default: number).
 *
 * @property {E} Key - The **error code** received from the API (e.g., 1001, 'INVALID_DATA').
 * @property {Object} Value - An object defining the notification content:
 * @property {string | null} [Value.title] - Optional. The title of the notification (e.g., "Error", "Validation Failed").
 * @property {string} Value.message - The **main message** or body text of the notification to be displayed to the user.
 * @property {NotificationSeverity | null} [Value.severity] - Optional. The severity level for the notification (e.g., Error, Warning, Info).
 *
 * @example
 * // Using default number key type
 * const myNumericErrorMap: ErrorMessagesMap<number> = new Map([
 * [1001, { message: 'The specified resource was not found.', title: 'Not Found', severity: NotificationSeverity.Warning }],
 * ]);
 *
 * @example
 * // Using string key type
 * const myStringErrorMap: ErrorMessagesMap<string> = new Map([
 * ['INVALID_ID', { message: 'The ID format is incorrect.' }],
 * ]);
 */
export type ErrorMessagesMap<E = number> = Map<
  E,
  {
    title?: string | null;
    message: string;
    severity?: NotificationSeverity | null;
  }
>;

/**
 * RxJS operator that applies `handleFinBackHttpError` and, additionally, automatically
 * displays a notification message using a `NotifyService` based on the validation error's
 * `errorCode` found in the response body.
 *
 * This operator uses the `errorCode` from the `ValidationResultDto` to look up the
 * appropriate notification message and severity from the provided `errCodeMessageMap`.
 *
 * @template ErrorE - Type of validation error extras (default: any)
 * @template ErrorD - Type of validation error data (default: any)
 * @template SuccessD - Type of success response data (default: any)
 *
 * @param {ErrorMessagesMap<number>} errCodeMessageMap - A map where the key is the numeric `errorCode` from the validation result, and the value contains the notification details (`title`, `message`, `severity`).
 * @param {NotifyService} notifyService - The service responsible for displaying notifications (toasts, popups, etc.).
 *
 * @returns {OperatorFunction<SuccessD, ValidationReturn<SuccessD, ErrorD, ErrorE>>} RxJS operator function.
 *
 * @example
 * const errorMap: ErrorMessagesMap = new Map([
 * [1001, { message: 'The email is already in use.', title: 'Conflict' }],
 * [1002, { message: 'Invalid data.', severity: NotificationSeverity.Warning }],
 * ]);
 *
 * this.http.post<User>('/api/users', userData)
 * .pipe(
 * handleFinBackHttpErrorAndDisplayMessage(errorMap, this.notifyService)
 * )
 * .subscribe(([success, user]) => {
 * // ...
 * });
 */
export function handleFinBackHttpErrorAndDisplayMessage<
  ErrorE = any,
  ErrorD = any,
  SuccessD = any,
>(
  errCodeMessageMap: ErrorMessagesMap,
  notifyService: NotifyService
): OperatorFunction<SuccessD, ValidationReturn<SuccessD, ErrorD, ErrorE>> {
  return pipe(
    handleFinBackHttpError<ErrorE, ErrorD, SuccessD>((err) => {
      // Note: err.errorCode is usually a string from the backend, so we use Number() for the map lookup.
      if (!err.errorCode && err.errorCode !== 0) return;

      const message = errCodeMessageMap.get(Number(err.errorCode));

      if (message) {
        notifyService.notifyMessage(
          message?.title ?? 'finApp.errors.erro',
          message?.message ?? '',
          message?.severity ?? NotificationSeverity.Error
        );
      }
    })
  );
}