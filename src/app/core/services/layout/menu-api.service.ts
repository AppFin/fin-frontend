import { inject, Injectable } from '@angular/core';
import { ensureTrailingSlash } from '../../functions/ensure-trailing-slash';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { Observable } from 'rxjs';
import { MenuOutput } from '../../types/layouts/menu-output';
import { toHttpParams } from '../../functions/to-http-params';
import { MenuInput } from '../../types/layouts/menu-input';

@Injectable({
  providedIn: 'root',
})
export class MenuApiService {
  private readonly API_URL = ensureTrailingSlash(environment.apiUrl) + 'menus/';
  private readonly http = inject(HttpClient);

  public getList(
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<MenuOutput>> {
    let params = toHttpParams(input);
    return this.http.get<PagedOutput<MenuOutput>>(this.API_URL, { params });
  }

  public getListForSideNav(): Observable<MenuOutput[]> {
    return this.http.get<MenuOutput[]>(this.API_URL + 'side-nav');
  }

  public get(id: string): Observable<MenuOutput> {
    return this.http.get<MenuOutput>(this.API_URL + id);
  }

  public create(input: MenuInput): Observable<MenuOutput> {
    return this.http.post<MenuOutput>(this.API_URL, input);
  }

  public update(id: string, input: MenuInput): Observable<void> {
    return this.http.put<void>(this.API_URL + id, input);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(this.API_URL + id);
  }
}
