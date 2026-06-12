import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Footer } from '../footer/footer';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { TECHNOLOGIES } from '../../../core/constants/technologies';
import { CourseContextService } from '../../../core/services/course-context-service/course-context.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, Footer],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  isMobileMenuOpen = false;
  isSearchActive = false;
  isMobileOrTablet = false;
  learnExpanded = true;
  accountExpanded = true;
  adminExpanded = true;
  coursesExpanded = false;
  frontendExpanded = false;
  backendExpanded = false;
  databaseExpanded = false;
  mobileExpanded = false;
  devopsExpanded = false;
  artificialIntelligenceExpanded = false;

  readonly technologies = TECHNOLOGIES;
  private currentCourseCategory: string | null = null;
  private currentCourseTechnology: string | null = null;

  isAdmin = false;
  isAuthenticated = false;
  userAvatarUrl?: string;
  userInitial = '';
  isProfileMenuOpen = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly courseContextService: CourseContextService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  isTechnologyRoute(category: string, technology: string): boolean {
    return this.router.url === `/learn/courses/${category}/${technology}`;
  }

  isTechnologyCourseActive(technology: string): boolean {
    return this.currentCourseTechnology?.toLowerCase() === technology.toLowerCase();
  }

  isTechnologyActive(category: string, technology: string): boolean {
    return (
      this.isTechnologyRoute(category, technology) || this.isTechnologyCourseActive(technology)
    );
  }

  ngOnInit(): void {
    this.checkViewport();

    this.updateExpandedSections(this.router.url);

    this.courseContextService.currentCourse$.subscribe((course) => {
      
      this.currentCourseCategory = course?.category ?? null;

      this.currentCourseTechnology = course?.technology ?? null;

      if (!course) {
        return;
      }

      this.learnExpanded = true;
      this.coursesExpanded = true;

      this.frontendExpanded = false;
      this.backendExpanded = false;
      this.databaseExpanded = false;
      this.mobileExpanded = false;
      this.devopsExpanded = false;
      this.artificialIntelligenceExpanded = false;

      switch (course.category) {
        case 'Frontend':
          this.frontendExpanded = true;
          break;

        case 'Backend':
          this.backendExpanded = true;
          break;

        case 'Database':
          this.databaseExpanded = true;
          break;

        case 'Mobile':
          this.mobileExpanded = true;
          break;

        case 'DevOps':
          this.devopsExpanded = true;
          break;

        case 'IA':
          this.artificialIntelligenceExpanded = true;
          break;
      }

      this.cdr.detectChanges();
    });

    const user = this.authService.getUser();

    this.isAuthenticated = !!user;

    this.isAdmin = user?.role === 'ADMIN';

    this.userAvatarUrl = user?.avatarUrl;

    this.userInitial = user?.name?.charAt(0).toUpperCase() || '';

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
    this.learnExpanded = url.includes('/learn');
    this.accountExpanded = url.includes('/account');
    this.adminExpanded = url.includes('/admin');
    // this.coursesExpanded = url.includes('/learn/courses');
    // this.frontendExpanded = url.includes('/learn/courses/frontend');
    // this.backendExpanded = url.includes('/learn/courses/backend');
    // this.databaseExpanded = url.includes('/learn/courses/banco-de-dados');
    // this.mobileExpanded = url.includes('/learn/courses/mobile');
    // this.devopsExpanded = url.includes('/learn/courses/devops');
    // this.artificialIntelligenceExpanded = url.includes('/learn/courses/artificial-intelligence');
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

      case 'database':
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

  isLearnActive(): boolean {
    return this.router.url === '/learn';
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

  @HostListener('window:resize')
  onResize(): void {
    this.checkViewport();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.header__search') && !target.closest('.header-search-mobile')) {
      this.isSearchActive = false;
    }
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.userAvatarUrl = undefined;
    this.userInitial = '';
    this.isProfileMenuOpen = false;
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  goToProfile(): void {
    this.isProfileMenuOpen = false;

    this.router.navigate(['/account/profile']);
  }

  handleLogout(): void {
    this.isProfileMenuOpen = false;
    this.logout();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.header-profile')) {
      this.isProfileMenuOpen = false;
    }
  }
}
