import { Component } from '@angular/core';
import { navigationItems } from '../../../core/navigation/navigation-items';
import { categoryItems } from '../../../core/navigation/category-items';
import { footerItems } from '../../../core/navigation/footer-items';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  isMobileMenuOpen = false;

  navigationItems = navigationItems;
  categoryItems = categoryItems;
  footerItems = footerItems;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
