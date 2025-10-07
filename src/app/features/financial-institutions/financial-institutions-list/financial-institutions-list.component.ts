import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinGridOptions } from '../../../shared/components/grid/models/fin-grid-options';
import { IFinGridColumnOption } from '../../../shared/components/grid/models/columns/i-fin-grid-column-option';
import { of, Subject, tap } from 'rxjs';
import { FinancialInstitutionOutput } from '../../../shared/models/financial-institutions/financial-institution-output';
import { FinGridSimpleColumnOption } from '../../../shared/components/grid/models/columns/fin-grid-simple-column-option';
import {
  FinGridIconColumnOption,
  FinIconOptions,
} from '../../../shared/components/grid/models/columns/fin-grid-icon-column-option';
import { IFinGridActionOption } from '../../../shared/components/grid/models/i-fin-grid-action-option';
import { FinPageLayoutComponent } from '../../../shared/components/page-layout/fin-page-layout.component';
import { FinancialInstitutionType } from '../../../shared/enums/financial-institutions/financial-institution-type';
import { FinGridComponent } from '../../../shared/components/grid/fin-grid.component';
import { FinButtonComponent } from '../../../shared/components/button/fin-button.component';
import { FinancialInstitutionApiService } from '../../../shared/services/financial-institutions/financial-institution-api.service';

@Component({
  selector: 'fin-financial-institutions-list',
  imports: [
    FinPageLayoutComponent,
    FinGridComponent,
    FinButtonComponent,
  ],
  templateUrl: './financial-institutions-list.component.html',
  styleUrl: './financial-institutions-list.component.scss',
})
export class FinancialInstitutionsListComponent implements OnInit {
  public readonly gridOptions = signal<FinGridOptions>(new FinGridOptions());
  public readonly loading = signal(true);

  private readonly apiService = inject(FinancialInstitutionApiService);
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
      // onUp
      getList: (input) => this.apiService.getList(input),
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
          const institution = getInstitutionByCode(item.code);
          
          if (!institution) {
            return new FinIconOptions({
              icon: 'image',
              type: 'fontAwesome',
              tooltip: 'Sem ícone',
            });
          }
          
          return new FinIconOptions({
            icon: institution.icon,
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
        getValue: (item) => item.type as FinancialInstitutionType,
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
        onClick: (item) => {
          this.router.navigate([`./${item.id}`], { relativeTo: this.activatedRoute });
          return of();
        },
      },
      {
        icon: new FinIconOptions({
          icon: 'trash',
          color: 'var(--color-error)',
          tooltip: 'finCore.actions.delete',
        }),
        canShow: () => of(true),
        disabled: () => of(false),
        onClick: (item) => this.apiService.delete(item.id.toString()).pipe(tap(() => this.reloadItens.next())),
      },
    ];
  }
}
