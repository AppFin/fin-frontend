import { inject, Injectable } from '@angular/core';
import { ensureTrailingSlash } from '../../functions/ensure-trailing-slash';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { Observable } from 'rxjs';
import { toHttpParams } from '../../functions/to-http-params';
import { NotifyUserDto } from '../../types/notifications/notify-user-dto';
import { NotificationOutput } from '../../types/notifications/notification-output';
import { NotificationInput } from '../../types/notifications/notification-input';

@Injectable({
  providedIn: 'root',
})
export class NotificationApiService {
  private readonly API_URL =
    ensureTrailingSlash(environment.apiUrl) + 'notifications/';
  private readonly http = inject(HttpClient);

  public getList(
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<NotificationOutput>> {
    let params = toHttpParams(input);
    return this.http.get<PagedOutput<NotificationOutput>>(this.API_URL, {
      params,
    });
  }

  public get(id: string): Observable<NotificationOutput> {
    return this.http.get<NotificationOutput>(this.API_URL + id);
  }

  public create(input: NotificationInput): Observable<NotificationOutput> {
    return this.http.post<NotificationOutput>(this.API_URL, input);
  }

  public update(id: string, input: NotificationInput): Observable<void> {
    return this.http.put<void>(this.API_URL + id, input);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(this.API_URL + id);
  }

  public markVisualized(notificationId: string): Observable<void> {
    return this.http.put<void>(
      this.API_URL + 'mark-visualized/' + notificationId,
      null
    );
  }

  public getUnvisualizedNotifications(): Observable<NotifyUserDto[]> {
    return this.http.put<NotifyUserDto[]>(
      this.API_URL + 'get-unvisualized-notifications',
      null
    );
  }
}
