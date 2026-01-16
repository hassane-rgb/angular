import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserStore } from './user.store';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  template: `
    <h2>User Detail</h2>

    @if (user()) {
      <p>Name: {{ user()!.name }}</p>
      <p>Email: {{ user()!.email }}</p>
    } @else {
      <p>User not found</p>
    }
  `
})
export class UserDetailComponent {
  private route = inject(ActivatedRoute);
  private store = inject(UserStore);

  private userId = Number(this.route.snapshot.paramMap.get('id'));

  user = computed(() => {
    this.store.selectUser(this.userId);
    return this.store.selectedUser();
  });
}
