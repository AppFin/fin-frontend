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
import { delay, of } from 'rxjs';
import { FinSelectComponent } from './shared/components/select/fin-select.component';
import { FormControl, Validators } from '@angular/forms';
import { FinInputComponent } from './shared/components/input/fin-input.component';

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
    FinInputComponent,
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
            label: 'K323akadasdasdasd asdasd  asdshi',
            value: 'sense123i',
          },
          {
            label: 'Kakashi333',
            value: 'sense32i',
          },
          {
            label: 'Kakash333i',
            value: 'sensei1212',
          },
          {
            label: 'Kakashi123',
            value: 'sensei12',
            disabled: true
          },
          {
            label: 'Kakashi132',
            value: 'sensei2',
          },
        ],
      } as PagedOutput<FinSelectOption>)
        .pipe(delay(5000));
    },
  } as FinSelectComponentOptions;
  public form = new FormControl<string|null>(null, Validators.required);
  public form2 = new FormControl<string>('sensei2', Validators.required);
  public form3 = new FormControl<string>({ value: 'sensei2', disabled: true }, Validators.required);
  public form4 = new FormControl<string>({ value: 'sensei2', disabled: true }, Validators.required);

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
