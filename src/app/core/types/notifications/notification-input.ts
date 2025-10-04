import { NotificationSeverity } from '../../enums/notifications/notification-severity';
import { NotificationWay } from '../../enums/notifications/notification-way';

export type NotificationInput = {
  ways: NotificationWay[];
  textBody: string;
  htmlBody: string;
  title: string;
  continuous: boolean;
  startToDelivery: Date;
  stopToDelivery: Date | null;
  userIds: string[];
  link: string;
  severity: NotificationSeverity;
}