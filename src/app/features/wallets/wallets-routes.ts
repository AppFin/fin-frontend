import { Routes } from '@angular/router';

export const WALLETS_ROUTES: Routes = [
  {
    path: 'wallets',
    loadComponent: () =>
      import('./wallets.component').then(
        (m) => m.WalletsComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './wallets-list/wallets-list.component'
          ).then((m) => m.WalletsListComponent),
      },
      {
        path: 'new',
        loadComponent: () =>
          import(
            './wallets-editor/wallets-editor.component'
          ).then((m) => m.WalletsEditorComponent),
      },
      {
        path: ':walletId',
        loadComponent: () =>
          import(
            './wallets-editor/wallets-editor.component'
          ).then((m) => m.WalletsEditorComponent),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
