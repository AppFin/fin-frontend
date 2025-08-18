import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'auth',
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
        path: '*',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];
