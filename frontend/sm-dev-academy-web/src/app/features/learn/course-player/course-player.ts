import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PageContainer } from '../../../shared/ui/page-container/page-container';
import { Course, CourseVideo } from '../../../core/interfaces/course.interface';
import { CourseService } from '../../../core/services/course-service/course.service';
import { FavoriteService } from '../../../core/services/favorite-service/favorite.service';
import { MyCourseService } from '../../../core/services/my-course-service/my-course.service';

@Component({
  selector: 'app-course-player',
  standalone: true,
  imports: [
    CommonModule,
    PageContainer,
  ],
  templateUrl: './course-player.html',
  styleUrl: './course-player.scss',
})
export class CoursePlayer implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly courseService = inject(CourseService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly favoriteService = inject(FavoriteService);
  private readonly myCourseService = inject(MyCourseService);

  course?: Course;
  selectedVideo?: CourseVideo;
  videoUrl?: SafeResourceUrl;
  isFavorite = false;
  isStarted = false;

  ngOnInit(): void {

    const playlistId =
      this.route.snapshot.paramMap.get(
        'playlistId',
      );

    if (!playlistId) {
      return;
    }

    this.courseService
      .getCourseByPlaylistId(
        playlistId,
      )
      .subscribe({

        next: (response) => {
          

          this.course =
            response;

          this.cdr.detectChanges();

          this.myCourseService
            .check(this.course.id)
            .subscribe({

              next: (response) => {

                this.isStarted =
                  response.isStarted;

                if (
                  this.isStarted &&
                  this.course?.videos?.length
                ) {

                  this.selectVideo(
                    this.course.videos[0],
                  );

                }

                this.cdr.detectChanges();

              },

              error: (error) => {

                console.error(
                  error,
                );

              },

            });

          this.favoriteService
            .check(this.course.id)
            .subscribe({

              next: (response) => {

                this.isFavorite =
                  response.isFavorite;

                this.cdr.detectChanges();

              },

              error: (error) => {

                console.error(
                  error,
                );

              },

            });          
            
          },
          
          error: (error) => {
            
            console.error(
              error,
            );
            
          },
          
        });

  }

  selectVideo(video: CourseVideo): void {
    this.selectedVideo = video;
    const url = `https://www.youtube.com/embed/${video.videoId}?controls=0`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  favoriteCourse(): void {

    if (!this.course) {
      return;
    }

    if (this.isFavorite) {
      this.favoriteService
        .remove(this.course.id)
        .subscribe({
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

    this.favoriteService
      .create(this.course.id)
      .subscribe({
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

    this.myCourseService
      .create(this.course.id)
      .subscribe({

        next: () => {

          this.isStarted = true;

          const firstVideo =
            this.course?.videos?.[0];

          if (firstVideo) {

            this.selectVideo(
              firstVideo,
            );

          }

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            error,
          );

        },

      });

  }

  handleVideoClick(
    video: CourseVideo,
  ): void {

    if (!this.isStarted) {
      alert(
        'Inicie o curso para assistir às aulas.',
      );
      return;
    }

    this.selectVideo(
      video,
    );
  }

}