import { effect, inject, Injectable, signal } from '@angular/core';
import {
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
} from '../../../../styles/variables';
import { StorageService } from '../app/storage.service';
import { UserSettingsApiService } from '../user-settings/user-settings-api.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageService = inject(StorageService);
  private readonly userSettingsApiService = inject(UserSettingsApiService);

  private readonly MANUALLY_SET_THEME_KEY = 'manually-set-theme';
  private readonly THEME_KEY = 'theme';

  private readonly darkModeSignal = signal(this.getInitialTheme());
  public readonly darkMode = this.darkModeSignal.asReadonly();


  constructor() {
    effect(() => {
      this.applyTheme(this.darkModeSignal());
    });

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!this.storageService.loadFromLocalStorage<boolean>(this.MANUALLY_SET_THEME_KEY)) {
          this.setDarkMode(e.matches);
        }
      });
  }

  public toggleTheme(): void {
    this.storageService.saveToLocalStorage(this.MANUALLY_SET_THEME_KEY, '1');
    const newTheme = !this.darkModeSignal();
    this.setDarkMode(newTheme);  }

  public get isDarkMode(): boolean {
    return this.darkModeSignal();
  }

  public setDarkMode(isDark: boolean): void {
    this.darkModeSignal.set(isDark);
  }

  public loadUserTheme(theme: string): void {
    const isDark = theme === 'dark';
    this.setDarkMode(isDark);
  }

  private getInitialTheme(): boolean {
    const savedTheme = this.storageService.loadFromLocalStorage<string>(this.THEME_KEY);
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private applyTheme(isDark: boolean): void {
    const theme = isDark ? 'dark' : 'light';
    const themeRemove = isDark ? 'light' : 'dark';

    document.documentElement.classList.add(`${theme}-theme`);
    document.documentElement.classList.remove(`${themeRemove}-theme`);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);

    document.body.classList.add(`${theme}-theme`);
    document.body.classList.remove(`${themeRemove}-theme`);

    this.storageService.saveToLocalStorage(this.THEME_KEY, theme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        isDark ? BACKGROUND_DARK : BACKGROUND_LIGHT
      );
    }
  }
}
