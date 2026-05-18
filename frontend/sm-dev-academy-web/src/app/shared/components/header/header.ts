import { Component, HostListener } from '@angular/core';
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
export class Header {

  isMobileMenuOpen = false;
  isSearchActive = false;

  navigationItems = navigationItems;
  categoryItems = categoryItems;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleSearch(): void {
    this.isSearchActive = !this.isSearchActive;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.header__search')) {
      this.isSearchActive = false;
    }
  }
}
