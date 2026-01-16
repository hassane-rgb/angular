import { Routes } from '@angular/router';
import { userDetailResolver } from './users/user-detail.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./users/user-list.component')
        .then(m => m.UserListComponent)
  },
  {
  path: 'users/:id',
    resolve: {
      user: userDetailResolver
    },
    loadComponent: () =>
      import('./users/user-detail.component')
        .then(m => m.UserDetailComponent)
}
,
  {
    path: '**',
    redirectTo: 'users',
    pathMatch: 'full'
  }
];
