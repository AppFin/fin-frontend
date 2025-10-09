import {

  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinGridOptions } from '../../../shared/components/grid/models/fin-grid-options';
import { IFinGridColumnOption } from '../../../shared/components/grid/models/columns/i-fin-grid-column-option';
import { Observable, of, Subject, tap } from 'rxjs';
import { FinancialInstitutionOutput } from '../../../shared/types/financial-institutions/financial-institution-output';
import { FinGridSimpleColumnOption } from '../../../shared/components/grid/models/columns/fin-grid-simple-column-option';
import {
  FinGridIconColumnOption,
  FinIconOptions,
} from '../../../shared/components/grid/models/columns/fin-grid-icon-column-option';
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

  private toggleInactive(item: FinancialInstitutionOutput): Observable<void> {
      return this.apiService
        .toggleInactive(item.id)
        .pipe(tap(() => this.reloadItens.next()));
    }
  
  private setOptions() {
    const gridOptions = new FinGridOptions<FinancialInstitutionOutput>({
      id: 'FINANCIAL_INSTITUTIONS_LIST',
      getColumns: () => of(this.getColumns()),
      onEdit : (item) => {
        this.router.navigate([`./${item.id}`], { relativeTo: this.activatedRoute });
        return of();
      },
      deleteOptions: {
        onDelete: (item) => this.apiService.delete(item.id.toString()).pipe(tap(() => this.reloadItens.next())),
        confirmDeleteMessage: 'finCore.features.titleCategory.deleteMessage',
      },
      onToggleInactive: this.toggleInactive.bind(this),
      getInactive: (item) => item.inactive, 
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
        getValue: (item) => item.code,
        header: 'finCore.features.financialInstitutions.code',
        width: '100px',
      }),
      new FinGridIconColumnOption<FinancialInstitutionOutput>({
        getValue: (item) => {
          return new FinIconOptions({
            icon: item.icon,
            type: 'bank',
            tooltip: item.icon,
          });
        },
        header: 'finCore.features.shared.icon',
        width: '3%',
      }),
      new FinGridIconColumnOption<FinancialInstitutionOutput>({
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
      new FinGridSimpleColumnOption<FinancialInstitutionOutput>({
        header: 'finCore.features.financialInstitutions.type',
        getValue: (item) => {
          return FinancialInstitutionType[item.type];
        },
      })
    ];
  }
}
