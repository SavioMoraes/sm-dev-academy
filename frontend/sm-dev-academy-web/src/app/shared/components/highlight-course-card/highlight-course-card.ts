import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-highlight-course-card',
  standalone: true,
  imports: [],
  templateUrl: './highlight-course-card.html',
  styleUrl: './highlight-course-card.scss',
})
export class HighlightCourseCard {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() image: string = '';
  @Input() category: string = '';
  @Input() playlistId: string = '';

  constructor(
    private readonly router: Router,
  ) {}

  openCourse(): void {

    if (!this.playlistId) {
      return;
    }

    this.router.navigate([
      '/learn/courses',
      this.playlistId,
    ]);

  }

}