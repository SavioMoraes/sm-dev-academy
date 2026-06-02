import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
  ) {}

  importCourses(): void {

    const token =
      this.authService.getToken();

    const headers =
      new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

    this.http.post(
      'http://localhost:3000/admin/courses/import',
      {},
      {
        headers,
      },
    ).subscribe({
      next: (response) => {

        console.log(
          response,
        );

      },
      error: (error) => {

        console.error(
          error,
        );

      },
    });

  }

}