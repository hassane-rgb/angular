import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h2>Add user</h2>

    <form [formGroup]="form" (ngSubmit)="submit()">
      <input
        type="text"
        placeholder="Name"
        formControlName="name"
      />

      <input
        type="email"
        placeholder="Email"
        formControlName="email"
      />

      <button type="submit" [disabled]="form.invalid">
        Add
      </button>
    </form>
  `
})
export class UserFormComponent {
  private userService = inject(UserService);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  submit() {
    this.userService.addUser({
      id: Date.now(),
      ...this.form.value as any
    });

    this.form.reset();
  }
}
