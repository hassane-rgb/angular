import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { User } from './user.model';
import { USERS_LOADER } from './users.loader';

const STORAGE_KEY = 'user-store';

type Status = 'idle' | 'loading' | 'success' | 'error';

@Injectable({ providedIn: 'root' })
export class UserStore {
  // ===== dependencies =====
  private readonly loader = inject(USERS_LOADER);

  // ===== STATE =====
  private readonly _users = signal<User[]>([]);
  private readonly _selectedUserId = signal<number | null>(null);

  private readonly _status = signal<Status>('idle');
  private readonly _error = signal<string | null>(null);

  

  // ===== SELECTORS (computed) =====
  readonly users  = this._users.asReadonly();
  readonly status = this._status.asReadonly();
  readonly error  = this._error.asReadonly();

  readonly isIdle    = computed(() => this._status() === 'idle');
  readonly isLoading = computed(() => this._status() === 'loading');
  readonly isSuccess = computed(() => this._status() === 'success');
  readonly isError   = computed(() => this._status() === 'error');
  readonly hasError  = computed(() => this._status() === 'error');
  readonly selectedUser = computed<User | null>(() => {
    const id = this._selectedUserId();
    return id === null
      ? null
      : this._users().find(u => u.id === id) ?? null;
  });
  readonly hasUsers = computed(() => this._users().length > 0);

  // ===== actions =====
  init() {
    if (this._users().length === 0) {
      this.loadUsers();
    }
  }

  async loadUsers() {
    if (this._status() === 'loading') return;

    this._status.set('loading');
    this._error.set(null);

    try {
      const users = await this.loader.load();
      this._users.set(users);
      this._status.set('success');
    } catch {
      this._users.set([]);
      this._status.set('error');
      this._error.set('Failed to load users');
    }
  }

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
    this._users.update(users => users.filter(u => u.id !== id));
    if (this._selectedUserId() === id) {
      this._selectedUserId.set(null);
    }
  }

  selectUser(id: number) {
    this._selectedUserId.set(id);
  }

  clearSelection() {
    this._selectedUserId.set(null);
  }

  // ===== UI-friendly computed selectors =====

  readonly usersCount = computed(() => this._users().length);

  readonly isEmpty = computed(() => this._users().length === 0);

  readonly hasSelectedUser = computed(
    () => this._selectedUserId() !== null
  );

  readonly selectedUserName = computed(() => {
    const user = this.selectedUser();
    return user ? user.name : null;
  });

  /**
   * UX helper
   * (utile plus tard pour désactiver le form si besoin)
   */
  readonly canAddUser = computed(() => {
    return this._status() !== 'loading';
  });
}
