import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { NotificationSeverity } from '../../../enums/notifications/notification-severity';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { FinTextComponent } from '../../../../shared/components/generics/text/fin-text.component';
import { FinIconComponent } from '../../../../shared/components/generics/icon/fin-icon.component';
import { FinButtonComponent } from '../../../../shared/components/generics/button/fin-button.component';
import { isHtml } from '../../../../shared/functions/is-html';
import { SafeHtmlPipe } from '../../../../shared/pipes/safe-html/safe-html.pipe';
import { FinSeverity } from '../../../types/themes/fin-severity';

export type FinPushData = {
  bodyTextOrHtml: string;
  title: string;
  severity: NotificationSeverity;
  durationInMs?: number;
};

@Component({
  selector: 'fin-push',
  imports: [
    FinTextComponent,
    FinIconComponent,
    FinButtonComponent,
    SafeHtmlPipe,
  ],
  templateUrl: './fin-push.component.html',
  styleUrl: './fin-push.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FinPushComponent implements OnInit {
  public readonly data = inject<FinPushData>(MAT_SNACK_BAR_DATA);
  public readonly snackBarRef = inject(MatSnackBarRef);
  public readonly duration = signal(5000);
  public readonly isHtml = signal(false);

  public readonly finSeverity = signal<FinSeverity | null>(null);
  public readonly icon = signal('');
  public readonly color = signal('');

  public ngOnInit(): void {
    this.setTextSeverities();
    this.isHtml.set(isHtml(this.data.bodyTextOrHtml));
    if (this.data.durationInMs) {
      this.duration.set(this.data.durationInMs);
    }
  }

  public close(): void {
    this.snackBarRef.dismiss();
  }

  private setTextSeverities(): void {
    let severity: FinSeverity | null = null;
    let icon: string;
    let color: string;

    switch (this.data.severity) {
      case NotificationSeverity.Success:
        severity = 'success';
        icon = 'circle-check';
        color = 'var(--primary-success)';
        break;
      case NotificationSeverity.Error:
        severity = 'danger';
        icon = 'circle-exclamation';
        color = 'var(--primary-error)';
        break;
      case NotificationSeverity.Warning:
        severity = 'warn';
        icon = 'triangle-exclamation';
        color = 'var(--primary-warning)';
        break;
      case NotificationSeverity.Info:
        severity = 'info';
        icon = 'circle-info';
        color = 'var(--primary-info)';
        break;
      default:
        icon = 'bell';
        color = 'var(--primary-color)';
        break;
    }

    this.finSeverity.set(severity);
    this.icon.set(icon);
    this.color.set(color);
  }
}
