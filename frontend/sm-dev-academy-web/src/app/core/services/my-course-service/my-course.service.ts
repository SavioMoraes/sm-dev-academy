import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MyCourseService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly apiUrl = `${environment.apiUrl}/learn/my-courses`;

  private getHeaders() {
    return { Authorization: `Bearer ${this.authService.getToken()}` };
  }

  create(
    courseId: string,
  ): Observable<any> {

    return this.http.post(`${this.apiUrl}/${courseId}`,
      {},
      {
        headers: this.getHeaders(),
      },
    );
  }

  check(
    courseId: string,
  ): Observable<any> {

    return this.http.get(`${this.apiUrl}/check/${courseId}`,
      {
        headers: this.getHeaders(),
      },
    );
  }

  getMyCourses(): Observable<any> {

    return this.http.get(this.apiUrl,
      {
        headers: this.getHeaders(),
      },
    );
  }

}