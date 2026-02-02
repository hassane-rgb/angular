import { Component, input } from '@angular/core';
import { User } from '../../data/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  template: `
    <h2>User detail</h2>

    @if (user()) {
      <p>Name: {{ user()!.name }}</p>
      <p>Email: {{ user()!.email }}</p>
    } @else {
      <p>No user selected</p>
    }
  `
})

export class UserDetailComponent {
  user = input<User | null>(null);
}

