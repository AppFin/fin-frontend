import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AUTH_ROUTES } from './features/authentication/authentication-routes';
import { authenticatedGuard } from './core/guards/authentication/authenticated.guard';

export const routes: Routes = [
  ...AUTH_ROUTES,
  {
    path: '',
    canActivate: [authenticatedGuard],
    component: AppComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
