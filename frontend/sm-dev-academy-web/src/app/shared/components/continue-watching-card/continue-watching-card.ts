import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-continue-watching-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './continue-watching-card.html',
  styleUrl: './continue-watching-card.scss',
})
export class ContinueWatchingCard {

  @Input({ required: true })
  course: any;

  constructor(
    private readonly router: Router,
  ) {}

  continueCourse(): void {

    if (!this.course?.playlistId) {
      return;
    }

    this.router.navigate([
      '/learn/courses',
      this.course.playlistId,
    ]);

  }

}