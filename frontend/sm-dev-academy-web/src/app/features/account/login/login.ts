import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
  submitted = false;
  errorMessage = '';
  loginForm;
  showPassword = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
     private readonly cdr: ChangeDetectorRef,
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

    this.loginForm.valueChanges.subscribe(() => {
      this.submitted = false;
      this.errorMessage = '';
    });
  }

  handleSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

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
          
          this.errorMessage =
            error.error?.message ||
            'E-mail ou senha inválidos.';
          
          this.isLoading = false;
          this.cdr.detectChanges();
        },
      });

    }

}