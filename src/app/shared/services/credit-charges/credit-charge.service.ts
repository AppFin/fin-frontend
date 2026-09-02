import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotifyService } from '../../../core/services/notifications/notify.service';
import {
  CreditChargeCreateOrUpdateErrorCode,
  creditChargeCreateOrUpdateErrorCodeMessages,
} from '../../enums/credit-charges/credit-charge-create-or-update-error-code';
import {
  CreditChargeDeleteErrorCode,
  CreditChargeDeleteErrorCodeMessages,
} from '../../enums/credit-charges/credit-charge-delete-error-code';
import { PagedOutput } from '../../models/paginations/paged-output';
import {
  handleFinBackHttpErrorAndDisplayMessage,
  ObservableValidated,
} from '../../rxjs-operators/handle-fin-back-http-error';
import { CreditChargeGetListInput } from '../../types/credit-charges/credit-charge-get-list-input';
import { CreditChargeInput } from '../../types/credit-charges/credit-charge-input';
import { CreditChargeOutput } from '../../types/credit-charges/credit-charge-output';
import { CreditChargeApiService } from './credit-charge-api.service';

@Injectable({
  providedIn: 'root',
})
export class CreditChargeService {
  private apiService = inject(CreditChargeApiService);
  private notifyService = inject(NotifyService);

  /**
   * Retrieves a paginated and filtered list of credit charges.
   * @param input Pagination and filter parameters.
   * @returns An Observable of the paginated result.
   */
  public getList(
    input: CreditChargeGetListInput
  ): Observable<PagedOutput<CreditChargeOutput>> {
    return this.apiService.getList(input);
  }

  /**
   * Retrieves a credit charge by its ID.
   * @param id The ID of the credit charge.
   * @returns An Observable of the credit charge data.
   */
  public get(id: string): Observable<CreditChargeOutput> {
    return this.apiService.get(id);
  }

  /**
   * Creates a new credit charge and in case of error display message.
   * @param input The data for creating the credit charge.
   * @returns An Observable of the created credit charge data.
   */
  public create(
    input: CreditChargeInput
  ): ObservableValidated<
    CreditChargeOutput,
    CreditChargeCreateOrUpdateErrorCode
  > {
    return this.apiService
      .create(input)
      .pipe(
        handleFinBackHttpErrorAndDisplayMessage<CreditChargeCreateOrUpdateErrorCode>(
          creditChargeCreateOrUpdateErrorCodeMessages,
          this.notifyService
        )
      );
  }

  /**
   * Updates an existing credit charge and in case of error display message.
   * @param id The ID of the credit charge to be updated.
   * @param input The updated credit charge data.
   * @returns An Observable that completes upon successful update.
   */
  public update(
    id: string,
    input: CreditChargeInput
  ): ObservableValidated<void, CreditChargeCreateOrUpdateErrorCode> {
    return this.apiService
      .update(id, input)
      .pipe(
        handleFinBackHttpErrorAndDisplayMessage<CreditChargeCreateOrUpdateErrorCode>(
          creditChargeCreateOrUpdateErrorCodeMessages,
          this.notifyService
        )
      );
  }

  /**
   * Deletes a credit charge and in case of error display message.
   * @param id The ID of the credit charge to be deleted.
   * @returns An Observable that completes upon successful deletion.
   */
  public delete(
    id: string
  ): ObservableValidated<void, CreditChargeDeleteErrorCode> {
    return this.apiService
      .delete(id)
      .pipe(
        handleFinBackHttpErrorAndDisplayMessage<CreditChargeDeleteErrorCode>(
          CreditChargeDeleteErrorCodeMessages,
          this.notifyService
        )
      );
  }
}
