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
import { FinTextComponent } from '../../../../shared/components/text/fin-text.component';
import { FinIconComponent } from '../../../../shared/components/icon/fin-icon.component';
import { FinButtonComponent } from '../../../../shared/components/button/fin-button.component';

export type FinPushData = {
  bodyTextOrHtml: string;
  title: string;
  severity: NotificationSeverity;
  durationInMs?: number;
};

@Component({
  selector: 'fin-push',
  imports: [FinTextComponent, FinIconComponent, FinButtonComponent],
  templateUrl: './fin-push.component.html',
  styleUrl: './fin-push.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FinPushComponent implements OnInit {
  public readonly data = inject<FinPushData>(MAT_SNACK_BAR_DATA);
  public readonly snackBarRef = inject(MatSnackBarRef);
  public readonly color = signal('');
  public readonly icon = signal('');
  public readonly duration = signal(5000);

  public ngOnInit(): void {
    this.setStyleBySeverity();
    if (this.data.durationInMs) {
      this.duration.set(this.data.durationInMs);
    }
  }

  public close(): void {
    this.snackBarRef.dismiss();
  }

  private setStyleBySeverity(): void {
    switch (this.data.severity) {
      case NotificationSeverity.Success:
        this.color.set('var(--color-success)');
        this.icon.set('circle-check');
        break;
      case NotificationSeverity.Error:
        this.color.set('var(--color-error)');
        this.icon.set('circle-exclamation');
        break;
      case NotificationSeverity.Warning:
        this.color.set('var(--color-warning)');
        this.icon.set('triangle-exclamation');
        break;
      case NotificationSeverity.Info:
        this.color.set('var(--color-info)');
        this.icon.set('circle-info');
        break;
      default:
        this.color.set('var(--color-primary)');
        this.icon.set('bell');
    }
  }
}