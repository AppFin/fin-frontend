import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _pageName = signal('finCore.appName');
  public pageName = this._pageName.asReadonly();

  private _sideNavOpened = signal(false);
  public sideNavOpened = this._sideNavOpened.asReadonly();

  private readonly sideavOpenedKey = 'sideNavOpened';

  constructor() {
    this.loadFromStorage();

    effect(() => {
      localStorage.setItem(
        this.sideavOpenedKey,
        this._sideNavOpened() ? '1' : '0'
      );
    });
  }

  public toggleSideNav(): void {
    this._sideNavOpened.set(!this._sideNavOpened());
  }

  public setPageName(pageName: string): void {
    this._pageName.set(pageName);
  }

  private loadFromStorage(): void {
    const opened = localStorage.getItem(this.sideavOpenedKey);
    this._sideNavOpened.set(opened === '1');
  }
}
