import { Routes } from '@angular/router';

export const CREDIT_CARDS_ROUTES: Routes = [
  {
    path: 'credit-cards',
    loadComponent: () =>
      import('./credit-cards.component').then(
        (m) => m.CreditCardsComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './credit-cards-list/credit-cards-list.component'
          ).then((m) => m.CreditCardsListComponent),
      },
      {
        path: 'new',
        loadComponent: () =>
          import(
            './credit-cards-editor/credit-cards-editor.component'
          ).then((m) => m.CreditCardsEditorComponent),
      },
      {
        path: ':creditCardId',
        loadComponent: () =>
          import(
            './credit-cards-editor/credit-cards-editor.component'
          ).then((m) => m.CreditCardsEditorComponent),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
