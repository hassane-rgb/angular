import { Injectable, signal } from '@angular/core';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly _users = signal<User[]>([]);

  users = this._users.asReadonly();

  addUser(user: User) {
    this._users.update(users => [...users, user]);
  }

  removeUser(id: number) {
    this._users.update(users =>
      users.filter(user => user.id !== id)
    );
  }
}
