import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ensureTrailingSlash } from '../../../core/functions/ensure-trailing-slash';
import { WalletOutput } from '../../types/wallets/wallet-output';
import { PagedOutput } from '../../models/paginations/paged-output';
import { toHttpParams } from '../../../core/functions/to-http-params';
import { WalletGetListInput } from '../../types/wallets/wallet-get-list-input';
import { WalletInput } from '../../types/wallets/wallet-input';

/**
 * Service for interacting with the Wallets API endpoints.
 */
@Injectable({
  providedIn: 'root',
})
export class WalletApiService {
  private readonly API_URL = ensureTrailingSlash(environment.apiUrl) + 'wallets/';
  private readonly http = inject(HttpClient);

  /**
   * Retrieves a paginated and filtered list of wallets.
   * @param input Pagination and filter parameters.
   * @returns An Observable of the paginated result.
   */
  public getList(
    input: WalletGetListInput
  ): Observable<PagedOutput<WalletOutput>> {
    const params = toHttpParams(input);
    return this.http.get<PagedOutput<WalletOutput>>(this.API_URL, { params });
  }

  /**
   * Retrieves a wallet by its ID.
   * @param id The ID of the wallet.
   * @returns An Observable of the wallet data.
   */
  public get(id: string): Observable<WalletOutput> {
    return this.http.get<WalletOutput>(this.API_URL + id);
  }

  /**
   * Creates a new wallet.
   * @param input The data for creating the wallet.
   * @returns An Observable of the created wallet data.
   */
  public create(input: WalletInput): Observable<WalletOutput> {
    return this.http.post<WalletOutput>(this.API_URL, input);
  }

  /**
   * Updates an existing wallet.
   * @param id The ID of the wallet to be updated.
   * @param input The updated wallet data.
   * @returns An Observable that completes upon successful update.
   */
  public update(id: string, input: WalletInput): Observable<void> {
    return this.http.put<void>(this.API_URL + id, input);
  }

  /**
   * Toggles the inactivation state of a wallet.
   * @param id The ID of the wallet to toggle.
   * @returns An Observable that completes upon successful update.
   */
  public toggleInactivated(id: string): Observable<void> {
    return this.http.put<void>(this.API_URL + 'toggle-inactivated/' + id, {});
  }

  /**
   * Deletes a wallet.
   * @param id The ID of the wallet to be deleted.
   * @returns An Observable that completes upon successful deletion.
   */
  public delete(id: string): Observable<void> {
    return this.http.delete<void>(this.API_URL + id);
  }
}