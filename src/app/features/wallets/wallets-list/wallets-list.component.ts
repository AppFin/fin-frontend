import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FinButtonComponent } from '../../../shared/components/button/fin-button.component';
import { FinGridComponent } from '../../../shared/components/grid/fin-grid.component';
import { FinInactivatedFilterSelectComponent } from '../../../shared/components/inactivated-filter-select/fin-inactivated-filter-select.component';
import { FinPageLayoutComponent } from '../../../shared/components/page-layout/fin-page-layout.component';
import { FormControl, FormGroup } from '@angular/forms';
import { FinGridOptions } from '../../../shared/components/grid/models/fin-grid-options';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Observable, of, Subject, tap } from 'rxjs';
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WalletOutput } from '../../../shared/types/wallets/wallet-output';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { WalletGetListInput } from '../../../shared/types/wallets/wallet-get-list-input';
import { IFinGridColumnOption } from '../../../shared/components/grid/models/columns/i-fin-grid-column-option';
import {
  FinGridIconColumnOption,
  FinIconOptions,
} from '../../../shared/components/grid/models/columns/fin-grid-icon-column-option';
import { FinGridSimpleColumnOption } from '../../../shared/components/grid/models/columns/fin-grid-simple-column-option';
import { TitleCategoryOutput } from '../../../shared/types/title-categories/title-category-output';
import { WalletService } from '../../../shared/services/wallets/wallet.service';
import { ObservableValidated } from '../../../shared/rxjs-operators/handle-fin-back-http-error';

type WalletsListFilterForm = {
  inactivated: FormControl<boolean | null>;
};

@Component({
  selector: 'fin-wallets-list',
  imports: [
    FinButtonComponent,
    FinGridComponent,
    FinInactivatedFilterSelectComponent,
    FinPageLayoutComponent,
  ],
  templateUrl: './wallets-list.component.html',
  styleUrl: './wallets-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletsListComponent implements OnInit {
  public readonly gridOptions = signal<FinGridOptions<WalletOutput>>(
    new FinGridOptions()
  );
  public readonly loading = signal(true);

  public filterForm: FormGroup<WalletsListFilterForm>;

  private readonly apiService = inject(WalletService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  private readonly reloadItens = new Subject<void>();

  public ngOnInit(): void {
    this.setForm();
    this.setOptions();
  }

  public createWallet(): void {
    this.router.navigate(['./new'], { relativeTo: this.activatedRoute });
  }

  private setOptions() {
    const gridOptions = new FinGridOptions({
      id: 'WALLETS_LIST',
      getColumns: () => of(this.getColumns()),
      reloadItens: this.reloadItens,
      getList: (input) => this.getWallets(input),
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

  private getColumns(): IFinGridColumnOption<WalletOutput>[] {
    return [
      new FinGridIconColumnOption<TitleCategoryOutput>({
        getValue: (item) => {
          return new FinIconOptions({
            icon: item.icon,
            tooltip: item.icon,
            color: item.color,
          });
        },
        header: 'finCore.features.shared.icon',
        width: '3%',
      }),
      new FinGridIconColumnOption<TitleCategoryOutput>({
        getValue: (item) => {
          return new FinIconOptions({
            icon: 'circle',
            fontAwesomeType: 'fa-solid',
            color: item.color,
            tooltip: item.color,
          });
        },
        header: 'finCore.features.shared.color',
        width: '3%',
      }),
      new FinGridSimpleColumnOption<WalletOutput>({
        getValue: (item) => item.name,
        header: 'finCore.features.wallet.name',
      }),
    ];
  }

  private edit(item: WalletOutput): Observable<void> {
    this.router.navigate([`./${item.id}`], { relativeTo: this.activatedRoute });
    return of();
  }

  private delete(item: WalletOutput): ObservableValidated<void> {
    return this.apiService.delete(item.id);
  }

  private toggleInactivated(item: WalletOutput): ObservableValidated<void> {
    return this.apiService
      .toggleInactivated(item.id)
      .pipe(tap(() => this.reloadItens.next()));
  }

  private getWallets(
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<WalletOutput>> {
    return this.apiService.getList({
      ...input,
      ...this.filterForm.value,
    } as WalletGetListInput);
  }

  private setForm(): void {
    this.filterForm = new FormGroup<WalletsListFilterForm>({
      inactivated: new FormControl(),
    });

    this.filterForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(300))
      .subscribe(() => this.reloadItens.next());
  }
}
