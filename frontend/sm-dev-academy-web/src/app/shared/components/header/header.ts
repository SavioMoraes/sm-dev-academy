import { Component, HostListener, OnInit } from '@angular/core';
import { navigationItems } from '../../../core/navigation/navigation-items';
import { categoryItems } from '../../../core/navigation/category-items';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    Footer,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {

  isMobileMenuOpen = false;
  isSearchActive = false;
  isMobileOrTablet = false;

  navigationItems = navigationItems;
  categoryItems = categoryItems;

  ngOnInit(): void {
    this.checkViewport();
  }

  checkViewport(): void {
    this.isMobileOrTablet = window.innerWidth <= 1023;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleSearch(): void {
    this.isSearchActive = !this.isSearchActive;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkViewport();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (
      !target.closest('.header__search') &&
      !target.closest('.header-search-mobile')
    ) {
      this.isSearchActive = false;
    }
  }
}
