import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ThemeService } from './core/services/theme/theme.service';
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
export class AppComponent {
  public formControl = new FormControl('');
  public formControlRequired = new FormControl('', Validators.required);
  public formControlDisabled = new FormControl({ value: '', disabled: true });
  private readonly themeService = inject(ThemeService);

  public get isDarkMode(): boolean {
    return this.themeService.isDarkMode;
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
