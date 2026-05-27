import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { COURSES_MOCK } from '../../core/mocks/course.mock';
import { PageContainer } from '../../shared/ui/page-container/page-container';
import { HomeHero } from '../../shared/components/home-hero/home-hero';
import { CategoryCard } from '../../shared/components/category-card/category-card';
import { HighlightCourseCard } from '../../shared/components/highlight-course-card/highlight-course-card';
import { StreamSection } from '../../shared/components/stream-section/stream-section';
import { Course } from '../../core/interfaces/course.interface';

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
export class Home {
  protected readonly courses: Course[] = COURSES_MOCK;
}