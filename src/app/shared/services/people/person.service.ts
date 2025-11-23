import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { NotifyService } from '../../../core/services/notifications/notify.service';
import {
  PersonCreateOrUpdateErrorCode,
  personCreateOrUpdateErrorCodeMessages,
} from '../../enums/people/person-create-or-update-error-code';
import {
  PersonDeleteErrorCode,
  PersonDeleteErrorCodeMessages,
} from '../../enums/people/person-delete-error-code';
import { PagedOutput } from '../../models/paginations/paged-output';
import {
  handleFinBackHttpErrorAndDisplayMessage,
  ObservableValidated,
} from '../../rxjs-operators/handle-fin-back-http-error';
import { PersonGetListInput } from '../../types/people/person-get-list-input';
import { PersonInput } from '../../types/people/person-input';
import { PersonOutput } from '../../types/people/person-output';
import { CachedEntityService } from '../abstractions/cached-entities/cached-entity.service';
import { PersonApiService } from './person-api.service';

@Injectable({
  providedIn: 'root',
})
export class PeopleService extends CachedEntityService<
  PersonOutput,
  PersonGetListInput
> {
  private apiService = inject(PersonApiService);
  private notifyService = inject(NotifyService);

  /**
   * Retrieves a paginated and filtered list of people.
   * @param input Pagination and filter parameters.
   * @returns An Observable of the paginated result.
   */
  public getList(
    input: PersonGetListInput
  ): Observable<PagedOutput<PersonOutput>> {
    return this.apiService.getList(input);
  }

  /**
   * Retrieves a person by its ID.
   * @param id The ID of the person.
   * @returns An Observable of the person data.
   */
  public get(id: string): Observable<PersonOutput> {
    return this.apiService.get(id);
  }

  /**
   * Creates a new person and in case of error display message.
   * @param input The data for creating the person.
   * @returns An Observable of the created person data.
   */
  public create(
    input: PersonInput
  ): ObservableValidated<PersonOutput, PersonCreateOrUpdateErrorCode> {
    return this.apiService.create(input).pipe(
      handleFinBackHttpErrorAndDisplayMessage<PersonCreateOrUpdateErrorCode>(
        personCreateOrUpdateErrorCodeMessages,
        this.notifyService
      ),
      tap((result) => {
        if (!!result[1]) this.updateOrCreateOnCache(result[1]);
      })
    );
  }

  /**
   * Updates an existing person and in case of error display message.
   * @param id The ID of the person to be updated.
   * @param input The updated person data.
   * @returns An Observable that completes upon successful update.
   */
  public update(
    id: string,
    input: PersonInput
  ): ObservableValidated<void, PersonCreateOrUpdateErrorCode> {
    return this.apiService.update(id, input).pipe(
      handleFinBackHttpErrorAndDisplayMessage<PersonCreateOrUpdateErrorCode>(
        personCreateOrUpdateErrorCodeMessages,
        this.notifyService
      ),
      tap(async () => await this.updateItemOnCache(id))
    );
  }

  /**
   * Toggles the inactivation state of a person and in case of error display message.
   * @param id The ID of the person to toggle.
   * @returns An Observable that completes upon successful update.
   */
  public toggleInactivated(id: string): Observable<void> {
    return this.apiService
      .toggleInactivated(id)
      .pipe(tap(async () => await this.updateItemOnCache(id)));
  }

  /**
   * Deletes a person and in case of error display message.
   * @param id The ID of the person to be deleted.
   * @returns An Observable that completes upon successful deletion.
   */
  public delete(id: string): ObservableValidated<void, PersonDeleteErrorCode> {
    return this.apiService
      .delete(id)
      .pipe(
        handleFinBackHttpErrorAndDisplayMessage<PersonDeleteErrorCode>(
          PersonDeleteErrorCodeMessages,
          this.notifyService
        )
      );
  }

  private async updateItemOnCache(id: string): Promise<void> {
    const financialInstitution = await firstValueFrom(this.get(id));
    this.updateOrCreateOnCache(financialInstitution);
  }

  protected override applyStructuralFilter(
    entity: PersonOutput,
    filter: PersonGetListInput
  ): boolean {
    const filterByInactivated =
      filter.inactivated !== undefined && entity.inactivated !== null;
    return !filterByInactivated || entity.inactivated === filter.inactivated;
  }
}
