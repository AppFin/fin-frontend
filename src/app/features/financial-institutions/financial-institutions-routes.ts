import { Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/authentication/admin.guard';

export const FINANCIAL_INSTITUTIONS_ROUTES: Routes = [
  {
    path: 'financial-institutions',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./financial-institutions.component').then(
        (m) => m.FinancialInstitutionsComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './financial-institutions-list/financial-institutions-list.component'
          ).then((m) => m.FinancialInstitutionsListComponent),
      },
      {
        path: 'new',
        loadComponent: () =>
          import(
            './financial-institutions-editor/financial-institutions-editor.component'
          ).then((m) => m.FinancialInstitutionsEditorComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import(
            './financial-institutions-editor/financial-institutions-editor.component'
          ).then((m) => m.FinancialInstitutionsEditorComponent),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
