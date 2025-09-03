import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _pageName = signal('finCore.appName');
  public pageName = this._pageName.asReadonly();

  private _toggleSideNav = new Subject<void>();
  public toggleSideNavSub = this._toggleSideNav.asObservable();

  public setPageName(pageName: string): void {
    this._pageName.set(pageName);
  }

  public toggleSideNav(): void {
    this._toggleSideNav.next();
  }
}
