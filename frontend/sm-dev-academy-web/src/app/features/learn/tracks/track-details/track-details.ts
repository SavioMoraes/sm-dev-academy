import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track } from '../../../../core/interfaces/track.interface';
import { TRACKS } from '../../../../core/constants/track.constant';
import { Course } from '../../../../core/interfaces/course.interface';
import { CourseService } from '../../../../core/services/course-service/course.service';
import { PageContainer } from '../../../../shared/ui/page-container/page-container';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-track-details',
  standalone: true,
  imports: [
    PageContainer,
    RouterLink,
  ],
  templateUrl: './track-details.html',
  styleUrl: './track-details.scss',
})
export class TrackDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  protected track: Track | null = null;
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly courseService = inject(CourseService);
  protected trackCourses: Course[] = [];

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    this.track = TRACKS.find((track) => track.slug === slug) ?? null;

    if (!this.track) {
      return;
    }

    this.courseService.getCourses().subscribe({
      next: (response) => {
        this.trackCourses = response.courses.filter((course) =>
          this.track!.courses.includes(course.playlistId),
        );

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
