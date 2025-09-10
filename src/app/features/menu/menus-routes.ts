import { Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/authentication/admin.guard';

export const MENUS_ROUTES: Routes = [
  {
    path: 'menus',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./menus.component').then((m) => m.MenusComponent),
  },
];
