import { Injectable, signal, computed } from '@angular/core';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserStore {
  // ===== STATE =====
  private readonly _users = signal<User[]>([]);
  private readonly _selectedUserId = signal<number | null>(null);

  // ===== SELECTORS (computed) =====
  readonly users = this._users.asReadonly();

  readonly selectedUser = computed(() =>
    this._users().find(u => u.id === this._selectedUserId())
  );

  readonly hasUsers = computed(() =>
    this._users().length > 0
  );

  // ===== ACTIONS =====
  addUser(user: User) {
    this._users.update(users => [...users, user]);
  }

  removeUser(id: number) {
    this._users.update(users =>
      users.filter(u => u.id !== id)
    );
  }

  selectUser(id: number) {
    this._selectedUserId.set(id);
  }

  clearSelection() {
    this._selectedUserId.set(null);
  }
}
