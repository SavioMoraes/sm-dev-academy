import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../core/services/course-service/course.service';
import { Course } from '../../../core/interfaces/course.interface'

@Component({
  selector: 'app-courses',

  standalone: true,

  imports: [
    CommonModule,
  ],

  templateUrl: './courses.html',

  styleUrl: './courses.scss',
})
export class Courses
  implements OnInit {

  private readonly courseService =
    inject(CourseService);

  courses: Course[] = [];

  total = 0;

  ngOnInit(): void {

    this.loadCourses();

  }

  loadCourses(): void {

    this.courseService
      .getCourses()
      .subscribe({

        next: (response) => {

          this.courses =
            response.courses;

          this.total =
            response.total;

          console.log(response);

        },

        error: (error) => {

          console.error(error);

        },

      });

  }

}