import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ensureTrailingSlash } from '../../../core/functions/ensure-trailing-slash';
import { toHttpParams } from '../../../core/functions/to-http-params';
import { PagedOutput } from '../../models/paginations/paged-output';
import { PersonGetListInput } from '../../types/people/person-get-list-input';
import { PersonInput } from '../../types/people/person-input';
import { PersonOutput } from '../../types/people/person-output';

/**
 * Service for interacting with the People API endpoints.
 */
@Injectable({
  providedIn: 'root',
})
export class PersonApiService {
  private readonly API_URL =
    ensureTrailingSlash(environment.apiUrl) + 'people/';
  private readonly http = inject(HttpClient);

  /**
   * Retrieves a paginated and filtered list of people.
   * @param input Pagination and filter parameters.
   * @returns An Observable of the paginated result.
   */
  public getList(
    input: PersonGetListInput
  ): Observable<PagedOutput<PersonOutput>> {
    const params = toHttpParams(input);
    return this.http.get<PagedOutput<PersonOutput>>(this.API_URL, { params });
  }

  /**
   * Retrieves a person by its ID.
   * @param id The ID of the person.
   * @returns An Observable of the person data.
   */
  public get(id: string): Observable<PersonOutput> {
    return this.http.get<PersonOutput>(this.API_URL + id);
  }

  /**
   * Creates a new person.
   * @param input The data for creating the person.
   * @returns An Observable of the created person data.
   */
  public create(input: PersonInput): Observable<PersonOutput> {
    return this.http.post<PersonOutput>(this.API_URL, input);
  }

  /**
   * Updates an existing person.
   * @param id The ID of the person to be updated.
   * @param input The updated person data.
   * @returns An Observable that completes upon successful update.
   */
  public update(id: string, input: PersonInput): Observable<void> {
    return this.http.put<void>(this.API_URL + id, input);
  }

  /**
   * Toggles the inactivation state of a person.
   * @param id The ID of the person to toggle.
   * @returns An Observable that completes upon successful update.
   */
  public toggleInactivated(id: string): Observable<void> {
    return this.http.put<void>(this.API_URL + 'toggle-inactivated/' + id, {});
  }

  /**
   * Deletes a person.
   * @param id The ID of the person to be deleted.
   * @returns An Observable that completes upon successful deletion.
   */
  public delete(id: string): Observable<void> {
    return this.http.delete<void>(this.API_URL + id);
  }
}
