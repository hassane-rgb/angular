import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
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
  users = this.userService.users;

  constructor(private userService: UserService) {}

  remove(id: number) {
    this.userService.removeUser(id);
  }
}
