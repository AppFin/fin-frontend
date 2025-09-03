import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _pageName = signal('finCore.appName');
  public pageName = this._pageName.asReadonly();

  private _sideNavOpened = signal(false);
  public sideNavOpened = this._sideNavOpened.asReadonly();

  public toggleSideNav(): void {
    this._sideNavOpened.set(!this._sideNavOpened());
  }

  public setPageName(pageName: string): void {
    this._pageName.set(pageName);
  }
}
