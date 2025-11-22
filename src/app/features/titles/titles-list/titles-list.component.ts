import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { LayoutService } from '../../../core/services/layout/layout.service';
import { FinButtonComponent } from '../../../shared/components/generics/button/fin-button.component';
import { FinGridComponent } from '../../../shared/components/generics/grid/fin-grid.component';
import { FinGridDateTimeColumnOption } from '../../../shared/components/generics/grid/models/columns/fin-grid-date-time-column-option';
import {
  FinGridIconColumnOption,
  FinIconOptions,
} from '../../../shared/components/generics/grid/models/columns/fin-grid-icon-column-option';
import { FinGridMoneyColumnOption } from '../../../shared/components/generics/grid/models/columns/fin-grid-money-column-option';
import { FinGridSimpleColumnOption } from '../../../shared/components/generics/grid/models/columns/fin-grid-simple-column-option';
import { IFinGridColumnOption } from '../../../shared/components/generics/grid/models/columns/i-fin-grid-column-option';
import { FinGridOptions } from '../../../shared/components/generics/grid/models/fin-grid-options';
import { FinPageLayoutComponent } from '../../../shared/components/generics/page-layout/fin-page-layout.component';
import { PersonColumnOption } from '../../../shared/components/people/person-column/person-column-option';
import { TitleCategoriesColumnOption } from '../../../shared/components/title-categories/title-categories-column/title-categories-column-option';
import { WalletColumnComponent } from '../../../shared/components/wallets/wallet-column/wallet-column.component';
import { TitleType } from '../../../shared/enums/titles/title-type';
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { ObservableValidated } from '../../../shared/rxjs-operators/handle-fin-back-http-error';
import { TitleService } from '../../../shared/services/titles/title.service';
import { TitleGetListInput } from '../../../shared/types/titles/title-get-list-input';
import { TitleOutput } from '../../../shared/types/titles/title-output';
import {
  TitleFilter,
  TitleListFilterComponent,
} from './title-list-filter/title-list-filter.component';

@Component({
  selector: 'fin-titles-list',
  imports: [
    FinPageLayoutComponent,
    FinButtonComponent,
    FinGridComponent,
    TitleListFilterComponent,
  ],
  templateUrl: './titles-list.component.html',
  styleUrl: './titles-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitlesListComponent implements OnInit {
  public readonly filterTemplate = viewChild<TemplateRef<any>>('filter');

  public readonly gridOptions = signal<FinGridOptions<TitleOutput>>(
    new FinGridOptions()
  );
  public readonly loading = signal(true);

  private readonly apiService = inject(TitleService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly layoutService = inject(LayoutService);

  private readonly reloadItens = new Subject<void>();

  private appliedFilter?: TitleFilter;

  public ngOnInit(): void {
    this.setOptions();
  }

  public createTitleCard(): void {
    this.router.navigate(['./new'], { relativeTo: this.activatedRoute });
  }

  public openFilter() {
    const template = this.filterTemplate();
    if (!template) return;
    this.layoutService
      .openSideModal<
        TitleFilter,
        TitleFilter
      >(template, { width: '40%' }, this.appliedFilter)
      .subscribe((filter) => {
        if (!filter) return;
        this.appliedFilter = filter;
        this.reloadItens.next();
      });
  }

  private setOptions() {
    const gridOptions = new FinGridOptions({
      id: 'TITLES_LIST',
      getColumns: () => of(this.getColumns()),
      reloadItens: this.reloadItens,
      getList: (input) => this.getCreditCards(input),
      onEdit: this.edit.bind(this),
      deleteOptions: {
        onDelete: this.delete.bind(this),
      },
    });

    this.gridOptions.set(gridOptions);
    this.loading.set(false);
  }

  private edit(item: TitleOutput): Observable<void> {
    this.router.navigate([`./${item.id}`], { relativeTo: this.activatedRoute });
    return of();
  }

  private delete(item: TitleOutput): ObservableValidated<void> {
    return this.apiService.delete(item.id);
  }

  private getCreditCards(
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<TitleOutput>> {
    return this.apiService.getList({
      ...this.appliedFilter,
      ...input,
      filter: {
        property: 'description',
        filter: this.appliedFilter?.filter,
      },
    } as TitleGetListInput);
  }

  private getColumns(): IFinGridColumnOption<TitleOutput>[] {
    return [
      new FinGridIconColumnOption<TitleOutput>({
        getValue: (item) =>
          new FinIconOptions({
            severity: item.type == TitleType.Expense ? 'danger' : 'success',
            icon: item.type == TitleType.Expense ? 'arrow-down' : 'arrow-up',
          }),
      }),
      new FinGridSimpleColumnOption<TitleOutput>({
        getValue: (item) => item.description,
        header: 'finCore.features.shared.description',
      }),
      new FinGridMoneyColumnOption<TitleOutput>({
        getValue: (item) => item.effectiveValue,
        header: 'finCore.features.shared.value',
      }),
      new FinGridDateTimeColumnOption<TitleOutput>({
        getValue: (item) => item.date,
        header: 'finCore.features.shared.date',
        type: 'datetime',
      }),
      new FinGridSimpleColumnOption<TitleOutput>({
        getValue: (item) => item.walletId,
        header: 'finCore.features.wallet.titleSingular',
        customColumn: () => WalletColumnComponent,
      }),
      new TitleCategoriesColumnOption<TitleOutput>({
        header: 'finCore.features.titleCategory.title',
        getValue: (item) => item.titleCategoriesIds,
      }),
      new PersonColumnOption<TitleOutput>({
        header: 'finCore.features.person.title',
        getValue: (item) => item.titlePeople.map((t) => t.personId),
      }),
    ];
  }
}
