import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stream-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stream-section.html',
  styleUrl: './stream-section.scss',
})
export class StreamSection {

  @Input() title: string = '';
  @Input() subtitle: string = '';

  @ViewChild('scrollContainer')
  private scrollContainer?: ElementRef<HTMLDivElement>;

  protected canScrollLeft = false;
  protected canScrollRight = true;


  scrollLeft(): void {

    this.scrollContainer?.nativeElement.scrollBy({
      left: -1200,
      behavior: 'smooth',
    });

    setTimeout(() => this.updateArrows(), 400);

  }

  scrollRight(): void {

    this.scrollContainer?.nativeElement.scrollBy({
      left: 1200,
      behavior: 'smooth',
    });

    setTimeout(() => this.updateArrows(), 400);

  }

  private updateArrows(): void {

    const container = this.scrollContainer?.nativeElement;

    if (!container) {
      return;
    }

    this.canScrollLeft =
      container.scrollLeft > 5;

    this.canScrollRight =
      container.scrollLeft <
      container.scrollWidth -
      container.clientWidth -
      5;

  }

}