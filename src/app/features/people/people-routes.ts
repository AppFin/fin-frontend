import { Routes } from '@angular/router';

export const PEOPLE_ROUTES: Routes = [
  {
    path: 'people',
    loadComponent: () =>
      import('./people.component').then((m) => m.PeopleComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./people-list/people-list.component').then(
            (m) => m.PeopleListComponent
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./people-editor/people-editor.component').then(
            (m) => m.PeopleEditorComponent
          ),
      },
      {
        path: ':personId',
        loadComponent: () =>
          import('./people-editor/people-editor.component').then(
            (m) => m.PeopleEditorComponent
          ),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
