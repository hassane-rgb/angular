import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserStore } from '../data/user.store';

export const userDetailResolver: ResolveFn<void> = async (route) => {
  const store = inject(UserStore);
  const id = Number(route.paramMap.get('id'));

  if (!store.users().length) {
    await store.loadUsers();
  }

  store.selectUser(id);
};
