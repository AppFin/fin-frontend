import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './features/authentication/authentication-routes';
import { authenticatedGuard } from './core/guards/authentication/authenticated.guard';

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
