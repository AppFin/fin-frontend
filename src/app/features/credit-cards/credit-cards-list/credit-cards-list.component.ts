import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Observable, of, Subject, tap } from 'rxjs';
import { FinButtonComponent } from "../../../shared/components/generics/button/fin-button.component";
import { FinGridComponent } from "../../../shared/components/generics/grid/fin-grid.component";
import { FinGridIconColumnOption, FinIconOptions } from '../../../shared/components/generics/grid/models/columns/fin-grid-icon-column-option';
import { FinGridMoneyColumnOption } from '../../../shared/components/generics/grid/models/columns/fin-grid-money-column-option';
import { FinGridSimpleColumnOption } from '../../../shared/components/generics/grid/models/columns/fin-grid-simple-column-option';
import { IFinGridColumnOption } from '../../../shared/components/generics/grid/models/columns/i-fin-grid-column-option';
import { FinGridOptions } from '../../../shared/components/generics/grid/models/fin-grid-options';
import { FinPageLayoutComponent } from "../../../shared/components/generics/page-layout/fin-page-layout.component";
import { FinInactivatedFilterSelectComponent } from "../../../shared/components/inactivated-filter-select/fin-inactivated-filter-select.component";
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { ObservableValidated } from '../../../shared/rxjs-operators/handle-fin-back-http-error';
import { CreditCardService } from '../../../shared/services/credit-cards/credit-card.service';
import { CreditCardGetListInput } from '../../../shared/types/credit-cards/credit-card-get-list-input';
import { CreditCardOutput } from '../../../shared/types/credit-cards/credit-card-output';
import { TitleCategoryOutput } from '../../../shared/types/title-categories/title-category-output';
import { FinancialInstitutionColumnComponent } from '../../../shared/components/financial-institution/financial-institution-column/financial-institution-column.component';
import { CardBrandColumnComponent } from '../../../shared/components/card-brands/card-brand-column/card-brand-column.component';
import { WalletColumnComponent } from '../../../shared/components/wallets/wallet-column/wallet-column.component';

type CreditCardsListFilterForm = {
  inactivated: FormControl<boolean | null>;
};


@Component({
  selector: 'fin-credit-cards-list',
  imports: [FinPageLayoutComponent, FinButtonComponent, FinInactivatedFilterSelectComponent, FinGridComponent],
  templateUrl: './credit-cards-list.component.html',
  styleUrl: './credit-cards-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditCardsListComponent implements OnInit {
  public readonly gridOptions = signal<FinGridOptions<CreditCardOutput>>(
    new FinGridOptions()
  );
  public readonly loading = signal(true);

  public filterForm: FormGroup<CreditCardsListFilterForm>;

  private readonly apiService = inject(CreditCardService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  private readonly reloadItens = new Subject<void>();

  public ngOnInit(): void {
    this.setForm();
    this.setOptions();
  }

  public createCreditCard(): void {
    this.router.navigate(['./new'], { relativeTo: this.activatedRoute });
  }

  private setOptions() {
    const gridOptions = new FinGridOptions({
      id: 'CREDIT_CARDS_LIST',
      getColumns: () => of(this.getColumns()),
      reloadItens: this.reloadItens,
      getList: (input) => this.getCreditCards(input),
      onEdit: this.edit.bind(this),
      rowStyle: (item) => {
        return item.inactivated
          ? { backgroundColor: 'var(--color-error-50)' }
          : null;
      },
      onToggleInactive: this.toggleInactivated.bind(this),
      getInactive: (i) => {
        return i.inactivated;
      },
      deleteOptions: {
        onDelete: this.delete.bind(this),
      },
    });

    this.gridOptions.set(gridOptions);
    this.loading.set(false);
  }

  private getColumns(): IFinGridColumnOption<CreditCardOutput>[] {
    return [
      new FinGridIconColumnOption<TitleCategoryOutput>({
        getValue: (item) => {
          return new FinIconOptions({
            icon: item.icon,
            color: item.color,
          });
        },
        header: 'finCore.features.shared.icon',
        width: '3%',
      }),
      new FinGridSimpleColumnOption<CreditCardOutput>({
        getValue: (item) => item.name,
        header: 'finCore.features.shared.name',
      }),
      new FinGridSimpleColumnOption<CreditCardOutput>({
        getValue: (item) => item.debitWalletId,
        header: 'finCore.features.creditCard.debitWallet',
        customColumn: () => WalletColumnComponent
      }),
      new FinGridSimpleColumnOption<CreditCardOutput>({
        getValue: (item) => item.financialInstitutionId,
        header: 'finCore.features.financialInstitutions.titleSingular',
        customColumn: () => FinancialInstitutionColumnComponent
      }),
      new FinGridSimpleColumnOption<CreditCardOutput>({
        getValue: (item) => item.cardBrandId,
        header: 'finCore.features.cardBrand.titleSingular',
        customColumn: () => CardBrandColumnComponent
      }),
      new FinGridMoneyColumnOption<CreditCardOutput>({
        header: 'finCore.features.creditCard.limit',
        getValue: item => item.limit
      }),
      new FinGridSimpleColumnOption<CreditCardOutput>({
        header: 'finCore.features.creditCard.closingDay',
        getValue: item => item.closingDay
      }),
      new FinGridSimpleColumnOption<CreditCardOutput>({
        header: 'finCore.features.creditCard.dueDay',
        getValue: item => item.dueDay
      })
    ];
  }

  private edit(item: CreditCardOutput): Observable<void> {
    this.router.navigate([`./${item.id}`], { relativeTo: this.activatedRoute });
    return of();
  }

  private delete(item: CreditCardOutput): ObservableValidated<void> {
    return this.apiService.delete(item.id);
  }

  private toggleInactivated(item: CreditCardOutput): ObservableValidated<void> {
    return this.apiService
      .toggleInactivated(item.id)
      .pipe(tap(() => this.reloadItens.next()));
  }

  private getCreditCards(
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<CreditCardOutput>> {
    return this.apiService.getList({
      ...input,
      ...this.filterForm.value,
    } as CreditCardGetListInput);
  }

  private setForm(): void {
    this.filterForm = new FormGroup<CreditCardsListFilterForm>({
      inactivated: new FormControl(),
    });

    this.filterForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(300))
      .subscribe(() => this.reloadItens.next());
  }
}
