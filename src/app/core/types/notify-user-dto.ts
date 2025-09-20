import { NotificationWay } from '../enums/notifications/notification-way';
import { NotificationSeverity } from '../enums/notifications/notification-severity';

export type NotifyUserDTO = {
  ways: NotificationWay[];
  textBody: string;
  htmlBody: string;
  title: string;
  notificationId: string;
  userId: string;

  severity: NotificationSeverity;
  link: string;
};
