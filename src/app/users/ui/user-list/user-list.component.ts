import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../data/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Users</h2>

    @if (users().length > 0) {
      <ul>
        @for (user of users(); track user.id) {
          <li [class.selected]="user.id === selectedUserId()">
            <a
              (click)="select.emit(user.id)"
            >
              {{ user.name }}
            </a>

            <button (click)="remove.emit(user.id)">❌</button>
          </li>
        }
      </ul>
    } @else {
      <p>No users yet</p>
    }
  `
})
export class UserListComponent {
  users = input<User[]>([]);
  selectedUserId = input<number | null>(null);

  select = output<number>();
  remove = output<number>();
}
