import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedOutput } from '../../models/paginations/paged-output';
import { NotifyService } from '../../../core/services/notifications/notify.service';
import {
  handleFinBackHttpErrorAndDisplayMessage,
  ObservableValidated,
} from '../../rxjs-operators/handle-fin-back-http-error';
import { CreditCardApiService } from './credit-card-api.service';
import { CreditCardGetListInput } from '../../types/credit-cards/credit-card-get-list-input';
import { CreditCardOutput } from '../../types/credit-cards/credit-card-output';
import { CreditCardInput } from '../../types/credit-cards/credit-card-input';
import {
  CreditCardCreateOrUpdateErrorCode,
  creditCardCreateOrUpdateErrorCodeMessages,
} from '../../enums/credit-cards/credit-card-create-or-update-error-code';
import {
  CreditCardToggleInactiveErrorCode,
  CreditCardToggleInactiveErrorCodeMessages,
} from '../../enums/credit-cards/credit-card-toggle-inactive-error-code';
import { CreditCardDeleteErrorCode } from '../../enums/credit-cards/credit-card-delete-error-code';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  private apiService = inject(CreditCardApiService);
  private notifyService = inject(NotifyService);

  /**
   * Retrieves a paginated and filtered list of creditCards.
   * @param input Pagination and filter parameters.
   * @returns An Observable of the paginated result.
   */
  public getList(
    input: CreditCardGetListInput
  ): Observable<PagedOutput<CreditCardOutput>> {
    return this.apiService.getList(input);
  }

  /**
   * Retrieves a creditCard by its ID.
   * @param id The ID of the creditCard.
   * @returns An Observable of the creditCard data.
   */
  public get(id: string): Observable<CreditCardOutput> {
    return this.apiService.get(id);
  }

  /**
   * Creates a new creditCard and in case of error display message.
   * @param input The data for creating the creditCard.
   * @returns An Observable of the created creditCard data.
   */
  public create(
    input: CreditCardInput
  ): ObservableValidated<CreditCardOutput, CreditCardCreateOrUpdateErrorCode> {
    return this.apiService
      .create(input)
      .pipe(
        handleFinBackHttpErrorAndDisplayMessage<CreditCardCreateOrUpdateErrorCode>(
          creditCardCreateOrUpdateErrorCodeMessages,
          this.notifyService
        )
      );
  }

  /**
   * Updates an existing creditCard and in case of error display message.
   * @param id The ID of the creditCard to be updated.
   * @param input The updated creditCard data.
   * @returns An Observable that completes upon successful update.
   */
  public update(
    id: string,
    input: CreditCardInput
  ): ObservableValidated<void, CreditCardCreateOrUpdateErrorCode> {
    return this.apiService
      .update(id, input)
      .pipe(
        handleFinBackHttpErrorAndDisplayMessage<CreditCardCreateOrUpdateErrorCode>(
          creditCardCreateOrUpdateErrorCodeMessages,
          this.notifyService
        )
      );
  }

  /**
   * Toggles the inactivation state of a creditCard and in case of error display message.
   * @param id The ID of the creditCard to toggle.
   * @returns An Observable that completes upon successful update.
   */
  public toggleInactivated(
    id: string
  ): ObservableValidated<void, CreditCardToggleInactiveErrorCode> {
    return this.apiService
      .toggleInactivated(id)
      .pipe(
        handleFinBackHttpErrorAndDisplayMessage<CreditCardToggleInactiveErrorCode>(
          CreditCardToggleInactiveErrorCodeMessages,
          this.notifyService
        )
      );
  }

  /**
   * Deletes a creditCard and in case of error display message.
   * @param id The ID of the creditCard to be deleted.
   * @returns An Observable that completes upon successful deletion.
   */
  public delete(
    id: string
  ): ObservableValidated<void, CreditCardDeleteErrorCode> {
    return this.apiService
      .delete(id)
      .pipe(
        handleFinBackHttpErrorAndDisplayMessage<CreditCardDeleteErrorCode>(
          CreditCardDewleteErrorCodeMessages,
          this.notifyService
        )
      );
  }
}
