import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ThemeService } from './core/services/theme.service';
import { MatButtonModule } from '@angular/material/button';
import { TextComponent } from './shared/components/text/text.component';
import { FormControl, Validators } from '@angular/forms';
import { InputComponent } from './shared/components/input/input.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    TextComponent,
    InputComponent,
  ],
})
export class AppComponent implements OnInit {
  public formControl = new FormControl('');
  public formControlRequired = new FormControl('', Validators.required);
  public formControlDisabled = new FormControl({ value: '', disabled: true });
  private readonly translate = inject(TranslateService);
  private readonly themeService = inject(ThemeService);

  public get isDarkMode(): boolean {
    return this.themeService.isDarkMode;
  }

  public ngOnInit(): void {
    this.setLang();
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  private setLang(): void {
    const browserLang = navigator.language || navigator.languages[0];
    const langCode = browserLang.split('-')[0];
    this.translate.use(langCode || 'pt');
  }
}
