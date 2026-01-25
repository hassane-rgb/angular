import { InjectionToken } from '@angular/core';
import { User } from './user.model';

export interface UsersLoader {
  load(): Promise<User[]>;
}

export const USERS_LOADER = new InjectionToken<UsersLoader>('USERS_LOADER');
