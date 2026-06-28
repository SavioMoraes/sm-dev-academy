import { ChangeDetectorRef, Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PageContainer } from '../../../shared/ui/page-container/page-container';
import { HighlightCourseCard } from '../../../shared/components/highlight-course-card/highlight-course-card';
import { StreamSection } from '../../../shared/components/stream-section/stream-section';
import { Course, CourseVideo } from '../../../core/interfaces/course.interface';
import { CourseService } from '../../../core/services/course-service/course.service';
import { FavoriteService } from '../../../core/services/favorite-service/favorite.service';
import { MyCourseService } from '../../../core/services/my-course-service/my-course.service';
import { RatingService } from '../../../core/services/rating-service/rating.service';
import { CourseContextService } from '../../../core/services/course-context-service/course-context.service';
import { AuthService } from '../../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-course-player',
  standalone: true,
  imports: [
    CommonModule, 
    PageContainer,
    HighlightCourseCard,
    StreamSection,
  ],
  templateUrl: './course-player.html',
  styleUrl: './course-player.scss',
})
export class CoursePlayer implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly courseService = inject(CourseService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly favoriteService = inject(FavoriteService);
  private readonly myCourseService = inject(MyCourseService);
  private readonly ratingService = inject(RatingService);
  private readonly authService = inject(AuthService);
  private readonly courseContextService = inject(CourseContextService);

  course?: Course;
  selectedVideo?: CourseVideo;
  videoUrl?: SafeResourceUrl;
  isFavorite = false;
  isStarted = false;
  isStartedLoading = true;
  isAuthenticated = false;
  relatedCourses: Course[] = [];
  ratingAverage = 0;
  userRating = 0;
  totalRatings = 0;

  readonly stars = [1, 2, 3, 4, 5];

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();

    this.route.paramMap.subscribe((params) => {
      const playlistId = params.get('playlistId');

      if (!playlistId) {
        this.router.navigate(['/not-found']);
        return;
      }

      this.loadCourse(playlistId);
    });

    this.cdr.detectChanges();
  }

  private loadCourse(playlistId: string): void {
    this.course = undefined;
    this.selectedVideo = undefined;
    this.videoUrl = undefined;
    this.isFavorite = false;
    this.isStarted = false;
    this.isStartedLoading = true;

    this.courseService.getCourseByPlaylistId(playlistId).subscribe({
      next: (response) => {
        this.course = response;

        this.loadRelatedCourses();

        this.courseContextService.setCurrentCourse({
          category: this.course.category,
          technology: this.course.technology,
        });

        this.cdr.detectChanges();

        this.myCourseService.check(this.course.id).subscribe({
          next: (response) => {
            this.isStarted = response.isStarted;
            this.isStartedLoading = false;

            if (this.isStarted && this.course?.videos?.length) {
              this.selectVideo(this.course.videos[0]);
            }

            this.cdr.detectChanges();
          },

          error: () => {
            this.isStartedLoading = false;
          },
        });

        this.favoriteService.check(this.course.id).subscribe({
          next: (response) => {
            this.isFavorite = response.isFavorite;
            this.cdr.detectChanges();
          },
        });

        this.ratingService.getRating(this.course.id).subscribe({
          next: (response) => {
            this.ratingAverage = response.average;
            this.totalRatings = response.totalRatings;
            this.userRating = response.userRating ?? 0;
            this.cdr.detectChanges();
          },

          error: (error) => {
            console.error(error);
          },
        });
      },

      error: () => {
        this.router.navigate(['/not-found']);
      },
    });
  }

  selectVideo(video: CourseVideo): void {
    this.selectedVideo = video;
    const url = `https://www.youtube.com/embed/${video.videoId}?controls=1&fs=1`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  favoriteCourse(): void {
    if (!this.course) {
      return;
    }

    if (this.isFavorite) {
      this.favoriteService.remove(this.course.id).subscribe({
        next: () => {
          this.isFavorite = false;
          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error(error);
        },
      });

      return;
    }

    this.favoriteService.create(this.course.id).subscribe({
      next: () => {
        this.isFavorite = true;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  startCourse(): void {
    if (!this.course) {
      return;
    }

    if (this.isStarted) {
      return;
    }

    this.myCourseService.create(this.course.id).subscribe({
      next: () => {
        this.isStarted = true;

        const firstVideo = this.course?.videos?.[0];

        if (firstVideo) {
          this.selectVideo(firstVideo);
        }

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  handleVideoClick(video: CourseVideo): void {
    if (!this.isStarted) {
      alert('Inicie o curso para assistir às aulas.');
      return;
    }

    this.selectVideo(video);

    if (!this.course) {
      return;
    }

    const totalVideos = this.course.videos.length;

    const currentVideoIndex = this.course.videos.findIndex(
      (current) => current.videoId === video.videoId,
    );

    const progress = Math.round(((currentVideoIndex + 1) / totalVideos) * 100);

    this.myCourseService.updateProgress(this.course.id, video.videoId, progress).subscribe({
      error: (error) => {
        console.error(error);
      },
    });
  }

  private loadRelatedCourses(): void {
    if (!this.course) {
      return;
    }

    this.courseService.getCourses().subscribe({
      next: (response) => {
        this.relatedCourses = response.courses
          .filter(
            (course) =>
              course.id !== this.course?.id &&
              (course.technology === this.course?.technology ||
                course.category === this.course?.category),
          )
          .slice(0, 6);

        this.cdr.detectChanges();
      },
    });
  }

  openRelatedCourse(playlistId: string): void {
    this.router.navigate(['/learn/courses', playlistId]);
  }

  getAverageStarIcon(star: number): string {
    if (this.ratingAverage >= star) {
      return 'assets/svg/filled-star.svg';
    }

    if (this.ratingAverage >= star - 0.5) {
      return 'assets/svg/half-star.svg';
    }

    return 'assets/svg/empty-star.svg';
  }

  getUserStarIcon(star: number): string {
    return this.userRating >= star ? 'assets/svg/filled-star.svg' : 'assets/svg/empty-star.svg';
  }

  rateCourse(star: number): void {
    if (!this.course) {
      return;
    }

    if (!this.isStarted) {
      alert('Você precisa iniciar este curso antes de avaliá-lo.');

      return;
    }

    this.userRating = star;

    this.cdr.detectChanges();

    this.ratingService.create(this.course.id, star).subscribe({
      next: (response) => {
        this.userRating = response.userRating;
        this.ratingAverage = response.average;
        this.totalRatings = response.totalRatings;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnDestroy(): void {
    this.courseContextService.clear();
  }
}
