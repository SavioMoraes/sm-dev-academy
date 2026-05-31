import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoursesResponse } from '../../interfaces/course.interface';

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  private readonly http =
    inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:3000/learn/courses';

  getCourses():
    Observable<CoursesResponse> {

    return this.http.get<CoursesResponse>(
      this.apiUrl,
    );

  }

}