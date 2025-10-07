import { effect, inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../app/storage.service';
import { Title } from '@angular/platform-browser';
import { FinTranslateService } from '../translate/fin-translate.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _pageName = signal('finCore.appName');
  public pageName = this._pageName.asReadonly();

  private _sideNavOpened = signal(false);
  public sideNavOpened = this._sideNavOpened.asReadonly();

  private _sideNotificationsOpened = signal(false);
  public sideNotificationsOpened = this._sideNotificationsOpened.asReadonly();

  private readonly storageService = inject(StorageService);
  private readonly sidenavOpenedKey = 'sidenav_opened';

  private readonly title = inject(Title);
  private readonly translateService = inject(FinTranslateService);

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

  public toggleSideNotifications(): void {
    this._sideNotificationsOpened.set(!this._sideNotificationsOpened());
  }


  public setPageName(pageName: string): void {
    this._pageName.set(pageName);

    const translatedName = this.translateService.translate(pageName);
    const appName = this.translateService.translate('finCore.appName');
    this.title.setTitle(`${appName} - ${translatedName}`);
  }

  public get isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  private loadFromStorage(): void {
    const opened = this.storageService.loadFromLocalStorage<boolean>(this.sidenavOpenedKey);
    this._sideNavOpened.set(!!opened);
  }
}
