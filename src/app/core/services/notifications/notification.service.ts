import { inject, Injectable, signal } from '@angular/core';
import { NotifyUserDto } from '../../types/notifications/notify-user-dto';
import { NotificationWay } from '../../enums/notifications/notification-way';
import { NotifyService } from './notify.service';
import { NotificationApiService } from './notification-api.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public notifyService = inject(NotifyService);
  public apiService = inject(NotificationApiService);

  public readonly unreadMessagesAndPushsNotifications = signal<NotifyUserDto[]>(
    []
  );

  constructor() {
    this.loadUnreadNotifications();
  }

  public async loadUnreadNotifications(): Promise<void> {
    const notifications = await firstValueFrom(
      this.apiService.getUnvisualizedNotifications()
    );

    this.unreadMessagesAndPushsNotifications.set(
      notifications.filter(
        (n) =>
          n.ways.includes(NotificationWay.Message) ||
          n.ways.includes(NotificationWay.Push)
      )
    );

    await this.processNotifications(notifications);
  }

  public async readNotification(notificationId: string): Promise<void> {
    await firstValueFrom(this.apiService.markVisualized(notificationId));

    this.unreadMessagesAndPushsNotifications.update((notifications) => {
      return [...notifications].filter(
        (n) => n.notificationId !== notificationId
      );
    });
  }

  public async readAllNotifications(): Promise<void> {
    const promises = this.unreadMessagesAndPushsNotifications().map((n) =>
      this.readNotification(n.notificationId)
    );
    await Promise.all(promises);
    this.unreadMessagesAndPushsNotifications.set([]);
  }

  public async addNotificationFromWebSocket(
    notifyUserDTO: NotifyUserDto
  ): Promise<void> {
    if (
      notifyUserDTO.ways.includes(NotificationWay.Message) ||
      notifyUserDTO.ways.includes(NotificationWay.Push)
    ) {
      this.unreadMessagesAndPushsNotifications.update((ns) => {
        return [...ns, notifyUserDTO];
      });
    }

    return await this.notify(notifyUserDTO)
  }

  public async notify(
    notifyUserDTO: NotifyUserDto,
    justWays: NotificationWay[] | null = null
  ): Promise<void> {
    for (const way of notifyUserDTO.ways) {
      if (
        way === NotificationWay.Email ||
        (!!justWays && !justWays.includes(way))
      )
        continue;

      const body =
        way == NotificationWay.Snack
          ? notifyUserDTO.textBody
          : (notifyUserDTO.htmlBody ?? notifyUserDTO.textBody);

      await this.notifyService.notify(
        notifyUserDTO.title,
        body,
        way,
        notifyUserDTO.severity
      );
    }

    if (!notifyUserDTO.continuous)
      this.readNotification(notifyUserDTO.notificationId);
  }

  private async processNotifications(notifications: NotifyUserDto[]) {
    const messages = notifications.filter((n) =>
      n.ways.includes(NotificationWay.Message)
    );
    for (const notification of messages) {
      await this.notify(notification, [NotificationWay.Message]);
    }

    const justSnacks = notifications.filter(
      (n) =>
        n.ways.includes(NotificationWay.Snack) &&
        !n.ways.includes(NotificationWay.Message)
    );
    justSnacks.forEach((n) => this.notify(n, [NotificationWay.Snack]));
  }
}
