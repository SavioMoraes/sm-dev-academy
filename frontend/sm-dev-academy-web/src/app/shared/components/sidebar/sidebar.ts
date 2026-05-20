import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Footer } from '../footer/footer';
import { navigationItems } from '../../../core/navigation/navigation-items';
import { categoryItems } from '../../../core/navigation/category-items';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIconModule,
    Footer,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  /* DESKTOP */
  @Input() isCollapsed = false;

  bibliotecaExpanded = true;
  tecnologiasExpanded = false;
  contaExpanded = true;
  adminExpanded = true;

  toggleSection(section: string): void {
    switch (section) {
      case 'biblioteca':
        this.bibliotecaExpanded = !this.bibliotecaExpanded;
        break;

      case 'tecnologias':
        this.tecnologiasExpanded = !this.tecnologiasExpanded;
        break;

      case 'conta':
        this.contaExpanded = !this.contaExpanded;
        break;

      case 'admin':
        this.adminExpanded = !this.adminExpanded;
        break;
    }
  }

  /* MOBILE */
  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  navigationItems = navigationItems;
  categoryItems = categoryItems;

  /* ADMIN */
  isAdmin = false;
}