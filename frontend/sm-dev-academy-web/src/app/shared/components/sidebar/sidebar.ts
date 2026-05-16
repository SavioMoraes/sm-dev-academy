import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { navigationItems } from '../../../core/navigation/navigation-items';
import { categoryItems } from '../../../core/navigation/category-items';
import { footerItems } from '../../../core/navigation/footer-items';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  @Input() isCollapsed = false;

  /* MOBILE */
  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  navigationItems = navigationItems;
  categoryItems = categoryItems;
  footerItems = footerItems;

}