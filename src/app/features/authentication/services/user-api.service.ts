import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ensureTrailingSlash } from '../../../core/functions/ensure-trailing-slash';
import { toHttpParams } from '../../../core/functions/to-http-params';
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { UserDto } from '../../../shared/models/users/user-dto';
import { UserUpdateOrCreateInput } from '../../../shared/models/users/user-update-or-create-input';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly API_URL = ensureTrailingSlash(environment.apiUrl) + 'users/';
  private readonly http = inject(HttpClient);

  public getList(
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<UserDto>> {
    const params = toHttpParams(input);
    return this.http.get<PagedOutput<UserDto>>(this.API_URL, { params });
  }

  public get(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(this.API_URL + id);
  }

  public update(id: string, user: UserUpdateOrCreateInput): Observable<void> {
    return this.http.put<void>(this.API_URL + id, user);
  }
}
