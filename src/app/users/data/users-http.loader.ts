import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { UsersLoader } from './users.loader';
import { User } from './user.model';

@Injectable()
export class UsersHttpLoader implements UsersLoader {
  private http = inject(HttpClient);

  load(): Promise<User[]> {
    return firstValueFrom(
      this.http.get<User[]>('/api/users')
    );
  }
}
