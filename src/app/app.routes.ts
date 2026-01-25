import { Routes } from '@angular/router';
import { userDetailResolver } from './users/resolvers/user-detail.resolver';

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
        .then(m => m.UsersPageComponent),
    children: [
      {
        path: ':id',
        resolve: { user: userDetailResolver },
        loadComponent: () =>
          import('./users/ui/user-detail/user-detail.component')
            .then(m => m.UserDetailComponent)
      }
    ]
  }
  ,
  {
    path: '**',
    redirectTo: 'users'
  }
];
