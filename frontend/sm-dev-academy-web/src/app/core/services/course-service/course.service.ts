import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoursesResponse, CourseResponse } from '../../interfaces/course.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/learn/courses`;

  getCourses(): Observable<CoursesResponse> {
    return this.http.get<CoursesResponse>(
      this.apiUrl,
    );
  }

   getCourseByPlaylistId(playlistId: string): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(
      `${this.apiUrl}/${playlistId}`,
    );
  }
  
}