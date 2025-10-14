import { Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/authentication/admin.guard';

export const CARD_BRAND_ROUTES: Routes = [
  {
    path: 'card-brand',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./card-brand.component').then((m) => m.CardBrandComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./card-brand-list/card-brand-list.component').then(
            (m) => m.CardBrandListComponent
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./card-brand-editor/card-brand-editor.component').then(
            (m) => m.CardBrandEditorComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./card-brand-editor/card-brand-editor.component').then(
            (m) => m.CardBrandEditorComponent
          ),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
