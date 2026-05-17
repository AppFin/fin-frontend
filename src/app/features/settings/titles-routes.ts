import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings.component').then((m) => m.SettingsComponent),
  },
];
