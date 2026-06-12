import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { PageContainer } from '../../../shared/ui/page-container/page-container';
import { StreamSection } from '../../../shared/components/stream-section/stream-section';
import { HighlightCourseCard } from '../../../shared/components/highlight-course-card/highlight-course-card';
import { Course } from '../../../core/interfaces/course.interface';
import { Track } from '../../../core/interfaces/track.interface';
import { TRACKS } from '../../../core/constants/track.constant';
import { CourseService } from '../../../core/services/course-service/course.service';

@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [
    PageContainer, 
    StreamSection, 
    HighlightCourseCard
  ],
  templateUrl: './tracks.html',
  styleUrl: './tracks.scss',
})
export class Tracks implements OnInit {
  private readonly courseService = inject(CourseService);
  private readonly cdr = inject(ChangeDetectorRef);
  protected tracks: Array<{
    track: Track;
    courses: Course[];
  }> = [];

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (response) => {
        this.tracks = TRACKS.map((track) => ({
          track,

          courses: track.courses
            .map(
              (playlistId) =>
                response.courses.find(
                  (course) =>
                    course.playlistId === playlistId,
                ),
            )
            .filter(
              (course): course is Course =>
                !!course,
            ),
        }));

        this.cdr.detectChanges();
      },
    });
  }
}
