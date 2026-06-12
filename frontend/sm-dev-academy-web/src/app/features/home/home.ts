import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Course } from '../../core/interfaces/course.interface';
import { CourseService } from '../../core/services/course-service/course.service';
import { MyCourseService } from '../../core/services/my-course-service/my-course.service';
import { PageContainer } from '../../shared/ui/page-container/page-container';
import { HomeHero } from '../../shared/components/home-hero/home-hero';
import { CategoryCard } from '../../shared/components/category-card/category-card';
import { HighlightCourseCard } from '../../shared/components/highlight-course-card/highlight-course-card';
import { StreamSection } from '../../shared/components/stream-section/stream-section';
import { ContinueWatchingCard } from '../../shared/components/continue-watching-card/continue-watching-card';
import { AuthService } from '../../core/services/auth-service/auth.service';

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
    ContinueWatchingCard,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  constructor(
    private readonly cdr: ChangeDetectorRef,
  ) {}

  private readonly courseService = inject(CourseService);
  private readonly myCourseService = inject(MyCourseService);
  protected courses: Course[] = [];
  protected continueCourse: any = null;
  protected isHomeLoading = true;
  private coursesLoaded = false;
  private continueLoaded = false;
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.loadCourses();
    // this.loadContinueWatching();

    this.authService.authState$.subscribe(() => {
      this.continueCourse = null;
      this.loadContinueWatching();

    });
  }

  private loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (response) => {
        this.courses = [...response.courses]
          .sort(() => Math.random() - 0.5)
          .slice(0, 12);
        this.coursesLoaded = true;
        this.checkHomeLoaded();
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  private loadContinueWatching(): void {
    if (!localStorage.getItem('smda_token')) {
      this.continueLoaded = true;
      this.checkHomeLoaded();
      return;
    }

    this.myCourseService.getMyCourses().subscribe({
      next: (courses) => {
        if (!courses?.length) {
          this.continueLoaded = true;
          this.checkHomeLoaded();
          return;
        }

        this.continueCourse = {
          ...courses[0].course,
          progress: courses[0].progress,
          lastVideoId: courses[0].lastVideoId,
        };
        this.continueLoaded = true;
        this.checkHomeLoaded();
        this.cdr.detectChanges();
      },

      error: () => {},
    });
  }

  private checkHomeLoaded(): void {
    if ( this.coursesLoaded && this.continueLoaded) {
      this.isHomeLoading = false;
      this.cdr.detectChanges();
    }
  }
}
