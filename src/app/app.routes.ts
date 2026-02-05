import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./users/pages/users-page.component')
        .then(m => m.UsersPageComponent)
  }
  ,
  {
    path: '**',
    redirectTo: 'users'
  }
];
