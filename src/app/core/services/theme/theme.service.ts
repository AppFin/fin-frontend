import { effect, Injectable, signal } from '@angular/core';
import {
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
} from '../../../../styles/variables';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly darkModeSignal = signal(this.getInitialTheme());
  public readonly darkMode = this.darkModeSignal.asReadonly();

  constructor() {
    effect(() => {
      this.applyTheme(this.darkModeSignal());
    });

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem('manually-set-theme')) {
          this.setDarkMode(e.matches);
        }
      });
  }

  public toggleTheme(): void {
    localStorage.setItem('manually-set-theme', '1');
    this.setDarkMode(!this.darkModeSignal());
  }

  public get isDarkMode(): boolean {
    return this.darkModeSignal();
  }

  public setDarkMode(isDark: boolean): void {
    this.darkModeSignal.set(isDark);
  }

  private getInitialTheme(): boolean {
    const savedTheme = localStorage.getItem('theme');
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

    localStorage.setItem('theme', theme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        isDark ? BACKGROUND_DARK : BACKGROUND_LIGHT
      );
    }
  }
}
