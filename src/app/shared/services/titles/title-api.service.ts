import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ensureTrailingSlash } from '../../../core/functions/ensure-trailing-slash';
import { PagedOutput } from '../../models/paginations/paged-output';
import { toHttpParams } from '../../../core/functions/to-http-params';
import { TitleGetListInput } from '../../types/titles/title-get-list-input';
import { TitleOutput } from '../../types/titles/title-output';
import { TitleInput } from '../../types/titles/title-input';

/**
 * Service for interacting with the Titles API endpoints.
 */
@Injectable({
  providedIn: 'root',
})
export class TitleApiService {
  private readonly API_URL = ensureTrailingSlash(environment.apiUrl) + 'titles/';
  private readonly http = inject(HttpClient);

  /**
   * Retrieves a paginated and filtered list of titles.
   * @param input Pagination and filter parameters.
   * @returns An Observable of the paginated result.
   */
  public getList(
    input: TitleGetListInput
  ): Observable<PagedOutput<TitleOutput>> {
    const params = toHttpParams(input);
    return this.http.get<PagedOutput<TitleOutput>>(this.API_URL, { params })
      .pipe(
        map(result => {
          result.items = result.items.map(title => {
            title.date = new Date(title.date);
            return title;
          });
          return result;
        })
      );
  }

  /**
   * Retrieves a title by its ID.
   * @param id The ID of the title.
   * @returns An Observable of the title data.
   */
  public get(id: string): Observable<TitleOutput> {
    return this.http.get<TitleOutput>(this.API_URL + id).pipe(
      map(title => {
        title.date = new Date(title.date);
        return title;
      })
    );
  }

  /**
   * Creates a new title.
   * @param input The data for creating the title.
   * @returns An Observable of the created title data.
   */
  public create(input: TitleInput): Observable<TitleOutput> {
    return this.http.post<TitleOutput>(this.API_URL, input);
  }

  /**
   * Updates an existing title.
   * @param id The ID of the title to be updated.
   * @param input The updated title data.
   * @returns An Observable that completes upon successful update.
   */
  public update(id: string, input: TitleInput): Observable<void> {
    return this.http.put<void>(this.API_URL + id, input);
  }

  /**
   * Deletes a title.
   * @param id The ID of the title to be deleted.
   * @returns An Observable that completes upon successful deletion.
   */
  public delete(id: string): Observable<void> {
    return this.http.delete<void>(this.API_URL + id);
  }
}
