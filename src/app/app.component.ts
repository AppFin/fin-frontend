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
import { FinGridComponent } from './shared/components/grid/fin-grid.component';
import { FinGridOptions } from './shared/components/grid/models/fin-grid-options';
import { of } from 'rxjs';
import { FinGridSimpleColumnOption } from './shared/components/grid/models/columns/fin-grid-simple-column-option';
import { FakeData, generateRandomDataArray } from './gen-fake-itens';
import { PagedOutput } from './shared/models/paginations/paged-output';
import { FinGridDateTimeColumnOption } from './shared/components/grid/models/columns/fin-grid-date-time-column-option';
import {
  FinGridIconColumnOption,
  FinIconOptions,
} from './shared/components/grid/models/columns/fin-grid-icon-column-option';

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
    FinGridComponent,
  ],
})
export class AppComponent implements OnInit {
  public options = new FinGridOptions<FakeData>({
    getColumns: () =>
      of([
        new FinGridSimpleColumnOption<FakeData>({
          getValue: (i) => i.name,
          header: 'Name',
        }),
        new FinGridSimpleColumnOption<FakeData>({
          getValue: (i) => i.company,
          header: 'fin-core.grid.sample.item',
        }),
        new FinGridDateTimeColumnOption<FakeData>({
          getValue: (i) => i.date,
          header: 'Date',
          type: 'time',
        }),
        new FinGridIconColumnOption<FakeData>({
          getValue: (i) => new FinIconOptions({ icon: 'times', color: 'green' }),
          header: 'Icon',
        }),
      ]),
    id: 'asd',
    getList: (input) =>
      of({
        totalCount: 100,
        items: generateRandomDataArray(input.maxResultCount ?? 15),
      } as PagedOutput),
  });

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

  private removeSplashScreen(): void {
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.remove();
    }
  }
}
