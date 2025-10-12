import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ensureTrailingSlash } from '../../../core/functions/ensure-trailing-slash';
import { toHttpParams } from '../../../core/functions/to-http-params';
import { FinancialInstitutionInput } from '../../types/financial-institutions/financial-institution-input';
import { FinancialInstitutionOutput } from '../../types/financial-institutions/financial-institution-output';
import { PagedOutput } from '../../models/paginations/paged-output';
import { FinancialInstitutionGetListInput } from '../../types/financial-institutions/financial-intituton-get-list-input';

@Injectable({
  providedIn: 'root',
})
export class FinancialInstitutionApiService {
  private readonly API_URL = ensureTrailingSlash(environment.apiUrl) + 'financial-institutions/';
  private readonly http = inject(HttpClient);

  public getList(
    input: FinancialInstitutionGetListInput
  ): Observable<PagedOutput<FinancialInstitutionOutput>> {
    const params = toHttpParams(input);
    return this.http.get<PagedOutput<FinancialInstitutionOutput>>(this.API_URL, { params });
  }

  public get(id: string): Observable<FinancialInstitutionOutput> {
    return this.http.get<FinancialInstitutionOutput>(this.API_URL + id);
  }

  public create(input: FinancialInstitutionInput): Observable<FinancialInstitutionOutput> {
    return this.http.post<FinancialInstitutionOutput>(this.API_URL, input);
  }

  public update(id: string, input: FinancialInstitutionInput): Observable<void> {
    return this.http.put<void>(this.API_URL + id, input);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(this.API_URL + id);
  }

  public toggleInactive(id: string): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}${id}/toggle-inactive`, {});
  }
}
