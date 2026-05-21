import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    Footer,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {
  /* DESKTOP */
  @Input() isCollapsed = false;

  bibliotecaExpanded = true;
  tecnologiasExpanded = false;
  contaExpanded = true;
  adminExpanded = true;
  
  /* ADMIN */
  isAdmin = false;

  constructor(
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.updateExpandedSections(this.router.url);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateExpandedSections(event.urlAfterRedirects);
      }
    });
  }

  updateExpandedSections(url: string): void {
    this.bibliotecaExpanded = url.includes('/biblioteca');
    this.tecnologiasExpanded = url.includes('/tecnologias');
    this.contaExpanded = url.includes('/conta');
    this.adminExpanded = url.includes('/admin');
  }

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
}