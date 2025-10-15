import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ensureTrailingSlash } from '../../../core/functions/ensure-trailing-slash';
import { toHttpParams } from '../../../core/functions/to-http-params';
import { FinancialInstitutionInput } from '../../types/financial-institutions/financial-institution-input';
import { FinancialInstitutionOutput } from '../../types/financial-institutions/financial-institution-output';
import { PagedOutput } from '../../models/paginations/paged-output';
import { FinancialInstitutionGetListInput } from '../../types/financial-institutions/financial-intituton-get-list-input';
import { CachedEntityService } from '../abstractions/cached-entities/cached-entity.service';

@Injectable({
  providedIn: 'root',
})
export class FinancialInstitutionApiService extends CachedEntityService<
  FinancialInstitutionOutput,
  FinancialInstitutionGetListInput
> {
  private readonly API_URL =
    ensureTrailingSlash(environment.apiUrl) + 'financial-institutions/';
  private readonly http = inject(HttpClient);

  public override getList = (
    input: FinancialInstitutionGetListInput
  ): Observable<PagedOutput<FinancialInstitutionOutput>> => {
    const params = toHttpParams(input);
    return this.http.get<PagedOutput<FinancialInstitutionOutput>>(
      this.API_URL,
      { params }
    );
  };

  public get(id: string): Observable<FinancialInstitutionOutput> {
    return this.http.get<FinancialInstitutionOutput>(this.API_URL + id);
  }

  public create(
    input: FinancialInstitutionInput
  ): Observable<FinancialInstitutionOutput> {
    return this.http.post<FinancialInstitutionOutput>(this.API_URL, input).pipe(
      tap((financialInstitution) => {
        this.updateOrCreateOnCache(financialInstitution);
      })
    );
  }

  public update(
    id: string,
    input: FinancialInstitutionInput
  ): Observable<void> {
    return this.http
      .put<void>(this.API_URL + id, input)
      .pipe(tap(async () => await this.updateItemOnCache(id)));
  }

  public delete(id: string): Observable<void> {
    return this.http
      .delete<void>(this.API_URL + id)
      .pipe(tap(() => this.deleteCache(id)));
  }

  public toggleInactive(id: string): Observable<void> {
    return this.http
      .patch<void>(`${this.API_URL}${id}/toggle-inactive`, {})
      .pipe(tap(async () => await this.updateItemOnCache(id)));
  }

  private async updateItemOnCache(id: string): Promise<void> {
    const financialInstitution = await firstValueFrom(this.get(id));
    this.updateOrCreateOnCache(financialInstitution);
  }

  protected override applyStructuralFilter(
    entity: FinancialInstitutionOutput,
    filter: FinancialInstitutionGetListInput
  ): boolean {
    const filterByInactive =
      filter.inactive !== undefined && filter.inactive !== null;
    const filterByType = filter.type !== undefined && filter.type !== null;

    return (
      (!filterByInactive || filter.inactive === entity.inactive) &&
      (!filterByType || filter.type === entity.type)
    );
  }
}
