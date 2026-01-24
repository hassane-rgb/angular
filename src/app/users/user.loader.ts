import { InjectionToken } from '@angular/core';
import { User } from './user.model';

export type LoadUsersFn = () => Promise<User[]>;

export const LOAD_USERS = new InjectionToken<LoadUsersFn>('LOAD_USERS');
