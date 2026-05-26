import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  technology: string;
  createdAt: string;
  updatedAt: string;
}

export interface CoursesResponse {
  data: Course[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/courses';

  getCourses(): Observable<CoursesResponse> {

    return this.http.get<CoursesResponse>(
      `${this.apiUrl}?page=1&limit=10`,
    );

  }

}