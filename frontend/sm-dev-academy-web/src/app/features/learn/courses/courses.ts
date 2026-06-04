import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CourseService } from '../../../core/services/course-service/course.service';
import { Course } from '../../../core/interfaces/course.interface';
import { PageContainer } from '../../../shared/ui/page-container/page-container';
import { ResponsiveGrid } from '../../../shared/ui/responsive-grid/responsive-grid';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    PageContainer,
    ResponsiveGrid,
  ],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses implements OnInit, AfterViewInit {
  private readonly courseService = inject(CourseService);
  private readonly router = inject(Router);
  private readonly pageSize = 6;
  private currentPage = 1;
  private observer?: IntersectionObserver;

  @ViewChild('sentinel')
  sentinel!: ElementRef<HTMLDivElement>;

  courses: Course[] = [];
  visibleCourses: Course[] = [];

  constructor(
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  ngAfterViewInit(): void {}

  loadCourses(): void {
    this.courseService
      .getCourses()
      .subscribe({
        next: (response) => {
          this.courses = response.courses;
          this.visibleCourses = this.courses.slice(0, this.pageSize);
          this.cdr.detectChanges();

          if (
            !this.observer
          ) {
            this.createObserver();
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  private createObserver(): void {
    setTimeout(() => {
      if (!this.sentinel) {
        return;
      }

      this.observer = new IntersectionObserver((entries) => {
          if (!entries[0]?.isIntersecting) {
            return;
          }

          this.loadMore();
        },
        {
          root: null,
          threshold: 1,
          rootMargin: '0px',
        },
      );

      this.observer.observe(
        this.sentinel.nativeElement,
      );
    });
  }

  private loadMore(): void {
    const nextPage = this.currentPage + 1;
    const nextItems = this.courses.slice(0, nextPage * this.pageSize);

    if (nextItems.length > this.visibleCourses.length){
      setTimeout(() => {
        this.visibleCourses = nextItems;
        this.currentPage = nextPage;
        this.cdr.detectChanges();
      }, 250);
    }
  }

  openCourse(
    playlistId: string,
  ): void {
    this.router.navigate([
      '/learn/course',
      playlistId,
    ]);
  }
}