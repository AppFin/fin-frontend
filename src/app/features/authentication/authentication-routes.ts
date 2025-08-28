import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from '../../core/guards/authentication/not-authenticated.guard';
import { authenticatedGuard } from '../../core/guards/authentication/authenticated.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'authentication',
    canActivate: [notAuthenticatedGuard],
    loadComponent: () =>
      import('./authentication.component').then(
        (m) => m.AuthenticationComponent
      ),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'send-reset-email',
        loadComponent: () =>
          import(
            './pages/send-reset-password-email/send-reset-password-email.component'
          ).then((m) => m.SendResetPasswordEmailComponent),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./pages/reset-password/reset-password.component').then(
            (m) => m.ResetPasswordComponent
          ),
      },
      {
        path: 'create-account',
        loadComponent: () =>
          import('./pages/create-account/create-account.component').then(
            (m) => m.CreateAccountComponent
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: '*',
        pathMatch: 'full',
        redirectTo: 'login',
      },
    ],
  },
  {
    path: 'logout',
    canActivate: [authenticatedGuard],
    loadComponent: () =>
      import('./pages/logout/logout.component').then((m) => m.LogoutComponent),
  },
];
