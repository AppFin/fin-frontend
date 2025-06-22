import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly darkModeSignal = signal(false);
  public readonly darkMode = this.darkModeSignal.asReadonly;

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    this.setDarkMode(isDark);
  }

  public get isDarkMode(): boolean {
    return this.darkModeSignal();
  }

  public toggleTheme(): void {
    this.setDarkMode(!this.darkModeSignal());
  }

  public setDarkMode(isDark: boolean): void {
    this.darkModeSignal.set(isDark);

    const body = document.body;
    const html = document.documentElement;

    const theme = isDark ? 'dark' : 'light';
    const themeRemove = isDark ? 'light' : 'dark';

    body.classList.add(`${theme}-theme`);
    body.classList.remove(`${themeRemove}-theme`);
    html.setAttribute('data-theme', theme);
    html.setAttribute('data-p-theme', theme);
    localStorage.setItem('theme', theme);
  }
}