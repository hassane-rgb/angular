import { UsersLoader } from './users.loader';
import { UserDto } from './user.dto';
import { mapUserDto } from './user.mapper';

export class UsersApiLoader implements UsersLoader {
  async load() {
    const response: UserDto[] = [
      { id: 1, full_name: 'Alice', email_address: 'alice@test.com' },
      { id: 2, full_name: 'Bob', email_address: 'bob@test.com' },
    ];

    return response.map(mapUserDto);
  }
}
