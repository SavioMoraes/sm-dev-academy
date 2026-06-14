import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { PageContainer } from '../../../shared/ui/page-container/page-container';
import { StreamSection } from '../../../shared/components/stream-section/stream-section';
import { HighlightCourseCard } from '../../../shared/components/highlight-course-card/highlight-course-card';
import { Course } from '../../../core/interfaces/course.interface';
import { Track } from '../../../core/interfaces/track.interface';
import { TRACKS } from '../../../core/constants/track.constant';
import { CourseService } from '../../../core/services/course-service/course.service';
import { MyCourseService } from '../../../core/services/my-course-service/my-course.service';

@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [PageContainer, StreamSection, HighlightCourseCard],
  templateUrl: './tracks.html',
  styleUrl: './tracks.scss',
})
export class Tracks implements OnInit {
  private readonly courseService = inject(CourseService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly myCourseService = inject(MyCourseService);

  protected tracks: Array<{
    track: Track;
    courses: Course[];
    progress: number;
  }> = [];

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (coursesResponse) => {
        this.myCourseService.getMyCourses().subscribe({
          next: (myCourses) => {
            this.tracks = TRACKS.map((track) => {
              const courses = track.courses
                .map((playlistId) =>
                  coursesResponse.courses.find((course) => course.playlistId === playlistId),
                )
                .filter((course): course is Course => !!course);

              const progressValues = courses.map((course) => {
                const myCourse = myCourses.find(
                  (item: any) => item.course?.playlistId === course.playlistId,
                );

                return myCourse?.progress ?? 0;
              });

              const progress = progressValues.length
                ? Math.round(
                    progressValues.reduce((total: number, value: number) => total + value, 0) /
                      progressValues.length,
                  )
                : 0;

              return {
                track,
                courses,
                progress,
              };
            });

            this.cdr.detectChanges();
          },

          error: (error) => {
            console.error(error);
          },
        });
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
