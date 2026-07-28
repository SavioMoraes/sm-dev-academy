import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Track } from '../../../../core/interfaces/track.interface';
import { TRACKS } from '../../../../core/constants/track.constant';
import { Course } from '../../../../core/interfaces/course.interface';
import { CourseService } from '../../../../core/services/course-service/course.service';
import { MyCourseService } from '../../../../core/services/my-course-service/my-course.service';
import { RatingService } from '../../../../core/services/rating-service/rating.service';
import { PageContainer } from '../../../../shared/ui/page-container/page-container';
import { CourseRating } from '../../../../shared/components/course-rating/course-rating';

@Component({
  selector: 'app-track-details',
  standalone: true,
  imports: [PageContainer, RouterLink, CourseRating],
  templateUrl: './track-details.html',
  styleUrl: './track-details.scss',
})
export class TrackDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly courseService = inject(CourseService);
  private readonly myCourseService = inject(MyCourseService);
  private readonly ratingService = inject(RatingService);

  protected track: Track | null = null;

  protected trackCourses: Array<{
    course: Course;
    progress: number;
    average: number;
    totalRatings: number;
  }> = [];

  protected trackProgress = 0;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    this.track = TRACKS.find((track) => track.slug === slug) ?? null;

    if (!this.track) {
      return;
    }

    this.courseService.getCourses().subscribe({
      next: (coursesResponse) => {
        this.myCourseService.getMyCourses().subscribe({
          next: (myCourses) => {
            this.trackCourses = this.track!.courses.map((playlistId) => {
              const course = coursesResponse.courses.find(
                (course) => course.playlistId === playlistId,
              );

              if (!course) {
                return null;
              }

              const myCourse = myCourses.find(
                (item: any) => item.course?.playlistId === course.playlistId,
              );

              return {
                course,
                progress: myCourse?.progress ?? 0,
                average: 0,
                totalRatings: 0,
              };
            }).filter(Boolean) as Array<{
              course: Course;
              progress: number;
              average: number;
              totalRatings: number;
            }>;

            const totalProgress = this.trackCourses.reduce(
              (total, item) => total + item.progress,
              0,
            );

            this.trackProgress =
              this.trackCourses.length > 0
                ? Math.round(totalProgress / this.trackCourses.length)
                : 0;

            const courseIds = this.trackCourses.map((item) => item.course.id);

            this.ratingService.getRatings(courseIds).subscribe({
              next: (ratings) => {
                const ratingsMap = new Map(ratings.map((rating) => [rating.courseId, rating]));

                this.trackCourses.forEach((item) => {
                  const rating = ratingsMap.get(item.course.id);

                  item.average = rating?.average ?? 0;
                  item.totalRatings = rating?.totalRatings ?? 0;
                });

                this.cdr.detectChanges();
              },

              error: (error) => {
                console.error(error);
              },
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
