import { Component, inject, effect } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { UserStore } from '../data/user.store';
import { UserListComponent } from '../ui/user-list/user-list.component';
import { UserDetailComponent } from '../ui/user-detail/user-detail.component';
import { UserFormComponent } from '../ui/user-form/user-form.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, UserListComponent, UserDetailComponent, UserFormComponent],
  template: `
    <h1>Page Users</h1>
    <app-user-form />

    <app-user-list
      [users]="store.users"
      (remove)="store.removeUser($event)"
    />

    <app-user-detail />
    <router-outlet />
  `
})
export class UsersPageComponent {
  store = inject(UserStore);
  route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      const resolvedUser = this.route.snapshot.firstChild?.data['user'];
      if (resolvedUser) {
        this.store.selectUser(resolvedUser.id);
      }
    });
  }

  ngOnInit() {
    if (!this.store.hasUsers()) {
      this.store.loadUsers();
    }
  }
}
