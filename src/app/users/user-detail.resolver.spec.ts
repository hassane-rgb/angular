import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { userDetailResolver } from './user-detail.resolver';
import { UserStore } from './user.store';
import { vi } from 'vitest';
import { USERS_LOADER } from './users.loader';

describe('userDetailResolver', () => {
  it('should select user from route param', () => {
    TestBed.configureTestingModule({
      providers: [
        UserStore,
        {
          provide: USERS_LOADER,
          useValue: () => Promise.resolve([]), // 👈 fake minimal
        },
      ],
    });

    const store = TestBed.inject(UserStore);
    const spy = vi.spyOn(store, 'selectUser');

    const route = {
      paramMap: new Map([['id', '42']]),
    } as unknown as ActivatedRouteSnapshot;

    const state = {} as RouterStateSnapshot;

    TestBed.runInInjectionContext(() => {
      userDetailResolver(route, state);
    });

    expect(spy).toHaveBeenCalledWith(42);
  });
});
