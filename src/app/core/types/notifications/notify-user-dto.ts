import { NotificationWay } from '../../enums/notifications/notification-way';
import { NotificationSeverity } from '../../enums/notifications/notification-severity';

export type NotifyUserDto = {
  ways: NotificationWay[];
  textBody: string;
  htmlBody: string;
  title: string;
  notificationId: string;
  userId: string;
  continuous: boolean;

  severity: NotificationSeverity;
  link: string;
};
