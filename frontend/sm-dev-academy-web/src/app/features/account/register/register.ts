import { Component, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  isLoading = false;
  previewImage: string | null = null;

  registerForm;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {

    this.registerForm =
      this.formBuilder.group({
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
          ],
        ],
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
        confirmPassword: [
          '',
          [
            Validators.required,
          ],
        ],
        avatarUrl: [
          '',
        ],
      });

  }

  onImageSelected(
    event: Event,
  ): void {

    const input =
      event.target as HTMLInputElement;

    const file =
      input.files?.[0];

    if (!file) {
      return;
    }

    const reader =
      new FileReader();

    reader.onload =
      (e) => {

        const result =
          e.target?.result as string;

        this.previewImage =
          result;

        this.registerForm.patchValue({
          avatarUrl: result,
        });

        this.changeDetectorRef.detectChanges();

      };

    reader.readAsDataURL(file);

  }

  handleSubmit(): void {

    if (
      this.registerForm.invalid
    ) {

      this.registerForm.markAllAsTouched();

      return;

    }

    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {

      alert(
        'As senhas não coincidem.',
      );

      return;

    }

    this.isLoading = true;

    this.authService.register({
      name:
        this.registerForm.value.name!,
      email:
        this.registerForm.value.email!,
      password:
        this.registerForm.value.password!,
      avatarUrl:
        this.registerForm.value.avatarUrl || undefined,
    }).subscribe({
      next: () => {

        alert(
          'Cadastro realizado com sucesso.',
        );

        this.router.navigate([
          '/account/login',
        ]);

      },
      error: (error) => {

        console.error(error);

        alert(
          'Usuário já possui cadastro.',
        );

        this.isLoading = false;

      },
    });

  }

}