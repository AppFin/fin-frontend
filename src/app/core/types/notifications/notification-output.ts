import { NotificationWay } from '../../enums/notifications/notification-way';
import { NotificationSeverity } from '../../enums/notifications/notification-severity';

export type NotificationOutput = {
  id: string;
  ways: NotificationWay[];
  textBody: string;
  htmlBody: string;
  title: string;
  continuous: boolean;
  startToDelivery: Date;
  stopToDelivery: Date | null;
  link: string;
  userIds: string[];
  severity: NotificationSeverity;
}