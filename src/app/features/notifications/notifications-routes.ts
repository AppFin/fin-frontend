import { Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/authentication/admin.guard';

export const NOTIFICATIONS_ROUTES: Routes = [
  {
    path: 'notifications',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./notifications.component').then((m) => m.NotificationsComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./notifications-list/notifications-list.component').then(
            (m) => m.NotificationsListComponent
          ),
      },
      // {
      //   path: 'new',
      //   loadComponent: () => import('./menus-editor/menus-editor.component').then(m => m.MenusEditorComponent),
      // },
      // {
      //   path: ':notificationId',
      //   loadComponent: () => import('./menus-editor/menus-editor.component').then(m => m.MenusEditorComponent),
      // },
      {
        path: '**',
        redirectTo: ''
      }
    ],
  },
];
