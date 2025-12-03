import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ensureTrailingSlash } from '../../functions/ensure-trailing-slash';
import { TenantOutput } from '../../models/tenans/tenant-output';

@Injectable({
  providedIn: 'root',
})
export class TenantApiService {
  private readonly API_URL =
    ensureTrailingSlash(environment.apiUrl) + 'tenants/';
  private readonly http = inject(HttpClient);

  public get(id: string): Observable<TenantOutput> {
    return this.http.get<TenantOutput>(this.API_URL + id);
  }
}
