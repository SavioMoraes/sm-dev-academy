import { Component } from '@angular/core';
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

  navigationItems = navigationItems;
  categoryItems = categoryItems;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
