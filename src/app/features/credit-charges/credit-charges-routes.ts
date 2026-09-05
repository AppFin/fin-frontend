import { Routes } from '@angular/router';

export const CREDIT_CHARGES_ROUTES: Routes = [
  {
    path: 'credit-charges',
    loadComponent: () =>
      import('./credit-charges.component').then(
        (m) => m.CreditChargesComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./credit-charges-list/credit-charges-list.component').then(
            (m) => m.CreditChargesListComponent
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import(
            './credit-charges-editor/credit-charges-editor.component'
          ).then((m) => m.CreditChargesEditorComponent),
      },
      {
        path: ':creditChargeId',
        loadComponent: () =>
          import(
            './credit-charges-editor/credit-charges-editor.component'
          ).then((m) => m.CreditChargesEditorComponent),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
