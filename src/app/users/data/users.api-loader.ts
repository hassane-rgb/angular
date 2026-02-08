import { UsersLoader } from './users.loader';
import { UserDto } from './user.dto';
import { mapUserDto } from './user.mapper';

export class UsersApiLoader implements UsersLoader {
  async load() {
    const response: UserDto[] = [
      { id: "1", name: 'Alice', email: 'alice@test.com' },
      { id: "2", name: 'Bob', email: 'bob@test.com' },
    ];

    return response.map(mapUserDto);
  }
}
