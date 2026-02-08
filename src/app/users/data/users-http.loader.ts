import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';

import { UsersLoader } from './users.loader';
import { User } from './user.model';
import { UserDto } from './user.dto';
import { mapUserDto } from './user.mapper';

export class UsersHttpLoader implements UsersLoader {
  private http = inject(HttpClient);

  load(): Promise<User[]> {
    return firstValueFrom(
      this.http.get<UserDto[]>('/api/users').pipe(
        map(dtos => dtos.map(mapUserDto))
      )
    );
  }
}