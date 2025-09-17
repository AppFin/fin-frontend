import { inject, Injectable, TemplateRef } from '@angular/core';
import { NotificationWay } from '../../enums/notifications/notification-way';
import { NotificationSeverity } from '../../enums/notifications/notification-severity';
import {
  FinPushComponent,
  FinPushData,
} from '../../components/notifications/push/fin-push.component';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

export type NotifyWays =
  | NotificationWay.Snack
  | NotificationWay.Push
  | NotificationWay.Message;

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private toastr = inject(ToastrService);
  private matSnackBar = inject(MatSnackBar);

  public notify(
    title: string,
    bodyTextOrHtml: string,
    type: NotifyWays = NotificationWay.Push,
    severity = NotificationSeverity.Default,
    durationInMs = 50000,
    bodyTemplate: TemplateRef<any> | null = null,
    footerTemplate: TemplateRef<any> | null = null
  ): void {
    switch (type) {
      case NotificationWay.Snack:
        this.notifSnack(bodyTextOrHtml, severity, durationInMs);
        break;
      case NotificationWay.Message:
        break;
      case NotificationWay.Push:
        this.notifyPush(title, bodyTextOrHtml, severity, durationInMs);
        break;
    }
  }

  public notifSnack(
    message: string,
    severity: NotificationSeverity,
    durationInMs: number
  ): void {
    const options = { timeOut: durationInMs };

    switch (severity) {
      case NotificationSeverity.Success:
        this.toastr.success(message, '', options);
        break;
      case NotificationSeverity.Error:
        this.toastr.error(message, '', options);
        break;
      case NotificationSeverity.Warning:
        this.toastr.warning(message, '', options);
        break;
      default:
        this.toastr.info(message, '', options);
        break;
    }
  }

  public notifyPush(
    title: string,
    bodyTextOrHtml: string,
    severity: NotificationSeverity,
    durationInMs: number
  ): void {
    this.matSnackBar.openFromComponent(FinPushComponent, {
      duration: durationInMs,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['snack-bar-container'],

      data: {
        title,
        severity,
        bodyTextOrHtml,
        durationInMs: durationInMs,
      } as FinPushData,
    });
  }
}
