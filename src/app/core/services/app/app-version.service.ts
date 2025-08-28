import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppVersionService {
  public getVersion(): string {
    return environment.version;
  }
}
