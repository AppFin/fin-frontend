import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NotificationService } from '../../../services/notifications/notification.service';
import { SideNotificationItemComponent } from './side-notification-item/side-notification-item.component';
import { slideOut } from '../../../../shared/animations/slide-out';
import { FinButtonComponent } from '../../../../shared/components/button/fin-button.component';
import { FinTextComponent } from '../../../../shared/components/text/fin-text.component';

@Component({
  selector: 'fin-side-notifications-container',
  imports: [
    SideNotificationItemComponent,
    FinButtonComponent,
    FinTextComponent,
  ],
  templateUrl: './fin-side-notifications-container.component.html',
  styleUrl: './fin-side-notifications-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideOut],
})
export class FinSideNotificationsContainerComponent {
  private readonly notificationsService = inject(NotificationService);

  public readonly unreadNotifications =
    this.notificationsService.unreadMessagesAndPushsNotifications;

  public async markAllAsRead(): Promise<void> {
    await this.notificationsService.readAllNotifications();
  }
}
