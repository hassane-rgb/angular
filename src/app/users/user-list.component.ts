import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { UserFormComponent } from './user-form.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  template: `
    <app-user-form />

    <h2>Users</h2>

    <ul>
      <li *ngFor="let user of users()">
        {{ user.name }} ({{ user.email }})
        <button (click)="remove(user.id)">❌</button>
      </li>
    </ul>
  `
})
export class UserListComponent {
  private userService = inject(UserService);
  users = this.userService.users;

  remove(id: number) {
    this.userService.removeUser(id);
  }
}
