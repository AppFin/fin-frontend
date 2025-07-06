import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ThemeService } from './core/services/theme/theme.service';
import { MatButtonModule } from '@angular/material/button';
import { FinTextComponent } from './shared/components/text/fin-text.component';
import { FinSelectComponentOptions } from './shared/components/select/fin-select-component-options';
import { PagedFilteredAndSortedInput } from './shared/models/paginations/paged-filtered-and-sorted-input';
import { FinSelectOption } from './shared/components/select/fin-select-option';
import { PagedOutput } from './shared/models/paginations/paged-output';
import { of } from 'rxjs';
import { FinSelectComponent } from './shared/components/select/fin-select.component';
import { FormControl } from '@angular/forms';

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
    FinSelectComponent,
  ],
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);

  public readonly selectOptions = {
    getOptions: (input: PagedFilteredAndSortedInput) => {
      return of({
        totalCount: 1,
        items: [
          {
            label: 'Kakashi',
            value: 'sensei',
          },
        ],
      } as PagedOutput<FinSelectOption>);
    },
  } as FinSelectComponentOptions;
  public form = new FormControl<string>('');

  public ngOnInit(): void {
    this.removeSplashScreen();
  }

  public get isDarkMode(): boolean {
    return this.themeService.isDarkMode;
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  private removeSplashScreen(): void {
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.remove();
    }
  }
}
