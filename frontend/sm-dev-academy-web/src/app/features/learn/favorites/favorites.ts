import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../../core/services/favorite-service/favorite.service';
import { HighlightCourseCard } from '../../../shared/components/highlight-course-card/highlight-course-card';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    HighlightCourseCard,
  ],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites implements OnInit {
  private readonly favoriteService = inject(FavoriteService);
  private readonly cdr = inject(ChangeDetectorRef);

  favorites: any[] = [];

  ngOnInit(): void {
    this.favoriteService
      .getFavorites()
      .subscribe({
        next: (response) => {
          this.favorites = response;
          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

}