import { inject, Injectable } from '@angular/core';
import { WalletApiService } from './wallet-api.service';
import { WalletGetListInput } from '../../types/wallets/wallet-get-list-input';
import { Observable } from 'rxjs';
import { PagedOutput } from '../../models/paginations/paged-output';
import { WalletOutput } from '../../types/wallets/wallet-output';
import { WalletInput } from '../../types/wallets/wallet-input';
import { NotifyService } from '../../../core/services/notifications/notify.service';
import {
  handleFinBackHttpErrorAndDisplayMessage,
  ObservableValidated,
} from '../../rxjs-operators/handle-fin-back-http-error';
import {
  WalletCreateOrUpdateErrorCode,
  walletCreateOrUpdateErrorCodeMessages,
} from '../../enums/wallets/wallet-create-or-update-error-code';
import {
  WalletToggleInactiveErrorCode,
  WalletToggleInactiveErrorCodeMessages,
} from '../../enums/wallets/wallet-toggle-inactive-error-code';
import {
  WalletDeleteErrorCode,
  WalletDeleteErrorCodeMessages,
} from '../../enums/wallets/wallet-delete-error-code';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private apiService = inject(WalletApiService);
  private notifyService = inject(NotifyService);

  /**
   * Retrieves a paginated and filtered list of wallets.
   * @param input Pagination and filter parameters.
   * @returns An Observable of the paginated result.
   */
  public getList(
    input: WalletGetListInput
  ): Observable<PagedOutput<WalletOutput>> {
    return this.apiService.getList(input);
  }

  /**
   * Retrieves a wallet by its ID.
   * @param id The ID of the wallet.
   * @returns An Observable of the wallet data.
   */
  public get(id: string): Observable<WalletOutput> {
    return this.apiService.get(id);
  }

  /**
   * Creates a new wallet and in case of error display message.
   * @param input The data for creating the wallet.
   * @returns An Observable of the created wallet data.
   */
  public create(input: WalletInput): ObservableValidated<WalletOutput,WalletCreateOrUpdateErrorCode> {
    return this.apiService
      .create(input)
      .pipe(
        handleFinBackHttpErrorAndDisplayMessage<WalletCreateOrUpdateErrorCode>(
          walletCreateOrUpdateErrorCodeMessages,
          this.notifyService
        )
      );
  }

  /**
   * Updates an existing wallet and in case of error display message.
   * @param id The ID of the wallet to be updated.
   * @param input The updated wallet data.
   * @returns An Observable that completes upon successful update.
   */
  public update(id: string, input: WalletInput): ObservableValidated<void,WalletCreateOrUpdateErrorCode> {
    return this.apiService
      .update(id, input)
      .pipe(
        handleFinBackHttpErrorAndDisplayMessage<WalletCreateOrUpdateErrorCode>(
          walletCreateOrUpdateErrorCodeMessages,
          this.notifyService
        )
      );
  }

  /**
   * Toggles the inactivation state of a wallet and in case of error display message.
   * @param id The ID of the wallet to toggle.
   * @returns An Observable that completes upon successful update.
   */
  public toggleInactivated(id: string): ObservableValidated<void,WalletToggleInactiveErrorCode> {
    return this.apiService
      .toggleInactivated(id)
      .pipe(
        handleFinBackHttpErrorAndDisplayMessage<WalletToggleInactiveErrorCode>(
          WalletToggleInactiveErrorCodeMessages,
          this.notifyService
        )
      );
  }

  /**
   * Deletes a wallet and in case of error display message.
   * @param id The ID of the wallet to be deleted.
   * @returns An Observable that completes upon successful deletion.
   */
  public delete(id: string): ObservableValidated<void,WalletDeleteErrorCode> {
    return this.apiService
      .delete(id)
      .pipe(
        handleFinBackHttpErrorAndDisplayMessage<WalletDeleteErrorCode>(
          WalletDeleteErrorCodeMessages,
          this.notifyService
        )
      );
  }
}