import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { NotifyUserDto } from '../../../../types/notifications/notify-user-dto';
import { FinIconComponent } from '../../../../../shared/components/icon/fin-icon.component';
import { FinTextComponent } from '../../../../../shared/components/text/fin-text.component';
import { FinButtonComponent } from '../../../../../shared/components/button/fin-button.component';
import { FinSeverity } from '../../../../types/themes/fin-severity';
import { NotificationSeverity } from '../../../../enums/notifications/notification-severity';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { NotificationWay } from '../../../../enums/notifications/notification-way';

@Component({
  selector: 'fin-side-notification-item',
  imports: [FinIconComponent, FinTextComponent, FinButtonComponent],
  templateUrl: './side-notification-item.component.html',
  styleUrl: './side-notification-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.has-hover]': 'hasHover()',
  },
})
export class SideNotificationItemComponent implements OnInit {
  public readonly notification = input<NotifyUserDto>({} as NotifyUserDto);

  public readonly finSeverity = signal<FinSeverity | null>(null);
  public readonly icon = signal('');
  public readonly color = signal('');

  public readonly hasLink = computed(() => !!this.notification().link);
  public readonly hasHover = computed(
    () =>
      this.hasLink() ||
      this.notification().ways.includes(NotificationWay.Message)
  );
  public readonly isExternalLink = computed(() => {
    return (
      this.notification().link?.startsWith('http://') ||
      this.notification().link?.startsWith('https://')
    );
  });

  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);

  public ngOnInit(): void {
    this.setTextSeverities();
  }

  @HostListener('click', ['$event'])
  public async onClick(event: Event): Promise<void> {
    if (this.notification().ways.includes(NotificationWay.Message)) {
      await this.notificationService.notify(this.notification());
    }

    if (this.hasLink()) {
      if (this.isExternalLink()) {
        event.preventDefault();
        window.open(this.notification().link, '_blank', 'noopener,noreferrer');
      } else {
        await this.router.navigate([this.notification().link]);
      }
    }
  }

  public async markAsRead(event: Event): Promise<void> {
    event.stopPropagation();
    await this.notificationService.readNotification(
      this.notification().notificationId
    );
  }

  private setTextSeverities(): void {
    let severity: FinSeverity | null;
    let icon: string;
    let color: string;

    switch (this.notification().severity) {
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
        severity = 'primary';
        color = 'var(--primary-color)';
        break;
    }

    this.finSeverity.set(severity);
    this.icon.set(icon);
    this.color.set(color);
  }
}
