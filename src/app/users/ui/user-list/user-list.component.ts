import { Component, EventEmitter, inject, Input, Output, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User } from '../../data/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2>Users</h2>

    @if (users().length) {
      <ul>
        @for (user of users(); track user.id) {
          <li>
            <a [routerLink]="['/users', user.id]">
              {{ user.name }} ({{ user.email }})
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
  @Input({ required: true }) users!: Signal<User[]>;
  @Output() remove = new EventEmitter<number>();
}

