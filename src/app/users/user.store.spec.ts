import { TestBed } from '@angular/core/testing';
import { UserStore } from './user.store';
import { User } from './user.model';

describe('UserStore', () => {
  let store: UserStore;

  const user1: User = { id: 1, name: 'Alice', email: 'Alice@test.com' };
  const user2: User = { id: 2, name: 'Bob', email: 'Bob@test.com' };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorage.clear();
    store = TestBed.inject(UserStore);
  });

  it('should start with empty users', () => {
    expect(store.users().length).toBe(0);
    expect(store.selectedUser()).toBeNull();
  });

  it('should add users', () => {
    store.addUser(user1);
    store.addUser(user2);

    expect(store.users().length).toBe(2);
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

  it('should persist users to localStorage', () => {
    store.addUser(user1);

    // 🔥 appel explicite de l’action
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
    TestBed.configureTestingModule({});

    store = TestBed.inject(UserStore);

    expect(store.users().length).toBe(1);
    expect(store.selectedUser()?.name).toBe('Alice');
  });

});
