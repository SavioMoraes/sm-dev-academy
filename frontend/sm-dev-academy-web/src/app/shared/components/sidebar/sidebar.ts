import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterLinkActive, Footer],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {
  /* DESKTOP */
  @Input() isCollapsed = false;

  learnExpanded = true;
  coursesExpanded = false;
  frontendExpanded = false;
  backendExpanded = false;
  databaseExpanded = false;
  mobileExpanded = false;
  devopsExpanded = false;
  artificialIntelligenceExpanded = false;
  accountExpanded = true;
  adminExpanded = true;

  /* ADMIN */
  isAdmin = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.updateExpandedSections(this.router.url);
    const user = this.authService.getUser();
    this.isAdmin = user?.role === 'ADMIN';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateExpandedSections(event.urlAfterRedirects);
      }
    });
  }

  private updateExpandedSections(url: string): void {
    this.learnExpanded = url.includes('/learn');
    this.accountExpanded = url.includes('/account');
    this.adminExpanded = url.includes('/admin');
  }

  toggleSection(section: string): void {
    switch (section) {
      case 'learn':
        this.learnExpanded = !this.learnExpanded;
        break;

      case 'courses':
        this.coursesExpanded = !this.coursesExpanded;
        break;

      case 'frontend':
        this.frontendExpanded = !this.frontendExpanded;
        break;

      case 'backend':
        this.backendExpanded = !this.backendExpanded;
        break;

      case 'banco-de-dados':
        this.databaseExpanded = !this.databaseExpanded;
        break;

      case 'mobile':
        this.mobileExpanded = !this.mobileExpanded;
        break;

      case 'devops':
        this.devopsExpanded = !this.devopsExpanded;
        break;

      case 'artificial-intelligence':
        this.artificialIntelligenceExpanded = !this.artificialIntelligenceExpanded;
        break;

      case 'account':
        this.accountExpanded = !this.accountExpanded;
        break;

      case 'admin':
        this.adminExpanded = !this.adminExpanded;
        break;
    }
  }

  isCoursesParentActive(): boolean {
    return this.router.url.startsWith('/learn/courses/')
      && this.router.url !== '/learn/courses';
  }

  isFrontendParentActive(): boolean {
    return this.router.url.startsWith('/learn/courses/frontend/');
  }

  isBackendParentActive(): boolean {
    return this.router.url.startsWith('/learn/courses/backend/');
  }

  isDatabaseParentActive(): boolean {
    return this.router.url.startsWith('/learn/courses/banco-de-dados/');
  }

  isMobileParentActive(): boolean {
    return this.router.url.startsWith('/learn/courses/mobile/');
  }

  isDevopsParentActive(): boolean {
    return this.router.url.startsWith('/learn/courses/devops/');
  }

  isArtificialIntelligenceParentActive(): boolean {
    return this.router.url.startsWith('/learn/courses/artificial-intelligence/');
  }

  /* MOBILE */
  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
