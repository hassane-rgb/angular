import { USERS_LOADER } from "../users.loader";
import { User } from "../user.model";

export const usersLoaderProvider = {
  provide: USERS_LOADER,
  useValue: {
    load: async (): Promise<User[]> => [
      { id: 1, name: 'Alice', email: 'a@test.com' },
      { id: 2, name: 'Bob', email: 'b@test.com' },
    ],
  },
};
