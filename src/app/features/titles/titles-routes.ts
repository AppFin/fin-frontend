import { Routes } from '@angular/router';

export const TITLES_ROUTES: Routes = [
  {
    path: 'titles',
    loadComponent: () =>
      import('./titles.component').then(
        (m) => m.TitlesComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './titles-list/titles-list.component'
          ).then((m) => m.TitlesListComponent),
      },
      {
        path: 'new',
        loadComponent: () =>
          import(
            './titles-editor/titles-editor.component'
          ).then((m) => m.TitlesEditorComponent),
      },
      {
        path: ':titleId',
        loadComponent: () =>
          import(
            './titles-editor/titles-editor.component'
          ).then((m) => m.TitlesEditorComponent),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
