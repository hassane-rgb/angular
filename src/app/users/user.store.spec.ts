import { UserStore } from './user.store';

describe('UserStore', () => {
  let store: UserStore;

  beforeEach(() => {
    store = new UserStore();
  });

  it('should add a user', () => {
    store.addUser({ id: 1, name: 'Alice', email: 'a@test.com' });

    expect(store.users().length).toBe(1);
  });

  it('should select a user', () => {
    store.addUser({ id: 1, name: 'Alice', email: 'a@test.com' });
    store.selectUser(1);

    expect(store.selectedUser()?.name).toBe('Alice');
  });
});
