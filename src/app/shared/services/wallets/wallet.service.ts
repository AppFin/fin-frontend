import { inject, Injectable } from '@angular/core';
import { WalletApiService } from './wallet-api.service';
import { WalletGetListInput } from '../../types/wallets/wallet-get-list-input';
import { Observable } from 'rxjs';
import { PagedOutput } from '../../models/paginations/paged-output';
import { WalletOutput } from '../../types/wallets/wallet-output';
import { WalletInput } from '../../types/wallets/wallet-input';
import { NotifyService } from '../../../core/services/notifications/notify.service';
import {
  handleUnprocessableEntityError,
  ObservableValidated,
} from '../../rxjs-operators/handle-unprocessable-entity-error';
import { WalletCreateOrUpdateErrorCode } from '../../enums/wallets/walletcreate-or-update-error-code';

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
   * Creates a new wallet.
   * @param input The data for creating the wallet.
   * @returns An Observable of the created wallet data.
   */
  public create(input: WalletInput): ObservableValidated<WalletOutput> {
    return this.apiService.create(input).pipe(
      handleUnprocessableEntityError<WalletCreateOrUpdateErrorCode>((err) => {
        switch (err.errorCode) {
          case WalletCreateOrUpdateErrorCode.NameAlreadyInUse:
            break;
        }
      })
    );
  }
}
