import {
  CommonModule,
} from '@angular/common';

import {
  Component,
  OnInit,
  inject,
} from '@angular/core';

import {
  Course,
} from '../../core/interfaces/course.interface';

import {
  CourseService,
} from '../../core/services/course-service/course.service';

import {
  PageContainer,
} from '../../shared/ui/page-container/page-container';

import {
  HomeHero,
} from '../../shared/components/home-hero/home-hero';

import {
  CategoryCard,
} from '../../shared/components/category-card/category-card';

import {
  HighlightCourseCard,
} from '../../shared/components/highlight-course-card/highlight-course-card';

import {
  StreamSection,
} from '../../shared/components/stream-section/stream-section';

@Component({
  selector: 'app-home',

  standalone: true,

  imports: [
    CommonModule,
    PageContainer,
    HomeHero,
    CategoryCard,
    HighlightCourseCard,
    StreamSection,
  ],

  templateUrl: './home.html',

  styleUrl: './home.scss',
})
export class Home
  implements OnInit {

  private readonly courseService =
    inject(CourseService);

  protected courses: Course[] = [];

  ngOnInit(): void {

    this.loadCourses();

  }

  private loadCourses(): void {

    this.courseService
      .getCourses()
      .subscribe({

        next: (response) => {

          this.courses =
            response.courses.slice(0, 12);

        },

        error: (error) => {

          console.error(error);

        },

      });

  }

}