import { inject, Injectable, TemplateRef } from '@angular/core';
import { NotificationWay } from '../../enums/notifications/notification-way';
import { NotificationSeverity } from '../../enums/notifications/notification-severity';
import {
  FinPushComponent,
  FinPushData,
} from '../../components/notifications/push/fin-push.component';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  FinMessageComponent,
  FinMessageData,
} from '../../components/notifications/message/fin-message.component';
import { firstValueFrom, map, Observable } from 'rxjs';
import { FinSeverity } from '../../types/themes/fin-severity';
import {
  FinConfirmationComponent,
  FinConfirmationData,
} from '../../components/notifications/confirmation/fin-confirmation.component';

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

  public async notify(
    title: string,
    bodyTextOrHtml: string,
    type: NotifyWays = NotificationWay.Push,
    severity = NotificationSeverity.Default,
    durationInMs = 5000,
    bodyTemplate: TemplateRef<any> | null = null,
    footerTemplate: TemplateRef<any> | null = null,
    showCloseButton = true
  ): Promise<void> {
    switch (type) {
      case NotificationWay.Snack:
        await firstValueFrom(
          this.notifySnack(bodyTextOrHtml, severity, durationInMs).onHidden
        );
        break;
      case NotificationWay.Message:
        await firstValueFrom(
          this.notifyMessage(
            title,
            bodyTextOrHtml,
            severity,
            bodyTemplate,
            footerTemplate,
            showCloseButton
          ).afterClosed()
        );
        break;
      case NotificationWay.Push:
        await firstValueFrom(
          this.notifyPush(
            title,
            bodyTextOrHtml,
            severity,
            durationInMs
          ).afterDismissed()
        );
        break;
    }
  }

  public notifySnack(
    message: string,
    severity: NotificationSeverity,
    durationInMs: number
  ): ActiveToast<any> {
    const options = { timeOut: durationInMs };

    switch (severity) {
      case NotificationSeverity.Success:
        return this.toastr.success(message, '', options);
      case NotificationSeverity.Error:
        return this.toastr.error(message, '', options);
      case NotificationSeverity.Warning:
        return this.toastr.warning(message, '', options);
      default:
        return this.toastr.info(message, '', options);
    }
  }

  public notifyPush(
    title: string,
    bodyTextOrHtml: string,
    severity: NotificationSeverity,
    durationInMs: number
  ): MatSnackBarRef<FinPushComponent> {
    return this.matSnackBar.openFromComponent(FinPushComponent, {
      duration: durationInMs,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['snack-bar-container'],

      data: {
        title,
        severity,
        bodyTextOrHtml,
        durationInMs,
      } as FinPushData,
    });
  }

  public notifyMessage(
    title: string,
    bodyTextOrHtml: string,
    severity: NotificationSeverity,
    bodyTemplate: TemplateRef<any> | null,
    footerTemplate: TemplateRef<any> | null,
    showCloseButton: boolean
  ): MatDialogRef<FinMessageComponent, void> {
    return this.matDialog.open(FinMessageComponent, {
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
        showCloseButton,
      } as FinMessageData,
    });
  }

  public confirm(
    text: string,
    severity: FinSeverity = 'primary',
    icon: string | null = null,
    title = 'finCore.actions.confirmation',
  ): Observable<boolean> {
    const dialogRef = this.matDialog.open<
      FinConfirmationComponent,
      FinConfirmationData,
      boolean
    >(FinConfirmationComponent, {
      hasBackdrop: true,
      closeOnNavigation: false,
      disableClose: false,
      maxWidth: '95vw',
      width: '900px',
      maxHeight: '80vh',
      data: {
        title,
        severity,
        text,
        icon
      } as FinConfirmationData,
    });

    return dialogRef.afterClosed().pipe(map((confirmation) => !!confirmation));
  }
}
