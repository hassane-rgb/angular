import { TestBed } from '@angular/core/testing';
import { UserStore } from './data/user.store';
import { User } from './data/user.model';
import { USERS_LOADER } from './data/users.loader';

describe('UserStore', () => {
  let store: UserStore;

  const user1: User = { id: 1, name: 'Alice', email: 'alice@test.com' };
  const user2: User = { id: 2, name: 'Bob', email: 'bob@test.com' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: USERS_LOADER,
          useValue: {
            load: () => Promise.resolve([user1, user2]),
          },
        },
      ],
    });

    localStorage.clear();
    store = TestBed.inject(UserStore);
  });

  // ===== BASIC STATE =====

  it('should start with empty users', () => {
    expect(store.users().length).toBe(0);
    expect(store.selectedUser()).toBeNull();
    expect(store.status()).toBe('idle');
  });

  // ===== CRUD =====

  it('should add users', () => {
    store.addUser(user1);
    store.addUser(user2);

    expect(store.users()).toEqual([user1, user2]);
  });

  it('should select a user', () => {
    store.addUser(user1);
    store.selectUser(1);

    expect(store.selectedUser()).toEqual(user1);
  });

  it('should clear selection when selected user is removed', () => {
    store.addUser(user1);
    store.selectUser(1);

    store.removeUser(1);

    expect(store.users().length).toBe(0);
    expect(store.selectedUser()).toBeNull();
  });

  // ===== PERSISTENCE =====

  it('should persist users to localStorage', () => {
    store.addUser(user1);

    // 🔥 appel explicite de l’action, volontaire et testable
    store.persist();

    const raw = localStorage.getItem('user-store');
    expect(raw).toBeTruthy();

    const parsed = JSON.parse(raw!);
    expect(parsed.users.length).toBe(1);
    expect(parsed.users[0].name).toBe('Alice');
  });

  it('should restore users from localStorage', () => {
    localStorage.setItem(
      'user-store',
      JSON.stringify({
        users: [user1],
        selectedUserId: 1,
      })
    );

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: USERS_LOADER,
          useValue: () => Promise.resolve([]),
        },
      ],
    });

    store = TestBed.inject(UserStore);

    expect(store.users().length).toBe(1);
    expect(store.selectedUser()?.name).toBe('Alice');
  });

  // ===== LOAD USERS =====

  it('should load users and set status success', async () => {
    await store.loadUsers();

    expect(store.status()).toBe('success');
    expect(store.users().length).toBe(2);
    expect(store.error()).toBeNull();
  });

  it('should set error status when loading fails', async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: USERS_LOADER,
          useValue: {
            load: () => Promise.reject('boom')
          },
        },
      ],
    });

    store = TestBed.inject(UserStore);

    await store.loadUsers(); // 🔥 clé ici

    expect(store.status()).toBe('error');
    expect(store.error()).toBe('Failed to load users');
    expect(store.users().length).toBe(0);
  });

  it('should not reload users if already loading', async () => {
    const spy = vi.spyOn(
      TestBed.inject(USERS_LOADER),
      'load'
    );

    store.loadUsers();
    store.loadUsers();

    expect(spy).toHaveBeenCalledTimes(1);
  });

});
