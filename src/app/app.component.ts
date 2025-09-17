import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ThemeService } from './core/services/theme/theme.service';
import { RouterOutlet } from '@angular/router';
import { NotifyService } from './core/services/notifications/notify.service';
import { NotificationWay } from './core/enums/notifications/notification-way';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, RouterOutlet],
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly notifyService = inject(NotifyService);

  public ngOnInit(): void {
    this.removeSplashScreen();

    setTimeout(() => {
      this.notifyService.notify(
        '',
        'Teste Gustavo tomando agua',
        NotificationWay.Snack
      );
      this.notifyService.notify(
        'Outros',
        'Teste Gustavo tomanasdsdo agua',
        NotificationWay.Push
      );
    }, 100);
  }

  public get isDarkMode(): boolean {
    return this.themeService.isDarkMode;
  }

  private removeSplashScreen(): void {
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.remove();
    }
  }
}
