import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  DomSanitizer,
  SafeResourceUrl,
} from '@angular/platform-browser';

import { VideoService } from '../../core/services/video.service';

@Component({
  selector: 'app-test-video',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './test-video.html',
  styleUrl: './test-video.scss',
})
export class TestVideo implements OnInit {

  private readonly videoService = inject(VideoService);

  private readonly sanitizer = inject(DomSanitizer);

  private readonly cdr = inject(ChangeDetectorRef);

  videos: any[] = [];

  isLoading = false;

  nextPageToken = '';

  selectedVideoUrl: SafeResourceUrl | null = null;

  ngOnInit(): void {

    this.loadVideos();

  }

  loadVideos(): void {

    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.videoService
      .searchVideos(
        'react tutorial',
        this.nextPageToken,
      )
      .subscribe((response) => {

        this.videos = [
          ...this.videos,
          ...response.videos,
        ];

        this.nextPageToken = response.nextPageToken;

        this.isLoading = false;

        this.cdr.detectChanges();

      });

  }

  selectVideo(videoId: string): void {

    this.selectedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`,
    );

  }

  onScroll(event: Event): void {

    const element =
      event.target as HTMLElement;

    const threshold =
      element.scrollHeight
      - element.clientHeight
      - 1200;

    if (
      element.scrollTop >= threshold
      && !this.isLoading
    ) {

      this.loadVideos();

    }

  }

}