import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ThemeService } from './core/services/theme/theme.service';
import { PagedOutput } from './shared/models/paginations/paged-output';
import { FakeData, generateRandomDataArray } from './gen-fake-itens';
import {
  FinGridIconColumnOption,
  FinIconOptions,
} from './shared/components/grid/models/columns/fin-grid-icon-column-option';
import { FinGridOptions } from './shared/components/grid/models/fin-grid-options';
import { of } from 'rxjs';
import { FinGridSimpleColumnOption } from './shared/components/grid/models/columns/fin-grid-simple-column-option';
import { FinGridDateTimeColumnOption } from './shared/components/grid/models/columns/fin-grid-date-time-column-option';
import { IFinGridActionOption } from './shared/components/grid/models/i-fin-grid-action-option';
import { FinGridComponent } from './shared/components/grid/fin-grid.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, FinGridComponent],
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
          getValue: (i) =>
            new FinIconOptions({ icon: 'times', color: 'green' }),
          header: 'Icon',
        }),
      ]),
    id: 'asd',
    getActions: () =>
      of([
        {
          icon: new FinIconOptions({ icon: 'times', tooltip: 'asdasd' }),
          onClick: (t: FakeData) => console.log(t),
        } as IFinGridActionOption<FakeData>,
        {
          icon: new FinIconOptions({ icon: 'plus' }),
          onClick: (t: FakeData) => console.log('asdasdsadsad'),
        } as IFinGridActionOption<FakeData>,
      ]),
    getRightActions: () =>
      of([
        {
          icon: new FinIconOptions({ icon: 'times', tooltip: 'asdasd' }),
          onClick: (t: FakeData) => console.log(t),
        } as IFinGridActionOption<FakeData>,
        {
          icon: new FinIconOptions({ icon: 'plus' }),
          onClick: (t: FakeData) => console.log('asdasdsadsad'),
        } as IFinGridActionOption<FakeData>,
      ]),
    getList: (input) => {
      console.log(input);
      return of({
        totalCount: 100,
        items: generateRandomDataArray(input.maxResultCount),
      } as PagedOutput);
    },
  });

  private readonly themeService = inject(ThemeService);

  public ngOnInit(): void {
    this.removeSplashScreen();
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
