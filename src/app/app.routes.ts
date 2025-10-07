import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './features/authentication/authentication-routes';
import { authenticatedGuard } from './core/guards/authentication/authenticated.guard';
import { MENUS_ROUTES } from './features/menus/menus-routes';
import { adminGuard } from './core/guards/authentication/admin.guard';
import { FINANCIAL_INSTITUTIONS_ROUTES } from './features/financial-institutions/financial-institutions-routes';
import { NOTIFICATIONS_ROUTES } from './features/notifications/notifications-routes';
import { TITLE_CATEGORIES_ROUTES } from './features/title-categories/title-categories-routes';

export const routes: Routes = [
  ...AUTH_ROUTES,
  {
    path: '',
    canActivate: [authenticatedGuard],
    loadComponent: () => import('./app.component').then((m) => m.AppComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./core/components/layout/layout.component').then(
            (m) => m.LayoutComponent
          ),
        children: [
          {
            path: 'admin',
            canActivate: [adminGuard],
            children: [
              ...MENUS_ROUTES,
              ...FINANCIAL_INSTITUTIONS_ROUTES,
              ...NOTIFICATIONS_ROUTES
            ]
          },
          ...TITLE_CATEGORIES_ROUTES,
        ]
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
