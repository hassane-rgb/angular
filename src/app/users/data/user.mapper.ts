import { User } from './user.model';
import { UserDto } from './user.dto';

export function mapUserDto(dto: UserDto): User {
  return {
    id: dto.id,
    name: dto.full_name,
    email: dto.email_address,
  };
}
