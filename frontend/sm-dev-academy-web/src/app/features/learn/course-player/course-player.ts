import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PageContainer } from '../../../shared/ui/page-container/page-container';
import { Course, CourseVideo } from '../../../core/interfaces/course.interface';
import { CourseService } from '../../../core/services/course-service/course.service';

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

  course?: Course;
  selectedVideo?: CourseVideo;
  videoUrl?: SafeResourceUrl;

  ngOnInit(): void {
    const playlistId = this.route.snapshot.paramMap.get('playlistId');

    if (!playlistId) {
      return;
    }

    this.courseService
      .getCourseByPlaylistId(playlistId)
      .subscribe({
        next: (response) => {
          this.course = response;
          this.cdr.detectChanges();

          if (this.course.videos?.length) {
            this.selectVideo(this.course.videos[0]);
          }

          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error(error);
        },
      });

  }

  selectVideo(video: CourseVideo): void {
    this.selectedVideo = video;
    const url = `https://www.youtube.com/embed/${video.videoId}?**?controls=0**`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  favoriteCourse(): void {
    console.log(
      'Favoritar:',
      this.course?.playlistId,
    );
  }

}