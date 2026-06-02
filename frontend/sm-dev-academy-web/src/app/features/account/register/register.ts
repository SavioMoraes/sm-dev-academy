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
  submitted = false;
  errorMessage = '';
  correctMessage = '';
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

      this.registerForm.valueChanges.subscribe(() => {
        this.errorMessage = '';
        this.submitted = false;
      });

  }

  onImageSelected(
    event: Event,
  ): void {

    this.errorMessage = '';

    const input =
      event.target as HTMLInputElement;

    const file =
      input.files?.[0];

    if (!file) {
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB

    if (
      file.size > maxSize
    ) {

      this.errorMessage =
        'Imagem muito grande. Escolha uma imagem menor que 5MB.';

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
    this.submitted = true;
    this.errorMessage = '';

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

      this.errorMessage = 'As senhas não coincidem.';

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

        this.correctMessage = 'Cadastro realizado com sucesso.';

        this.router.navigate([
          '/account/login',
        ]);

        this.isLoading = false;

      },
      error: (error) => {

        console.error(error);

        if (
          error.status === 409
        ) {

          this.errorMessage =
            'Este e-mail já está cadastrado.';

        } else {

          this.errorMessage =
            'Erro ao realizar cadastro.';

        }

        this.isLoading = false;

        this.changeDetectorRef.detectChanges();

      },
    });

  }

}