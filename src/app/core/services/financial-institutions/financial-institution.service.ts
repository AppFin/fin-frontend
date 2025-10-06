import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { FinancialInstitutionInput,FinancialInstitutionOutput,} from '../../../shared/models/financial-institutions/financial-institution.model';
import { toHttpParams } from '../../functions/to-http-params';

@Injectable({
  providedIn: 'root',
})
export class FinancialInstitutionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/financial-institutions`;

  public getAll(
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<FinancialInstitutionOutput>> {
    const params = toHttpParams(input);
    return this.http.get<PagedOutput<FinancialInstitutionOutput>>(this.baseUrl, {
      params,
    });
  }

  public getById(id: string): Observable<FinancialInstitutionOutput> {
    return this.http.get<FinancialInstitutionOutput>(`${this.baseUrl}/${id}`);
  }

  public create(
    input: FinancialInstitutionInput
  ): Observable<FinancialInstitutionOutput> {
    return this.http.post<FinancialInstitutionOutput>(this.baseUrl, input);
  }

  public update(
    id: string,
    input: FinancialInstitutionInput
  ): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, input);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  public activate(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/activate`, {});
  }

  public deactivate(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/deactivate`, {});
  }
}
