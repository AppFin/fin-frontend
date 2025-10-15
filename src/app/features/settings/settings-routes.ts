import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [
  {
    path: 'settings',
    loadComponent: () =>
      import('./fin-settings.component').then(
        (m) => m.FinSettingsComponent
      ),
  },
];
