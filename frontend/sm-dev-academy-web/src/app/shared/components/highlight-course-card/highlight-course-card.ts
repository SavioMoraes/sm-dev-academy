import { Component, Input } from '@angular/core';

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
}