import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit, signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ThemeService } from './core/services/theme/theme.service';
import { MatButtonModule } from '@angular/material/button';
import { FinTextComponent } from './shared/components/text/fin-text.component';
import { FinButtonComponent } from './shared/components/button/fin-button.component';
import { FinSaveButtonComponent } from './shared/components/save-button/fin-save-button.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    FinTextComponent,
    FinButtonComponent,
    FinSaveButtonComponent,
  ],
})
export class AppComponent implements OnInit {
  public saving = signal(false);
  public canSave = signal(false);

  private readonly themeService = inject(ThemeService);

  public ngOnInit(): void {
    this.removeSplashScreen();
  }

  public get isDarkMode(): boolean {
    return this.themeService.isDarkMode;
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  public log(): void {
    console.log('AppComponent log');
    this.saving.set(true);
    setTimeout(() => this.saving.set(false), 5000);
  }

  private removeSplashScreen(): void {
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.remove();
    }
  }
}
