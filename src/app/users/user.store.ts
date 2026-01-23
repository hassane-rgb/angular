import { Injectable, signal, computed, effect } from '@angular/core';
import { User } from './user.model';

const STORAGE_KEY = 'user-store';

@Injectable({ providedIn: 'root' })
export class UserStore {
  // ===== STATE =====
  private readonly _users = signal<User[]>([]);
  private readonly _selectedUserId = signal<number | null>(null);

  // ===== SELECTORS (computed) =====
  readonly users = this._users.asReadonly();

  readonly selectedUser = computed<User | null>(() => {
    const id = this._selectedUserId();
    return id === null
      ? null
      : this._users().find(u => u.id === id) ?? null;
  });

  readonly hasUsers = computed(() => this._users().length > 0);

  // ===== INIT + EFFECTS =====
  constructor() {
    // 🔹 LOAD from localStorage (once)
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { users, selectedUserId } = JSON.parse(saved);
        this._users.set(users ?? []);
        this._selectedUserId.set(selectedUserId ?? null);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    // 🔹 SAVE to localStorage (reactive)
    effect(() => {
      this.persist();
    });

    // 🔹 AUTO-CLEAR selection if user removed
    effect(() => {
      const selectedId = this._selectedUserId();
      if (
        selectedId !== null &&
        !this._users().some(u => u.id === selectedId)
      ) {
        this._selectedUserId.set(null);
      }
    });
  }

  // 👇 ACTION TESTABLE
  persist() {
    const snapshot = {
      users: this._users(),
      selectedUserId: this._selectedUserId(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  }

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
