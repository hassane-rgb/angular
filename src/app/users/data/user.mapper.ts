import { User } from './user.model';
import { UserDto } from './user.dto';

export function mapUserDto(dto: UserDto): User {
  return {
    id: Number(dto.id),
    name: dto.name,
    email: dto.email,
  };
}
