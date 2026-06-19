import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  isLoading = false;
  submitted = false;
  errorMessage = '';
  loginForm;
  showPassword = false;
  forgotPasswordOpen = false;
  resetPasswordOpen = false;
  recoveryEmail = '';
  newPassword = '';
  confirmPassword = '';
  recoveryError = '';
  recoverySuccess = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.submitted = false;
      this.errorMessage = '';
    });
  }

  handleSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.authService
      .login({
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      })
      .subscribe({
        next: (response) => {
          this.authService.setAuth(response.access_token, response.user);
          this.router.navigate(['/']);
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = error.error?.message || 'E-mail ou senha inválidos.';
          this.isLoading = false;
          this.cdr.detectChanges();
        },
      });
  }

  openForgotPassword(): void {
    this.forgotPasswordOpen = true;
    this.recoveryEmail = '';
    this.recoveryError = '';
  }

  continueRecovery(): void {
    if (!this.recoveryEmail) {
      this.recoveryError = 'Informe um e-mail.';

      return;
    }

    this.authService.checkEmail(this.recoveryEmail).subscribe({
      next: () => {
        this.recoveryError = '';
        this.forgotPasswordOpen = false;
        this.resetPasswordOpen = true;
      },

      error: (error) => {
        this.recoveryError = error.error?.message || 'E-mail não cadastrado na plataforma.';
      },
    });
  }

  saveNewPassword(): void {
    this.recoveryError = '';

    if (this.newPassword.length < 6) {
      this.recoveryError = 'A senha deve possuir pelo menos 6 caracteres.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.recoveryError = 'As senhas não coincidem.';
      return;
    }

    this.authService
      .resetPassword({
        email: this.recoveryEmail,
        password: this.newPassword,
      })
      .subscribe({
        next: () => {
          this.resetPasswordOpen = false;
          this.recoverySuccess = 'Senha alterada com sucesso.';
        },

        error: (error) => {
          this.recoveryError = error.error?.message || 'Erro ao alterar senha.';
        },
      });
  }
}
