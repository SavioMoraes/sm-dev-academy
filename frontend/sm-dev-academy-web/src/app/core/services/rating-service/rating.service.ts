import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly apiUrl = `${environment.apiUrl}/ratings`;

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getRating(courseId: string): Observable<{
    average: number;
    totalRatings: number;
    userRating: number | null;
  }> {
    return this.http.get<{
      average: number;
      totalRatings: number;
      userRating: number | null;
    }>(`${this.apiUrl}/${courseId}`, {
      headers: this.getHeaders(),
    });
  }

  getRatings(courseIds: string[]): Observable<
    {
      courseId: string;
      average: number;
      totalRatings: number;
      userRating: number | null;
    }[]
  > {
    return this.http.post<
      {
        courseId: string;
        average: number;
        totalRatings: number;
        userRating: number | null;
      }[]
    >(
      `${this.apiUrl}/batch`,
      {
        courseIds,
      },
      {
        headers: this.getHeaders(),
      },
    );
  }

  create(courseId: string, rating: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${courseId}`,
      {
        rating,
      },
      {
        headers: this.getHeaders(),
      },
    );
  }
}
