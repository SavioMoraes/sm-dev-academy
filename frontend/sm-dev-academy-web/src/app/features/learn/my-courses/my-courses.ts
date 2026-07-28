import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PageContainer } from '../../../shared/ui/page-container/page-container';
import { ResponsiveGrid } from '../../../shared/ui/responsive-grid/responsive-grid';
import { MyCourseService } from '../../../core/services/my-course-service/my-course.service';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule, PageContainer, ResponsiveGrid],
  templateUrl: './my-courses.html',
  styleUrl: './my-courses.scss',
})
export class MyCourses implements OnInit, AfterViewInit {
  private readonly myCourseService = inject(MyCourseService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  private readonly pageSize = 6;
  private currentPage = 1;
  private observer?: IntersectionObserver;

  @ViewChild('sentinel')
  sentinel!: ElementRef<HTMLDivElement>;

  myCourses: any[] = [];
  visibleMyCourses: any[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadMyCourses();
  }

  ngAfterViewInit(): void {}

  loadMyCourses(): void {
    this.loading = true;

    this.myCourseService.getMyCourses().subscribe({
      next: (response) => {
        this.myCourses = response;
        this.visibleMyCourses = this.myCourses.slice(0, this.pageSize);

        setTimeout(() => {
          this.loading = false;

          this.cdr.detectChanges();

          if (!this.observer) {
            this.createObserver();
          }
        }, 0);
      },

      error: (error) => {
        this.loading = false;
        console.error(error);
      },
    });
  }

  private createObserver(): void {
    setTimeout(() => {
      if (!this.sentinel) {
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
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

      this.observer.observe(this.sentinel.nativeElement);
    });
  }

  private loadMore(): void {
    const nextPage = this.currentPage + 1;
    const nextItems = this.myCourses.slice(0, nextPage * this.pageSize);

    if (nextItems.length > this.visibleMyCourses.length) {
      setTimeout(() => {
        this.visibleMyCourses = nextItems;
        this.currentPage = nextPage;
        this.cdr.detectChanges();
      }, 100);
    }
  }

  openCourse(playlistId: string): void {
    this.router.navigate(['/learn/courses', playlistId]);
  }

  removeCourse(event: MouseEvent, courseId: string): void {
    event.stopPropagation();

    const confirmed = confirm('Deseja remover este curso da sua lista?');

    if (!confirmed) {
      return;
    }

    this.myCourseService.remove(courseId).subscribe({
      next: (response) => {
        alert(response.message);
        this.myCourses = this.myCourses.filter((item) => item.course.id !== courseId);
        this.visibleMyCourses = this.visibleMyCourses.filter((item) => item.course.id !== courseId);

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
