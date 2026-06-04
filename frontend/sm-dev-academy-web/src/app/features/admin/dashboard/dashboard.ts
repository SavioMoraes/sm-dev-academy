import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  private readonly API_URL = environment.apiUrl;

  isLoading = false;
  importResult: any = null;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  importCourses(): void {

    this.isLoading = true;

    this.importResult = null;

    const token =
      this.authService.getToken();

    const headers =
      new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

    this.http.post(
      `${this.API_URL}/admin/courses/import`,
      {},
      {
        headers,
      },
    ).subscribe({
      next: (response) => {

  console.log(
    'IMPORT RESPONSE',
    response,
  );

  this.importResult =
    response;

  this.isLoading =
    false;

  this.cdr.detectChanges();

},
      error: (error) => {

  console.error(error);

  this.importResult = {
    error: true,
    message:
      error?.error?.message ||
      'Erro ao sincronizar cursos.',
  };

  this.isLoading =
    false;

  this.cdr.detectChanges();

},
    });

  }

}