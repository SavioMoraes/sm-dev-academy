import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../../core/services/favorite-service/favorite.service';
import { Router } from '@angular/router';
import { PageContainer } from '../../../shared/ui/page-container/page-container';
import { ResponsiveGrid } from '../../../shared/ui/responsive-grid/responsive-grid';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    PageContainer,
    ResponsiveGrid,
  ],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites implements OnInit, AfterViewInit {
  private readonly favoriteService = inject(FavoriteService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  private readonly pageSize = 6;
  private currentPage = 1;
  private observer?: IntersectionObserver;

  @ViewChild('sentinel')
  sentinel!: ElementRef<HTMLDivElement>;

  favorites: any[] = [];
  visibleFavorites: any[] = [];

  ngOnInit(): void {
    this.loadFavorites();
  }

  ngAfterViewInit(): void {}
    
  loadFavorites(): void {
    this.favoriteService
      .getFavorites()
      .subscribe({
        next: (response) => {
          this.favorites = response;
          this.visibleFavorites =
            this.favorites.slice(
              0,
              this.pageSize,
            );
          setTimeout(() => {
            this.cdr.detectChanges();

            if (!this.observer) {
              this.createObserver();
            }
          });
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

  private createObserver(): void {
    setTimeout(() => {
      if (!this.sentinel) {
        return;
      }
      this.observer =
        new IntersectionObserver(
          (entries) => {
            if (
              !entries[0]?.isIntersecting
            ) {
              return;
            }
            this.loadMore();
          },
          {
            root: null,
            threshold: 1,
            rootMargin: '0px',
          },
        );
      this.observer.observe(
        this.sentinel.nativeElement,
      );
    });
  }

  private loadMore(): void {
    const nextPage =
      this.currentPage + 1;
    const nextItems =
      this.favorites.slice(
        0,
        nextPage * this.pageSize,
      );
    if (
      nextItems.length >
      this.visibleFavorites.length
    ) {
      setTimeout(() => {
        this.visibleFavorites =
          nextItems;
        this.currentPage =
          nextPage;
        this.cdr.detectChanges();
      }, 250);
    }
  }

  openCourse(
    playlistId: string,
  ): void {
    this.router.navigate([
      '/learn/courses',
      playlistId,
    ]);
  }

  removeFavorite(
    event: Event,
    courseId: string,
  ): void {
    event.preventDefault();
    event.stopPropagation();
    this.favorites =
      this.favorites.filter(
        favorite =>
          favorite.course.id !== courseId,
      );
    this.visibleFavorites =
      this.visibleFavorites.filter(
        favorite =>
          favorite.course.id !== courseId,
      );
    this.cdr.detectChanges();
    this.favoriteService
      .remove(courseId)
      .subscribe({
        error: (error) => {
          console.error(error);
          this.loadFavorites();
        },
      });
  }

}