import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ensureTrailingSlash } from '../../../core/functions/ensure-trailing-slash';
import { TitleCategoryGetListInput } from '../../types/title-categories/title-category-get-list-input';
import { TitleCategoryOutput } from '../../types/title-categories/title-category-output';
import { PagedOutput } from '../../models/paginations/paged-output';
import { toHttpParams } from '../../../core/functions/to-http-params';
import { TitleCategoryInput } from '../../types/title-categories/title-category-input';

/**
 * Service for interacting with the Title Categories API endpoints.
 */
@Injectable({
  providedIn: 'root',
})
export class TitleCategoryApiService {
  private readonly API_URL = ensureTrailingSlash(environment.apiUrl) + 'title-categories/';
  private readonly http = inject(HttpClient);

  /**
   * Retrieves a paginated and filtered list of title categories.
   * @param input Pagination and filter parameters.
   * @returns An Observable of the paginated result.
   */
  public getList(
    input: TitleCategoryGetListInput
  ): Observable<PagedOutput<TitleCategoryOutput>> {
    const params = toHttpParams(input);
    return this.http.get<PagedOutput<TitleCategoryOutput>>(this.API_URL, { params });
  }

  /**
   * Retrieves a title category by its ID.
   * @param id The ID of the title category.
   * @returns An Observable of the title category data.
   */
  public get(id: string): Observable<TitleCategoryOutput> {
    return this.http.get<TitleCategoryOutput>(this.API_URL + id);
  }

  /**
   * Creates a new title category.
   * @param input The data for creating the category.
   * @returns An Observable of the created category data.
   */
  public create(input: TitleCategoryInput): Observable<TitleCategoryOutput> {
    return this.http.post<TitleCategoryOutput>(this.API_URL, input);
  }

  /**
   * Updates an existing title category.
   * @param id The ID of the category to be updated.
   * @param input The updated category data.
   * @returns An Observable that completes upon successful update.
   */
  public update(id: string, input: TitleCategoryInput): Observable<void> {
    return this.http.put<void>(this.API_URL + id, input);
  }

  /**
   * Toggles the inactivation state of a title category.
   * @param id The ID of the category to toggle.
   * @returns An Observable that completes upon successful update.
   */
  public toggleInactivated(id: string): Observable<void> {
    return this.http.put<void>(this.API_URL + 'toggle-inactivated/' + id, {});
  }

  /**
   * Deletes a title category.
   * @param id The ID of the category to be deleted.
   * @returns An Observable that completes upon successful deletion.
   */
  public delete(id: string): Observable<void> {
    return this.http.delete<void>(this.API_URL + id);
  }
}