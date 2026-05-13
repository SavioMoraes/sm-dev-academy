import { Component } from '@angular/core';
import { navigationItems } from '../../../core/navigation/navigation-items';
import { categoryItems } from '../../../core/navigation/category-items';
import { footerItems } from '../../../core/navigation/footer-items';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  /* DESKTOP */
  isCollapsed = false;

  /* MOBILE */
  isMobileMenuOpen = false;

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  navigationItems = navigationItems;
  categoryItems = categoryItems;
  footerItems = footerItems;
}