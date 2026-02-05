import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../data/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Users</h2>

    @if (loading()) {
      <p>Loading users...</p>
    } @else if (users().length === 0) {
      <p>No users yet</p>
    } @else {
      <ul>
        @for (user of users(); track user.id) {
          <li
            [class.selected]="user.id === selectedUserId()"
            (click)="select.emit(user.id)"
          >
            {{ user.name }}
            <button (click)="remove.emit(user.id); $event.stopPropagation()">❌</button>
          </li>
        }
      </ul>
    }

  `
})
export class UserListComponent {
  users = input<User[]>([]);
  selectedUserId = input<number | null>(null);
  loading = input<boolean>(false);

  select = output<number>();
  remove = output<number>();
}
