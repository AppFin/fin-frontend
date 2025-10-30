import { effect, inject, Injectable, signal, TemplateRef } from '@angular/core';
import { StorageService } from '../app/storage.service';
import { Title } from '@angular/platform-browser';
import { FinTranslateService } from '../translate/fin-translate.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SideModalConfig } from '../../components/layout/side-modal/fin-side-modal.component';

type SideModalOpenedProps = {
  opened: boolean,
  template?: TemplateRef<any>,
  config?: SideModalConfig
}

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

  private _sideModalOpened = new BehaviorSubject<SideModalOpenedProps>({ opened: false });
  public sideModalOpened = this._sideModalOpened.asObservable();

  private readonly storageService = inject(StorageService);
  private readonly sidenavOpenedKey = 'sidenav_opened';

  private readonly title = inject(Title);
  private readonly translateService = inject(FinTranslateService);

  private sideModalResult: Subject<any> | null;

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

  public openSideModal<TResult = null>(template: TemplateRef<any>, config: SideModalConfig | undefined = undefined): Observable<TResult> {
    if (this.sideModalResult) this.sideModalResult.next(null);
    this.sideModalResult = new Subject<TResult>();
    this._sideModalOpened.next({ opened: true, template, config });
    return this.sideModalResult.asObservable();
  }

  public closeSideModal<TResult = null>(result: TResult | null = null) {
    this._sideModalOpened.next({ opened: false })
    this.sideModalResult?.next(result);
    this.sideModalResult = null;
  }

  private loadFromStorage(): void {
    const opened = this.storageService.loadFromLocalStorage<boolean>(this.sidenavOpenedKey);
    this._sideNavOpened.set(!!opened);
  }
}
