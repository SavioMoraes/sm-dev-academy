// import {
//   ChangeDetectorRef,
//   Component,
//   Input,
//   OnChanges,
//   SimpleChanges,
//   inject,
// } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RatingService } from '../../../core/services/rating-service/rating.service';

// @Component({
//   selector: 'app-course-rating',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './course-rating.html',
//   styleUrl: './course-rating.scss',
// })
// export class CourseRating implements OnChanges {
//   private readonly ratingService = inject(RatingService);
//   private readonly cdr = inject(ChangeDetectorRef);

//   @Input({ required: true })
//   courseId!: string;

//   @Input()
//   showAverage = true;

//   ratingAverage = 0;
//   totalRatings = 0;

//   readonly stars = [1, 2, 3, 4, 5];

//   ngOnChanges(changes: SimpleChanges): void {
//     if (!changes['courseId'] || !this.courseId) {
//       return;
//     }

//     this.loadRating();
//   }

//   private loadRating(): void {
//     this.ratingService.getRating(this.courseId).subscribe({
//       next: (response) => {
//         this.ratingAverage = response.average;
//         this.totalRatings = response.totalRatings;

//         this.cdr.detectChanges();
//       },

//       error: (error) => {
//         console.error(error);
//       },
//     });
//   }

//   refresh(): void {
//     this.loadRating();
//   }

//   getStarIcon(star: number): string {
//     if (this.totalRatings === 0) {
//       return 'assets/svg/empty-star.svg';
//     }

//     if (this.ratingAverage >= star) {
//       return 'assets/svg/filled-star.svg';
//     }

//     if (this.ratingAverage >= star - 0.5) {
//       return 'assets/svg/half-star.svg';
//     }

//     return 'assets/svg/empty-star.svg';
//   }
// }

import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingService } from '../../../core/services/rating-service/rating.service';

@Component({
  selector: 'app-course-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-rating.html',
  styleUrl: './course-rating.scss',
})
export class CourseRating implements OnChanges {
  private readonly ratingService = inject(RatingService);
  private readonly cdr = inject(ChangeDetectorRef);

  /**
   * Modo Course Player
   */
  @Input()
  courseId?: string;

  /**
   * Modo Batch (Track Details)
   */
  @Input()
  ratingAverage = 0;

  @Input()
  totalRatings = 0;

  @Input()
  showAverage = true;

  readonly stars = [1, 2, 3, 4, 5];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseId'] && this.courseId) {
      this.loadRating();
    }
  }

  private loadRating(): void {
    if (!this.courseId) {
      return;
    }

    this.ratingService.getRating(this.courseId).subscribe({
      next: (response) => {
        this.ratingAverage = response.average;
        this.totalRatings = response.totalRatings;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  refresh(): void {
    if (!this.courseId) {
      return;
    }

    this.loadRating();
  }

  getStarIcon(star: number): string {
    if (this.totalRatings === 0) {
      return 'assets/svg/empty-star.svg';
    }

    if (this.ratingAverage >= star) {
      return 'assets/svg/filled-star.svg';
    }

    if (this.ratingAverage >= star - 0.5) {
      return 'assets/svg/half-star.svg';
    }

    return 'assets/svg/empty-star.svg';
  }
}
