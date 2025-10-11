import { inject, Injectable } from '@angular/core';
import { FinancialInstitutionApiService } from '../../../../shared/services/financial-institutions/financial-institution-api.service';
import { Observable, of, tap } from 'rxjs';
import { FinancialInstitutionOutput } from '../../../../shared/types/financial-institutions/financial-institution-output';

@Injectable({
  providedIn: 'root',
})
export class FinancialInstitutionWalletColumnService {
  private readonly financialInstitutionCache = new Map<
    string,
    FinancialInstitutionOutput
  >();
  private readonly financialInstitutionService = inject(
    FinancialInstitutionApiService
  );

  public clearCahce(): void {
    this.financialInstitutionCache.clear();
  }

  public get(id: string): Observable<FinancialInstitutionOutput> {
    const financialInstitutionService = this.financialInstitutionCache.get(id);
    if (financialInstitutionService) {
      return of(financialInstitutionService);
    }

    return this.financialInstitutionService.get(id).pipe(
      tap((financialInstitutionOutput) => {
        this.financialInstitutionCache.set(id, financialInstitutionOutput);
      })
    );
  }
}
