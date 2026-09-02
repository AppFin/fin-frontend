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
import { FinGridMoneyColumnOption } from '../../../shared/components/generics/grid/models/columns/fin-grid-money-column-option';
import { FinGridSimpleColumnOption } from '../../../shared/components/generics/grid/models/columns/fin-grid-simple-column-option';
import { IFinGridColumnOption } from '../../../shared/components/generics/grid/models/columns/i-fin-grid-column-option';
import { FinGridOptions } from '../../../shared/components/generics/grid/models/fin-grid-options';
import { FinPageLayoutComponent } from '../../../shared/components/generics/page-layout/fin-page-layout.component';
import { PersonColumnOption } from '../../../shared/components/people/person-column/person-column-option';
import { TitleCategoriesColumnOption } from '../../../shared/components/title-categories/title-categories-column/title-categories-column-option';
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { ObservableValidated } from '../../../shared/rxjs-operators/handle-fin-back-http-error';
import { CreditChargeService } from '../../../shared/services/credit-charges/credit-charge.service';
import { CreditChargeGetListInput } from '../../../shared/types/credit-charges/credit-charge-get-list-input';
import { CreditChargeOutput } from '../../../shared/types/credit-charges/credit-charge-output';
import {
  CreditChargeListFilter,
  CreditChargeListFilterComponent,
} from './credit-charges-list-filter/credit-charges-list-filter.component';

@Component({
  selector: 'fin-credit-charges-list',
  imports: [
    FinPageLayoutComponent,
    FinButtonComponent,
    FinGridComponent,
    CreditChargeListFilterComponent,
  ],
  templateUrl: './credit-charges-list.component.html',
  styleUrl: './credit-charges-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditChargesListComponent implements OnInit {
  public readonly filterTemplate = viewChild<TemplateRef<any>>('filter');

  public readonly gridOptions = signal<FinGridOptions<CreditChargeOutput>>(
    new FinGridOptions()
  );
  public readonly loading = signal(true);

  private readonly apiService = inject(CreditChargeService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly layoutService = inject(LayoutService);

  private readonly reloadItens = new Subject<void>();

  private appliedFilter?: CreditChargeListFilter;

  public ngOnInit(): void {
    this.setOptions();
  }

  public createCreditCharge(): void {
    this.router.navigate(['./new'], { relativeTo: this.activatedRoute });
  }

  public openFilter() {
    const template = this.filterTemplate();
    if (!template) return;
    this.layoutService
      .openSideModal<
        CreditChargeListFilter,
        CreditChargeListFilter
      >(template, { width: '40%' }, this.appliedFilter)
      .subscribe((filter) => {
        if (!filter) return;
        this.appliedFilter = filter;
        this.reloadItens.next();
      });
  }

  private setOptions() {
    const gridOptions = new FinGridOptions({
      id: 'CREDIT_CHARGES_LIST',
      getColumns: () => of(this.getColumns()),
      reloadItens: this.reloadItens,
      getList: (input) => this.getCreditCharges(input),
      onEdit: this.edit.bind(this),
      deleteOptions: {
        onDelete: this.delete.bind(this),
      },
    });

    this.gridOptions.set(gridOptions);
    this.loading.set(false);
  }

  private edit(item: CreditChargeOutput): Observable<void> {
    this.router.navigate([`./${item.id}`], { relativeTo: this.activatedRoute });
    return of();
  }

  private delete(item: CreditChargeOutput): ObservableValidated<void> {
    return this.apiService.delete(item.id);
  }

  private getCreditCharges(
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<CreditChargeOutput>> {
    return this.apiService.getList({
      ...this.appliedFilter,
      ...input,
      filter: {
        property: 'description',
        filter: this.appliedFilter?.filter,
      },
    } as CreditChargeGetListInput);
  }

  private getColumns(): IFinGridColumnOption<CreditChargeOutput>[] {
    return [
      new FinGridSimpleColumnOption<CreditChargeOutput>({
        getValue: (item) => item.description,
        header: 'finCore.features.shared.description',
      }),
      new FinGridMoneyColumnOption<CreditChargeOutput>({
        getValue: (item) => item.value,
        header: 'finCore.features.shared.value',
      }),
      new FinGridSimpleColumnOption<CreditChargeOutput>({
        getValue: (item) => item.numberOfInstallments.toString(),
        header: 'finCore.features.creditCharge.numberOfInstallments',
      }),
      new FinGridDateTimeColumnOption<CreditChargeOutput>({
        getValue: (item) => item.date,
        header: 'finCore.features.shared.date',
        type: 'datetime',
      }),
      new TitleCategoriesColumnOption<CreditChargeOutput>({
        header: 'finCore.features.titleCategory.title',
        getValue: (item) => item.creditChargeCategoriesIds,
      }),
      new PersonColumnOption<CreditChargeOutput>({
        header: 'finCore.features.person.title',
        getValue: (item) => item.creditChargePeople.map((p) => p.personId),
      }),
    ];
  }
}
