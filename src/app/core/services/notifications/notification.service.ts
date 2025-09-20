import { inject, Injectable, signal } from '@angular/core';
import { NotifyUserDTO } from '../../types/notify-user-dto';
import { NotificationWay } from '../../enums/notifications/notification-way';
import { NotificationSeverity } from '../../enums/notifications/notification-severity';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public notifyService = inject(NotifyService);

  public readonly unreadNotifications = signal([
    {
      htmlBody: '<h6>Notifications <b>TRUETHDasdksaj</b></h6>',
      textBody: 'Notifications TRUETHDasdksaj',
      notificationId: 'das423d',
      title: 'Cool',
      ways: [NotificationWay.Push],
    },
    {
      htmlBody: '<h6>Notifications <b>TRUETHDasdksaj</b></h6>',
      textBody: 'Notifications TRUETHDasdksaj',
      notificationId: 'd234asd',
      title: 'Cool',
      ways: [NotificationWay.Snack],
      severity: NotificationSeverity.Default,
    },
    {
      htmlBody: '<span>Notifications <b>TRUETHDasdksaj</b></span>',
      textBody: 'Notifications TRUETHDasdksaj',
      notificationId: 'da22sd',
      title: 'Cool',
      ways: [NotificationWay.Message],
      severity: NotificationSeverity.Info,
    },
    {
      htmlBody: '<span>Notifications <b>TRUETHDasdksaj</b></span>',
      textBody: 'Notifications TRUETHDasdksaj',
      notificationId: '23423dasd',
      title: 'Cool',
      ways: [NotificationWay.Message],
      severity: NotificationSeverity.Success,
    },
    {
      htmlBody: '<span>Notifications <b>TRUETHDasdksaj</b></span>',
      textBody: 'Notifications TRUETHDasdksaj',
      notificationId: 'd4324asd',
      title: 'Cool',
      ways: [NotificationWay.Message],
      severity: NotificationSeverity.Error,
    },
    {
      htmlBody: '',
      textBody: 'Notifications TRUETHDasdksaj',
      notificationId: 'da323sd',
      title: 'Cool',
      ways: [NotificationWay.Push],
      severity: NotificationSeverity.Warning,
      link: 'https://www.google.com/',
    },
    {
      htmlBody: '',
      textBody: 'Notifications TRUETHDasdksaj',
      notificationId: 'd12asd',
      title: 'Cool',
      ways: [NotificationWay.Push],
      link: '/admin/menus',
    },
    {
      htmlBody: '',
      textBody: 'Notifications TRUETHDasdksaj',
      notificationId: 'da32313sd',
      title: 'Cool',
      ways: [NotificationWay.Push],
      severity: NotificationSeverity.Warning,
      link: 'https://www.google.com/',
    },
    {
      htmlBody: '',
      textBody: 'Notifications TRUETHDasdksaj',
      notificationId: 'd12a123sd',
      title: 'Cool',
      ways: [NotificationWay.Push],
      link: '/admin/menus',
    },
    {
      htmlBody: '',
      textBody: 'Notifications TRUETHDasdksaj',
      notificationId: 'da323123sd',
      title: 'Cool',
      ways: [NotificationWay.Push],
      severity: NotificationSeverity.Warning,
      link: 'https://www.google.com/',
    },
    {
      htmlBody: '',
      textBody: 'Notifications TRUETHDasdksaj',
      notificationId: 'd12a22sd',
      title: 'Cool',
      ways: [NotificationWay.Push],
      link: '/admin/menus',
    },
    {
      htmlBody: '',
      textBody: 'Notifications TRUETHDasdksaj',
      notificationId: 'da32dds3sd',
      title: 'Cool',
      ways: [NotificationWay.Push],
      severity: NotificationSeverity.Warning,
      link: 'https://www.google.com/',
    },
    {
      htmlBody: '',
      textBody: 'Notifications TRUETHDasdksaj',
      notificationId: 'd12as887878d',
      title: 'Cool',
      ways: [NotificationWay.Push],
      link: '/admin/menus',
    },
  ] as NotifyUserDTO[]);

  public readNotification(notificationId: string): void {
    this.unreadNotifications.update((a) => {
      let newA = [...a];

      newA = newA.filter((n) => n.notificationId !== notificationId);

      return newA;
    });
  }

  public realAllotifications(): void {
    this.unreadNotifications.set([]);
  }

  public notify(notifyUserDTO: NotifyUserDTO): void {
    notifyUserDTO.ways.forEach(way => {
      if (way === NotificationWay.Email) return

      const body = way == NotificationWay.Snack
        ? notifyUserDTO.textBody
        : notifyUserDTO.htmlBody ?? notifyUserDTO.textBody;

      this.notifyService.notify(
        notifyUserDTO.title,
        body,
        way,
        notifyUserDTO.severity
      )
    })
  }
}
