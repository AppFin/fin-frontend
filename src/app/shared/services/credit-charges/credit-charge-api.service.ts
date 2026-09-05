import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ensureTrailingSlash } from '../../../core/functions/ensure-trailing-slash';
import { toHttpParams } from '../../../core/functions/to-http-params';
import { PagedOutput } from '../../models/paginations/paged-output';
import { CreditChargeGetListInput } from '../../types/credit-charges/credit-charge-get-list-input';
import { CreditChargeInput } from '../../types/credit-charges/credit-charge-input';
import { CreditChargeOutput } from '../../types/credit-charges/credit-charge-output';

/**
 * Service for interacting with the Credit Charges API endpoints.
 */
@Injectable({
  providedIn: 'root',
})
export class CreditChargeApiService {
  private readonly API_URL =
    ensureTrailingSlash(environment.apiUrl) + 'credit-charges/';
  private readonly http = inject(HttpClient);

  /**
   * Retrieves a paginated and filtered list of credit charges.
   * @param input Pagination and filter parameters.
   * @returns An Observable of the paginated result.
   */
  public getList(
    input: CreditChargeGetListInput
  ): Observable<PagedOutput<CreditChargeOutput>> {
    const params = toHttpParams(input);
    return this.http
      .get<PagedOutput<CreditChargeOutput>>(this.API_URL, { params })
      .pipe(
        map((result) => {
          result.items = result.items.map((creditCharge) => {
            creditCharge.date = new Date(creditCharge.date);
            return creditCharge;
          });
          return result;
        })
      );
  }

  /**
   * Retrieves a credit charge by its ID.
   * @param id The ID of the credit charge.
   * @returns An Observable of the credit charge data.
   */
  public get(id: string): Observable<CreditChargeOutput> {
    return this.http.get<CreditChargeOutput>(this.API_URL + id).pipe(
      map((creditCharge) => {
        creditCharge.date = new Date(creditCharge.date);
        return creditCharge;
      })
    );
  }

  /**
   * Creates a new credit charge.
   * @param input The data for creating the credit charge.
   * @returns An Observable of the created credit charge data.
   */
  public create(input: CreditChargeInput): Observable<CreditChargeOutput> {
    return this.http.post<CreditChargeOutput>(this.API_URL, input);
  }

  /**
   * Updates an existing credit charge.
   * @param id The ID of the credit charge to be updated.
   * @param input The updated credit charge data.
   * @returns An Observable that completes upon successful update.
   */
  public update(id: string, input: CreditChargeInput): Observable<void> {
    return this.http.put<void>(this.API_URL + id, input);
  }

  /**
   * Deletes a credit charge.
   * @param id The ID of the credit charge to be deleted.
   * @returns An Observable that completes upon successful deletion.
   */
  public delete(id: string): Observable<void> {
    return this.http.delete<void>(this.API_URL + id);
  }
}
