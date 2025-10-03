import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FinancialInstitutionService } from '../../../core/services/financial-institutions/financial-institution.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FinGridOptions } from '../../../shared/components/grid/models/fin-grid-options';
import { IFinGridColumnOption } from '../../../shared/components/grid/models/columns/i-fin-grid-column-option';
import { Observable, of, Subject, tap } from 'rxjs';
import { FinancialInstitutionOutput } from '../../../shared/models/financial-institutions/financial-institution.model';
import { FinGridSimpleColumnOption } from '../../../shared/components/grid/models/columns/fin-grid-simple-column-option';
import {
  FinGridIconColumnOption,
  FinIconOptions,
} from '../../../shared/components/grid/models/columns/fin-grid-icon-column-option';
import { IFinGridActionOption } from '../../../shared/components/grid/models/i-fin-grid-action-option';
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { FinPageLayoutComponent } from '../../../shared/components/page-layout/fin-page-layout.component';
import { FinGridComponent } from '../../../shared/components/grid/fin-grid.component';
import { FinButtonComponent } from '../../../shared/components/button/fin-button.component';
import { INSTITUTION_TYPE_LABELS } from '../../../shared/enums/financial-institutions/institution-type.enum';

@Component({
  selector: 'fin-financial-institutions-list',
  imports: [
    FinPageLayoutComponent,
    FinGridComponent,
    FinButtonComponent,
  ],
  templateUrl: './financial-institutions-list.component.html',
  styleUrl: './financial-institutions-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancialInstitutionsListComponent implements OnInit {
  public readonly gridOptions = signal<FinGridOptions>(new FinGridOptions());
  public readonly loading = signal(true);
  public readonly institutions = signal<FinancialInstitutionOutput[]>([]);

  private readonly apiService = inject(FinancialInstitutionService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly reloadItens = new Subject<void>();

  public ngOnInit(): void {
    this.setOptions();
  }

  public createInstitution(): void {
    this.router.navigate(['./new'], { relativeTo: this.activatedRoute });
  }

  private setOptions() {
    const gridOptions = new FinGridOptions({
      id: 'FINANCIAL_INSTITUTIONS_LIST',
      getColumns: () => of(this.getColumns()),
      getActions: () => of(this.getActions()),
      getList: (input) => this.getInstitutions(input),
      reloadItens: this.reloadItens,
    });

    this.gridOptions.set(gridOptions);
    this.loading.set(false);
  }

  private getColumns(): IFinGridColumnOption<FinancialInstitutionOutput>[] {
    return [
      new FinGridSimpleColumnOption<FinancialInstitutionOutput>({
        getValue: (item) => item.name,
        header: 'finCore.features.financialInstitutions.bankName',
      }),
      new FinGridSimpleColumnOption<FinancialInstitutionOutput>({
        getValue: (item) => item.code || '-',
        header: 'finCore.features.financialInstitutions.code',
        width: '100px',
      }),
      new FinGridIconColumnOption<FinancialInstitutionOutput>({
        getValue: (item) => {
          if (!item.icon) {
            return new FinIconOptions({
              icon: 'image',
              type: 'fontAwesome',
              tooltip: 'Sem ícone',
            });
          }
          
          const iconName = item.icon.replace('.png', '');
          return new FinIconOptions({
            icon: iconName,
            type: 'image',
            imageFolder: 'icons/bank/',
            imageExtension: '.png',
            tooltip: item.name,
          });
        },
        header: 'finCore.features.financialInstitutions.icon',
        width: '80px',
      }),
      new FinGridSimpleColumnOption<FinancialInstitutionOutput>({
        getValue: (item) => INSTITUTION_TYPE_LABELS[item.type],
        header: 'finCore.features.financialInstitutions.type',
        width: '200px',
      }),
      new FinGridIconColumnOption<FinancialInstitutionOutput>({
        getValue: (item) => {
          if (!item.active) {
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
        header: 'finCore.features.shared.active',
        width: '80px',
      }),
    ];
  }

  private getActions(): IFinGridActionOption<FinancialInstitutionOutput>[] {
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

  private edit(item: FinancialInstitutionOutput): Observable<void> {
    this.router.navigate([`./${item.id}`], { relativeTo: this.activatedRoute });
    return of();
  }

  private delete(item: FinancialInstitutionOutput): Observable<void> {
    return this.apiService
      .delete(item.id.toString())
      .pipe(tap(() => this.reloadItens.next()));
  }

  private getInstitutions(
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<FinancialInstitutionOutput>> {
    return this.apiService.getAll(input);
  }
}
