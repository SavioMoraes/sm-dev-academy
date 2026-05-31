import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  isLoading = false;

  loginForm;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.loginForm =
    this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ],
      ],
    });
  }

  handleSubmit(): void {

    if (
      this.loginForm.invalid
    ) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.isLoading = true;

    this.authService.login({
      email:
        this.loginForm.value.email!,
      password:
        this.loginForm.value.password!,
    }).subscribe({
      next: (response) => {

        this.authService.setAuth(
        response.access_token,
        response.user,
      );

      this.router.navigate([
        '/',
      ]);

      this.isLoading = false;

      },
      error: (error) => {

        console.error(error);

        this.isLoading = false;

      },
    });

  }

}