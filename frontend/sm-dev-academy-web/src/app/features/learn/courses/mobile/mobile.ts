import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../../../core/interfaces/course.interface';
import { CourseService } from '../../../../core/services/course-service/course.service';
import { TECHNOLOGIES } from '../../../../core/constants/technologies';
import { PageContainer } from '../../../../shared/ui/page-container/page-container';
import { StreamSection } from '../../../../shared/components/stream-section/stream-section';
import { HighlightCourseCard } from '../../../../shared/components/highlight-course-card/highlight-course-card';

@Component({
  selector: 'app-mobile',
  standalone: true,
  imports: [CommonModule, PageContainer, StreamSection, HighlightCourseCard],
  templateUrl: './mobile.html',
  styleUrl: './mobile.scss',
})
export class Mobile implements OnInit {
  private readonly courseService = inject(CourseService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  protected mobileCourses: Course[] = [];
  protected readonly technologies = TECHNOLOGIES.mobile;

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (response) => {
        this.mobileCourses = response.courses.filter((course) => course.category === 'Mobile');
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  protected getCoursesByTechnology(technology: string): Course[] {
    return this.mobileCourses.filter(
      (course) =>
        course.technology
          .toLowerCase()
          .replaceAll('.', '')
          .replaceAll(' ', '')
          .replaceAll('-', '') ===
        technology.toLowerCase().replaceAll('.', '').replaceAll(' ', '').replaceAll('-', ''),
    );
  }

  protected openCourse(playlistId: string): void {
    this.router.navigate(['/learn/courses', playlistId]);
  }
}
