import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserFormComponent } from './user-form.component';
import { UserStore } from './data/user.store';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink, UserFormComponent],
  template: `
    <app-user-form />

    <h2>Users</h2>

    @if (store.hasUsers()) {
      <ul>
        @for (user of store.users(); track user.id) {
          <li>
            <a
              [routerLink]="['/users', user.id]"
              (click)="store.selectUser(user.id)"
            >
              {{ user.name }} ({{ user.email }})
            </a>
            <button (click)="remove(user.id)">❌</button>
          </li>
        }
      </ul>
    } @else {
      <p>No users yet</p>
    }
  `
})
export class UserListComponent {
  store = inject(UserStore);

  remove(id: number) {
    this.store.removeUser(id);
  }
}
