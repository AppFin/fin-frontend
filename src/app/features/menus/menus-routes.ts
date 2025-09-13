import { Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/authentication/admin.guard';

export const MENUS_ROUTES: Routes = [
  {
    path: 'menus',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./menus.component').then((m) => m.MenusComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./menus-list/menus-list.component').then(
            (m) => m.MenusListComponent
          ),
      },
      {
        path: 'new',
        loadComponent: () => import('./menus-editor/menus-editor.component').then(m => m.MenusEditorComponent),
      },
      {
        path: ':menuId',
        loadComponent: () => import('./menus-editor/menus-editor.component').then(m => m.MenusEditorComponent),
      },
      {
        path: '**',
        redirectTo: ''
      }
    ],
  },
];
