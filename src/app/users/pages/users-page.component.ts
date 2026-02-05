import { Component, inject, effect } from '@angular/core';
import { UserStore } from '../data/user.store';
import { UserListComponent } from '../ui/user-list/user-list.component';
import { UserDetailComponent } from '../ui/user-detail/user-detail.component';
import { UserFormComponent } from '../ui/user-form/user-form.component';

@Component({
  standalone: true,
  imports: [
    UserDetailComponent,
    UserListComponent,
    UserFormComponent
  ],
  template: `
    <h1>Users ({{ store.usersCount() }})</h1>

    @if (store.isLoading()) {
      <p>⏳ Loading users...</p>
    }

    @if (store.hasError()) {
      <p style="color: red">
        ❌ {{ store.error() }}
      </p>
    }

    <app-user-form
      (create)="store.addUser($event)"
    />

    <app-user-list
      [users]="store.users()"
      [selectedUserId]="store.selectedUser()?.id ?? null"
      [loading]="store.isLoading()"
      (select)="store.selectUser($event)"
      (remove)="store.removeUser($event)"
    />

    <app-user-detail
      [user]="store.selectedUser()"
    />
  `
})
export class UsersPageComponent {
  store = inject(UserStore);

  ngOnInit() {
    this.store.init();
  }
}
