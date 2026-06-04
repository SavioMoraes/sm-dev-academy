import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {

  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  private readonly apiUrl =
    `${environment.apiUrl}/favorites`;

  private getHeaders(): HttpHeaders {

    const token =
      this.authService.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

  }

  create(courseId: string): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/${courseId}`,
      {},
      {
        headers: this.getHeaders(),
      },
    );

  }

  remove(courseId: string): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${courseId}`,
      {
        headers: this.getHeaders(),
      },
    );

  }

  getFavorites(): Observable<any> {

    return this.http.get(
      this.apiUrl,
      {
        headers: this.getHeaders(),
      },
    );

  }

}