import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIconModule,
    MatTooltipModule,
    RouterLink,
    RouterLinkActive,
    Footer
  ],
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

  // HELPERS
  private isLearnRoute(url: string): boolean {
    return url.startsWith('/learn');
  }

  private isCoursesRoute(url: string): boolean {
    return url.startsWith('/learn/courses');
  }

  private isFrontendRoute(url: string): boolean {
    return url.startsWith('/learn/courses/frontend');
  }

  private isBackendRoute(url: string): boolean {
    return url.startsWith('/learn/courses/backend');
  }

  private isDatabaseRoute(url: string): boolean {
    return url.startsWith('/learn/courses/banco-de-dados');
  }

  private isMobileRoute(url: string): boolean {
    return url.startsWith('/learn/courses/mobile');
  }

  private isDevopsRoute(url: string): boolean {
    return url.startsWith('/learn/courses/devops');
  }

  private isArtificialIntelligenceRoute(url: string): boolean {
    return url.startsWith('/learn/courses/artificial-intelligence');
  }

  private isAccountRoute(url: string): boolean {
    return url.startsWith('/account');
  }

  private isAdminRoute(url: string): boolean {
    return url.startsWith('/admin');
  }

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
    if (this.isLearnRoute(url)) {
      this.learnExpanded = true;
    }

    if (this.isAccountRoute(url)) {
      this.accountExpanded = true;
    }

    if (this.isAdminRoute(url)) {
      this.adminExpanded = true;
    }

    // if (this.isCoursesRoute(url)) {
    //   this.coursesExpanded = true;
    // }

    // if (this.isFrontendRoute(url)) {
    //   this.frontendExpanded = true;
    // }

    // if (this.isBackendRoute(url)) {
    //   this.backendExpanded = true;
    // }

    // if (this.isDatabaseRoute(url)) {
    //   this.databaseExpanded = true;
    // }

    // if (this.isMobileRoute(url)) {
    //   this.mobileExpanded = true;
    // }

    // if (this.isDevopsRoute(url)) {
    //   this.devopsExpanded = true;
    // }

    // if (this.isArtificialIntelligenceRoute(url)) {
    //   this.artificialIntelligenceExpanded = true;
    // }
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

  isCoursesActive(): boolean {
    return this.router.url === '/learn/courses';
  }

  isFrontendActive(): boolean {
    return this.router.url === '/learn/courses/frontend';
  }

  isBackendActive(): boolean {
    return this.router.url === '/learn/courses/backend';
  }

  isDatabaseActive(): boolean {
    return this.router.url === '/learn/courses/banco-de-dados';
  }

  isMobileActive(): boolean {
    return this.router.url === '/learn/courses/mobile';
  }

  isDevopsActive(): boolean {
    return this.router.url === '/learn/courses/devops';
  }

  isArtificialIntelligenceActive(): boolean {
    return this.router.url === '/learn/courses/artificial-intelligence';
  }

  isLearnParentActive(): boolean {
    return this.router.url.startsWith('/learn/');
  }

  isAccountParentActive(): boolean {
    return this.router.url.startsWith('/account/');
  }

  isAdminParentActive(): boolean {
    return this.router.url.startsWith('/admin/');
  }

  isCoursesParentActive(): boolean {
    return this.router.url.startsWith('/learn/courses/') && this.router.url !== '/learn/courses';
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
