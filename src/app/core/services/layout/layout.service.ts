import { effect, inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../app/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _pageName = signal('finCore.appName');
  public pageName = this._pageName.asReadonly();

  private _sideNavOpened = signal(false);
  public sideNavOpened = this._sideNavOpened.asReadonly();

  private readonly storageService = inject(StorageService);
  private readonly sidenavOpenedKey = 'sidenav_opened';

  constructor() {
    this.loadFromStorage();

    effect(() => {
      this.storageService.saveToLocalStorage(
        this.sidenavOpenedKey,
        this._sideNavOpened()
      );
    });
  }

  public toggleSideNav(): void {
    this._sideNavOpened.set(!this._sideNavOpened());
  }

  public setPageName(pageName: string): void {
    this._pageName.set(pageName);
  }

  public get isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  private loadFromStorage(): void {
    const opened = this.storageService.loadFromLocalStorage<boolean>(this.sidenavOpenedKey);
    this._sideNavOpened.set(!!opened);
  }
}
