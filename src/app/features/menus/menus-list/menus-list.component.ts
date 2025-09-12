import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MenuApiService } from '../../../core/services/layout/menu-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FinGridOptions } from '../../../shared/components/grid/models/fin-grid-options';
import { IFinGridColumnOption } from '../../../shared/components/grid/models/columns/i-fin-grid-column-option';
import { Observable, of, Subject, tap } from 'rxjs';
import { MenuOutput } from '../../../core/types/layouts/menu-output';
import { FinGridSimpleColumnOption } from '../../../shared/components/grid/models/columns/fin-grid-simple-column-option';
import {
  FinGridIconColumnOption,
  FinIconOptions,
} from '../../../shared/components/grid/models/columns/fin-grid-icon-column-option';
import { MenuPosition } from '../../../core/enums/layouts/menu-position';
import { IFinGridActionOption } from '../../../shared/components/grid/models/i-fin-grid-action-option';
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { FinPageLayoutComponent } from '../../../shared/components/page-layout/fin-page-layout.component';
import { FinGridComponent } from '../../../shared/components/grid/fin-grid.component';
import { FinButtonComponent } from '../../../shared/components/button/fin-button.component';

@Component({
  selector: 'fin-menus-list',
  imports: [FinPageLayoutComponent, FinGridComponent, FinButtonComponent],
  templateUrl: './menus-list.component.html',
  styleUrl: './menus-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenusListComponent implements OnInit {
  public readonly gridOptions = signal<FinGridOptions>(new FinGridOptions());
  public readonly loading = signal(true);

  private readonly apiService = inject(MenuApiService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly reloadItens = new Subject<void>();

  public ngOnInit(): void {
    this.setOptions();
  }

  public createMenu(): void {
    this.router.navigate(['./new'], { relativeTo: this.activatedRoute });
  }

  private setOptions() {
    const gridOptions = new FinGridOptions({
      id: 'MEUS_LIST',
      getColumns: () => of(this.getColumns()),
      getActions: () => of(this.getActions()),
      getList: (input) => this.getMenus(input),
      reloadItens: this.reloadItens,
    });

    this.gridOptions.set(gridOptions);
    this.loading.set(false);
  }

  private getColumns(): IFinGridColumnOption<MenuOutput>[] {
    return [
      new FinGridSimpleColumnOption<MenuOutput>({
        getValue: (item) => item.name,
        header: 'finCore.feature.menus.name',
      }),
      new FinGridSimpleColumnOption<MenuOutput>({
        getValue: (item) => item.frontRoute,
        header: 'finCore.feature.menus.frontRoute',
      }),
      new FinGridIconColumnOption<MenuOutput>({
        getValue: (item) =>
          new FinIconOptions({
            color: item.color,
            icon: item.icon,
          }),
        header: 'finCore.feature.menus.icon',
        width: '50px',
      }),
      new FinGridIconColumnOption<MenuOutput>({
        getValue: (item) => {
          if (item.position == MenuPosition.Hide) {
            return new FinIconOptions({
              icon: 'times',
              color: 'var(--color-disabled)',
            });
          }
          return new FinIconOptions({
            icon: 'check',
            color: 'var(--color-success)',
          });
        },
        header: 'finCore.feature.menus.showOnSideNav',
        width: '50px',
      }),
    ];
  }

  private getActions(): IFinGridActionOption<MenuOutput>[] {
    return [
      {
        icon: new FinIconOptions({
          icon: 'pen',
          tooltip: 'finCore.actions.edit',
          color: 'var(--color-disabled)',
        }),
        canShow: () => of(true),
        disabled: () => of(false),
        onClick: (item) => this.edit(item),
      },
      {
        icon: new FinIconOptions({
          icon: 'trash',
          color: 'var(--color-error)',
          tooltip: 'finCore.actions.delete',
        }),
        canShow: () => of(true),
        disabled: () => of(false),
        onClick: (item) => this.delete(item),
      },
    ];
  }

  private edit(item: MenuOutput): Observable<void> {
    this.router.navigate([`./${item.id}`], { relativeTo: this.activatedRoute });
    return of();
  }

  private delete(item: MenuOutput): Observable<void> {
    return this.apiService
      .delete(item.id)
      .pipe(tap(() => this.reloadItens.next()));
  }

  private getMenus(
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<MenuOutput>> {
    return this.apiService.getList(input);
  }
}
