import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { FinButtonComponent } from '../../../../shared/components/button/fin-button.component';
import { LayoutService } from '../../../services/layout/layout.service';
import { NotificationService } from '../../../services/notifications/notification.service';

@Component({
  selector: 'fin-side-notification-toggler',
  imports: [FinButtonComponent],
  templateUrl: './fin-side-notification-toggler.component.html',
  styleUrl: './fin-side-notification-toggler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinSideNotificationTogglerComponent {
  private readonly layoutService = inject(LayoutService);
  private readonly notificationService = inject(NotificationService);

  public readonly unreadNotificationsCount = computed(() => this.notificationService.unreadMessagesAndPushsNotifications().length);
  public readonly hasUnreadNotification = computed(() => {
    return this.notificationService.unreadMessagesAndPushsNotifications().length > 0;
  });

  public toggleSideNotifications(): void {
    this.layoutService.toggleSideNotifications();
  }
}
