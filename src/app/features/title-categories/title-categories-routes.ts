import { Routes } from '@angular/router';

export const TITLE_CATEGORIES_ROUTES: Routes = [
  {
    path: 'title-categories',
    loadComponent: () =>
      import('./title-categories.component').then(
        (m) => m.TitleCategoriesComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './title-categories-list/title-categories-list.component'
          ).then((m) => m.TitleCategoriesListComponent),
      },
      {
        path: 'new',
        loadComponent: () =>
          import(
            './title-categories-editor/title-categories-editor.component'
          ).then((m) => m.TitleCategoriesEditorComponent),
      },
      {
        path: ':titleCategoryId',
        loadComponent: () =>
          import(
            './title-categories-editor/title-categories-editor.component'
          ).then((m) => m.TitleCategoriesEditorComponent),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
