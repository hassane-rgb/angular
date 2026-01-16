import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [],
  template: `
    <h2>User Detail</h2>
    @if (user()) {
      <div>
        <p>Name: {{ user()!.name }}</p>
        <p>Email: {{ user()!.email }}</p>
      </div>
    }
  `
})
export class UserDetailComponent {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private userId = Number(this.route.snapshot.paramMap.get('id'));

  user = computed(() =>
    this.userService.users().find(u => u.id === this.userId)
  );

  
}
