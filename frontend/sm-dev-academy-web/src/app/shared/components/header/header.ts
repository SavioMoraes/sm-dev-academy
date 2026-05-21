import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    Footer,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  isMobileMenuOpen = false;
  isSearchActive = false;
  isMobileOrTablet = false;

  bibliotecaExpanded = true;
  tecnologiasExpanded = false;
  contaExpanded = true;
  adminExpanded = true;

  isAdmin = false;

  constructor(
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.checkViewport();

    this.updateExpandedSections(this.router.url);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isMobileMenuOpen = false;
        this.isSearchActive = false;

        this.updateExpandedSections(event.urlAfterRedirects);
      }
    });
  }

  checkViewport(): void {
    this.isMobileOrTablet = window.innerWidth <= 1023;

    if (!this.isMobileOrTablet) {
      this.isMobileMenuOpen = false;
      this.isSearchActive = false;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleSearch(): void {
    this.isSearchActive = !this.isSearchActive;
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
