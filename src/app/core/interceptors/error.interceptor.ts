import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { NotifyService } from '../services/notifications/notify.service';
import { NotificationSeverity } from '../enums/notifications/notification-severity';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifyService = inject(NotifyService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isInternalError = error.status === 500;
      const isForbidden = error.status === 403;
      if (isInternalError)
        notifyService.notifyMessage(
          'finCore.errors.serverError',
          'finCore.errors.internalError',
          NotificationSeverity.Error
        );
      if (isForbidden)
        notifyService.notifySnack(
          'finCore.errors.forbidden',
          NotificationSeverity.Warning
        );

      return throwError(() => error);
    })
  );
};
