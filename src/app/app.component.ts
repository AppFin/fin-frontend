import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ThemeService } from './core/services/theme/theme.service';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, RouterOutlet],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly appService = inject(AppService);

  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.removeSplashScreen();
    this.appService.onInit(this.destroyRef);
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
