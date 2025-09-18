import { inject, Injectable, TemplateRef } from '@angular/core';
import { NotificationWay } from '../../enums/notifications/notification-way';
import { NotificationSeverity } from '../../enums/notifications/notification-severity';
import {
  FinPushComponent,
  FinPushData,
} from '../../components/notifications/push/fin-push.component';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {
  FinMessageComponent,
  FinMessageData,
} from '../../components/notifications/message/fin-message.component';

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
  private matDialog = inject(MatDialog);

  public notify(
    title: string,
    bodyTextOrHtml: string,
    type: NotifyWays = NotificationWay.Push,
    severity = NotificationSeverity.Default,
    durationInMs = 5000,
    bodyTemplate: TemplateRef<any> | null = null,
    footerTemplate: TemplateRef<any> | null = null,
    showCloseButton = true
  ): void {
    switch (type) {
      case NotificationWay.Snack:
        this.notifySnack(bodyTextOrHtml, severity, durationInMs);
        break;
      case NotificationWay.Message:
        this.notifyMessage(
          title,
          bodyTextOrHtml,
          severity,
          bodyTemplate,
          footerTemplate,
          showCloseButton
        );
        break;
      case NotificationWay.Push:
        this.notifyPush(title, bodyTextOrHtml, severity, durationInMs);
        break;
    }
  }

  public notifySnack(
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
        durationInMs
      } as FinPushData,
    });
  }

  private notifyMessage(
    title: string,
    bodyTextOrHtml: string,
    severity: NotificationSeverity,
    bodyTemplate: TemplateRef<any> | null,
    footerTemplate: TemplateRef<any> | null,
    showCloseButton: boolean
  ) {
    this.matDialog.open(FinMessageComponent, {
      hasBackdrop: true,
      closeOnNavigation: false,
      disableClose: false,
      maxWidth: '95vw',
      width: '900px',
      maxHeight: '80vh',
      data: {
        title,
        severity,
        bodyTextOrHtml,
        bodyTemplate,
        footerTemplate,
        showCloseButton
      } as FinMessageData,
    });
  }
}
