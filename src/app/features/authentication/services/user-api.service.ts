import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { Observable } from 'rxjs';
import { ensureTrailingSlash } from '../../../core/functions/ensure-trailing-slash';
import { UserDto } from '../../../shared/models/users/user-dto';
import { toHttpParams } from '../../../core/functions/to-http-params';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly API_URL = ensureTrailingSlash(environment.apiUrl) + 'users/';
  private readonly http = inject(HttpClient);

  public getList(
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<UserDto>> {
    let params = toHttpParams(input);
    return this.http.get<PagedOutput<UserDto>>(this.API_URL, { params });
  }

  public get(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(this.API_URL + id);
  }

  public updateTheme(userId: string, theme: string): Observable<UserDto> {
    return this.http.patch<UserDto>(
      this.API_URL + userId + '/theme',
      JSON.stringify(theme),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}
