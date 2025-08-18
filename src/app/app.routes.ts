import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AUTH_ROUTES } from './features/authentication/authentication-routes';

export const routes: Routes = [
  ...AUTH_ROUTES,
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
