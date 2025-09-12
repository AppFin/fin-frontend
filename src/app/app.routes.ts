import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './features/authentication/authentication-routes';
import { authenticatedGuard } from './core/guards/authentication/authenticated.guard';
import { MENUS_ROUTES } from './features/menus/menus-routes';
import { adminGuard } from './core/guards/authentication/admin.guard';

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
              ...MENUS_ROUTES
            ]
          }
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
