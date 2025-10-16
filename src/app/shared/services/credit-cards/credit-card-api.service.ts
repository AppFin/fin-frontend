import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ensureTrailingSlash } from '../../../core/functions/ensure-trailing-slash';
import { PagedOutput } from '../../models/paginations/paged-output';
import { toHttpParams } from '../../../core/functions/to-http-params';
import { CreditCardGetListInput } from '../../types/credit-cards/credit-card-get-list-input';
import { CreditCardOutput } from '../../types/credit-cards/credit-card-output';
import { CreditCardInput } from '../../types/credit-cards/credit-card-input';

/**
 * Service for interacting with the CreditCards API endpoints.
 */
@Injectable({
  providedIn: 'root',
})
export class CreditCardApiService {
  private readonly API_URL = ensureTrailingSlash(environment.apiUrl) + 'credit-cards/';
  private readonly http = inject(HttpClient);

  /**
   * Retrieves a paginated and filtered list of creditCards.
   * @param input Pagination and filter parameters.
   * @returns An Observable of the paginated result.
   */
  public getList(
    input: CreditCardGetListInput
  ): Observable<PagedOutput<CreditCardOutput>> {
    const params = toHttpParams(input);
    return this.http.get<PagedOutput<CreditCardOutput>>(this.API_URL, { params });
  }

  /**
   * Retrieves a creditCard by its ID.
   * @param id The ID of the creditCard.
   * @returns An Observable of the creditCard data.
   */
  public get(id: string): Observable<CreditCardOutput> {
    return this.http.get<CreditCardOutput>(this.API_URL + id);
  }

  /**
   * Creates a new creditCard.
   * @param input The data for creating the creditCard.
   * @returns An Observable of the created creditCard data.
   */
  public create(input: CreditCardInput): Observable<CreditCardOutput> {
    return this.http.post<CreditCardOutput>(this.API_URL, input);
  }

  /**
   * Updates an existing creditCard.
   * @param id The ID of the creditCard to be updated.
   * @param input The updated creditCard data.
   * @returns An Observable that completes upon successful update.
   */
  public update(id: string, input: CreditCardInput): Observable<void> {
    return this.http.put<void>(this.API_URL + id, input);
  }

  /**
   * Toggles the inactivation state of a creditCard.
   * @param id The ID of the creditCard to toggle.
   * @returns An Observable that completes upon successful update.
   */
  public toggleInactivated(id: string): Observable<void> {
    return this.http.put<void>(this.API_URL + 'toggle-inactivated/' + id, {});
  }

  /**
   * Deletes a creditCard.
   * @param id The ID of the creditCard to be deleted.
   * @returns An Observable that completes upon successful deletion.
   */
  public delete(id: string): Observable<void> {
    return this.http.delete<void>(this.API_URL + id);
  }
}
