import { USERS_LOADER } from './users.loader';
import { UsersHttpLoader } from './users-http.loader';

export const usersLoaderProvider = {
  provide: USERS_LOADER,
  useClass: UsersHttpLoader,
};
