import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedOutput } from '../../models/paginations/paged-output';
import { NotifyService } from '../../../core/services/notifications/notify.service';
import {
  handleFinBackHttpErrorAndDisplayMessage,
  ObservableValidated,
} from '../../rxjs-operators/handle-fin-back-http-error';
import { TitleApiService } from './title-api.service';
import { TitleGetListInput } from '../../types/titles/title-get-list-input';
import { TitleOutput } from '../../types/titles/title-output';
import { TitleInput } from '../../types/titles/title-input';
import {
  TitleCreateOrUpdateErrorCode,
  titleCreateOrUpdateErrorCodeMessages,
} from '../../enums/titles/title-create-or-update-error-code';
import {
  TitleDeleteErrorCode,
  TitleDeleteErrorCodeMessages,
} from '../../enums/titles/title-delete-error-code';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private apiService = inject(TitleApiService);
  private notifyService = inject(NotifyService);

  /**
   * Retrieves a paginated and filtered list of titles.
   * @param input Pagination and filter parameters.
   * @returns An Observable of the paginated result.
   */
  public getList(
    input: TitleGetListInput
  ): Observable<PagedOutput<TitleOutput>> {
    return this.apiService.getList(input);
  }

  /**
   * Retrieves a title by its ID.
   * @param id The ID of the title.
   * @returns An Observable of the title data.
   */
  public get(id: string): Observable<TitleOutput> {
    return this.apiService.get(id);
  }

  /**
   * Creates a new title and in case of error display message.
   * @param input The data for creating the title.
   * @returns An Observable of the created title data.
   */
  public create(
    input: TitleInput
  ): ObservableValidated<TitleOutput, TitleCreateOrUpdateErrorCode> {
    return this.apiService
      .create(input)
      .pipe(
        handleFinBackHttpErrorAndDisplayMessage<TitleCreateOrUpdateErrorCode>(
          titleCreateOrUpdateErrorCodeMessages,
          this.notifyService
        )
      );
  }

  /**
   * Updates an existing title and in case of error display message.
   * @param id The ID of the title to be updated.
   * @param input The updated title data.
   * @returns An Observable that completes upon successful update.
   */
  public update(
    id: string,
    input: TitleInput
  ): ObservableValidated<void, TitleCreateOrUpdateErrorCode> {
    return this.apiService
      .update(id, input)
      .pipe(
        handleFinBackHttpErrorAndDisplayMessage<TitleCreateOrUpdateErrorCode>(
          titleCreateOrUpdateErrorCodeMessages,
          this.notifyService
        )
      );
  }

  /**
   * Deletes a title and in case of error display message.
   * @param id The ID of the title to be deleted.
   * @returns An Observable that completes upon successful deletion.
   */
  public delete(
    id: string
  ): ObservableValidated<void, TitleDeleteErrorCode> {
    return this.apiService
      .delete(id)
      .pipe(
        handleFinBackHttpErrorAndDisplayMessage<TitleDeleteErrorCode>(
          TitleDeleteErrorCodeMessages,
          this.notifyService
        )
      );
  }
}
