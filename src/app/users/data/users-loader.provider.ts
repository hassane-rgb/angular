import { USERS_LOADER } from './users.loader';
import { UsersApiLoader } from './users.api-loader';

export const usersLoaderProvider = {
  provide: USERS_LOADER,
  useClass: UsersApiLoader,
};
