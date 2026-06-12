import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CourseContext } from '../../interfaces/coursecontext.interface';

@Injectable({
  providedIn: 'root',
})
export class CourseContextService {
  private readonly currentCourseSubject =
    new BehaviorSubject<CourseContext | null>(null);

  readonly currentCourse$ =
    this.currentCourseSubject.asObservable();

  setCurrentCourse(
    course: CourseContext,
  ): void {
    this.currentCourseSubject.next(course);
  }

  clear(): void {
    this.currentCourseSubject.next(null);
  }

}