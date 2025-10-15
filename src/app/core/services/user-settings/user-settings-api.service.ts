import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserSettingsDto, UserTheme } from '../../../shared/models/users/settings/user-settings-dto';
import { UserSettingsUpdateInput } from '../../../shared/models/users/settings/user-settings-update-input';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/user-settings`;

  public getSettings(): Observable<UserSettingsDto> {
    return this.http.get<UserSettingsDto>(this.baseUrl);
  }

  public updateSettings(data: UserSettingsUpdateInput): Observable<UserSettingsDto> {
    return this.http.put<UserSettingsDto>(this.baseUrl, data);
  }

  public updateTheme(theme: UserTheme): Observable<UserSettingsDto> {
    return this.updateSettings({ theme: theme as UserTheme });
  }
}
