import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserStore } from './user.store';

export const userDetailResolver: ResolveFn<void> = (route) => {
  const store = inject(UserStore);
  const id = Number(route.paramMap.get('id'));

  store.selectUser(id);
};
