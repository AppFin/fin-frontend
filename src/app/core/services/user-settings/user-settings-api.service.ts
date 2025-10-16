import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserSettingsInput } from '../../../shared/models/users/settings/user-settings-input';
import { UserSettingsOutput } from '../../../shared/models/users/settings/user-settings-output';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/user-settings`;

  public getSettings(): Observable<UserSettingsOutput> {
    return this.http.get<UserSettingsOutput>(this.baseUrl);
  }

  public updateSettings(data: UserSettingsInput): Observable<void> {
    return this.http.put<void>(this.baseUrl, data);
  }
}
