import { ChangeDetectionStrategy, Component, inject, OnInit, signal, TemplateRef, } from '@angular/core';
import { NotificationSeverity } from '../../../enums/notifications/notification-severity';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FinTextComponent } from '../../../../shared/components/text/fin-text.component';
import { FinSeverity } from '../../../types/themes/fin-severity';
import { SafeHtmlPipe } from '../../../../shared/pipes/safe-html/safe-html.pipe';
import { isHtml } from '../../../../shared/functions/is-html';
import { NgTemplateOutlet } from '@angular/common';
import { FinDialogComponent } from '../../../../shared/components/dialog/fin-dialog.component';
import { FinDialogFooterDirective } from '../../../../shared/components/dialog/fin-dialog-footer.directive';

export type FinMessageData = {
  title: string;
  bodyTextOrHtml: string;
  severity: NotificationSeverity;
  bodyTemplate: TemplateRef<any> | null;
  footerTemplate: TemplateRef<any> | null;
  showCloseButton: boolean;
};

@Component({
  selector: 'fin-message',
  imports: [
    FinTextComponent,
    SafeHtmlPipe,
    NgTemplateOutlet,
    FinDialogComponent,
    FinDialogFooterDirective,
  ],
  templateUrl: './fin-message.component.html',
  styleUrl: './fin-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinMessageComponent implements OnInit {
  public readonly isHtml = signal(false);

  public readonly finSeverity = signal<FinSeverity | null>(null);
  public readonly icon = signal('');
  public readonly color = signal('');

  public readonly data = inject<FinMessageData>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<FinMessageComponent>);

  public ngOnInit(): void {
    this.setTextSeverities();
    this.isHtml.set(isHtml(this.data.bodyTextOrHtml));
    console.log(this.data.bodyTextOrHtml);
  }

  public close(): void {
    this.dialogRef.close();
  }

  private setTextSeverities(): void {
    let severity: FinSeverity | null = null;
    let icon: string;
    let color: string;

    switch (this.data.severity) {
      case NotificationSeverity.Success:
        severity = 'success';
        icon = 'circle-check';
        color = 'var(--color-success)';
        break;
      case NotificationSeverity.Error:
        severity = 'danger';
        icon = 'circle-exclamation';
        color = 'var(--color-error)';
        break;
      case NotificationSeverity.Warning:
        severity = 'warn';
        icon = 'triangle-exclamation';
        color = 'var(--color-warning)';
        break;
      case NotificationSeverity.Info:
        severity = 'info';
        icon = 'circle-info';
        color = 'var(--color-info)';
        break;
      default:
        icon = 'bell';
        color = 'var(--color-primary)';
        break;
    }

    this.finSeverity.set(severity);
    this.icon.set(icon);
    this.color.set(color);
  }
}
