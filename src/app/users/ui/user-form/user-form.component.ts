import { Component, output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { User } from '../../data/user.model';

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

      <button
        type="submit"
        [disabled]="form.invalid"
      >
        Add
      </button>

    </form>
  `
})
export class UserFormComponent {
  create = output<User>();

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  submit() {
    if (this.form.invalid) return;

    this.create.emit({
      id: Date.now(),
      ...this.form.value as { name: string; email: string }
    });

    this.form.reset();
  }
}
