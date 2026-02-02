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
    <h1>Page Users</h1>

    <app-user-form
      (create)="store.addUser($event)"
    />

    <app-user-list
      [users]="store.users()"
      [selectedUserId]="store.selectedUser()?.id ?? null"
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
    if (!this.store.hasUsers()) {
      this.store.loadUsers();
    }
  }
}
