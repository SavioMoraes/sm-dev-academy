import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Footer } from '../footer/footer';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { TECHNOLOGIES } from '../../../core/constants/technologies';
import { CourseContextService } from '../../../core/services/course-context-service/course-context.service';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../../core/services/course-service/course.service';
import { Course } from '../../../core/interfaces/course.interface';
import { NotificationService } from '../../../core/services/notification-service/notification.service';
import { Notification } from '../../../core/interfaces/notification.interface';
import { NotificationSocketService } from '../../../core/services/notification-socket-service/notification-socket.service';
import { NavigationHistoryService } from '../../../core/services/navigation-history-service/navigation-history.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, Footer, FormsModule],
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

  searchTerm = '';
  searchResults: Course[] = [];
  isSearchDropdownOpen = false;

  notifications: Notification[] = [];
  isNotificationsOpen = false;

  selectionMode = false;
  selectedNotificationIds = new Set<string>();

  get unreadNotificationsCount(): number {
    return this.notifications.filter((notification) => !notification.read).length;
  }

  get todayNotifications(): Notification[] {
    const today = new Date();

    return this.notifications.filter((notification) => {
      const date = new Date(notification.createdAt);

      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    });
  }

  get yesterdayNotifications(): Notification[] {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return this.notifications.filter((notification) => {
      const date = new Date(notification.createdAt);

      return (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
      );
    });
  }

  get olderNotifications(): Notification[] {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return this.notifications.filter((notification) => {
      const date = new Date(notification.createdAt);

      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      const isYesterday =
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();

      return !isToday && !isYesterday;
    });
  }

  get allNotificationsSelected(): boolean {
    return (
      this.notifications.length > 0 &&
      this.selectedNotificationIds.size === this.notifications.length
    );
  }

  get hasSelectedNotifications(): boolean {
    return this.selectedNotificationIds.size > 0;
  }

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly courseContextService: CourseContextService,
    private readonly courseService: CourseService,
    private readonly cdr: ChangeDetectorRef,
    private readonly notificationService: NotificationService,
    private readonly notificationSocketService: NotificationSocketService,
    private readonly navigationHistoryService: NavigationHistoryService,
  ) {}

  isTechnologyRoute(category: string, technology: string): boolean {
    return this.router.url === `/learn/courses/${category}/${technology}`;
  }

  isTechnologyCourseActive(technology: string): boolean {
    const normalize = (value: string | null | undefined): string =>
      (value ?? '')
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('-', '')
        .replaceAll('/', '')
        .replaceAll(' ', '');

    return normalize(this.currentCourseTechnology) === normalize(technology);
  }

  isTechnologyActive(category: string, technology: string): boolean {
    return (
      this.isTechnologyRoute(category, technology) || this.isTechnologyCourseActive(technology)
    );
  }

  ngOnInit(): void {
    this.checkViewport();
    this.updateExpandedSections(this.router.url);

    window.addEventListener('notifications-updated', () => {
      this.loadNotifications();
    });

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

    if (this.isAuthenticated) {
      this.loadNotifications();
    }

    this.notificationSocketService.connect();

    this.notificationSocketService.onNotificationCreated(() => {
      this.loadNotifications();
    });

    this.notificationSocketService.onNotificationUpdated(() => {
      this.loadNotifications();
    });

    this.notificationSocketService.onNotificationDeleted(() => {
      this.loadNotifications();
    });

    this.authService.authState$.subscribe(() => {
      const user = this.authService.getUser();

      this.isAuthenticated = !!user;
      this.isAdmin = user?.role === 'ADMIN';
      this.userAvatarUrl = user?.avatarUrl;
      this.userInitial = user?.name?.charAt(0).toUpperCase() || '';

      if (this.isAuthenticated) {
        this.loadNotifications();
      } else {
        this.notifications = [];
      }

      this.cdr.detectChanges();
    });

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

    if (this.isSearchActive) {
      setTimeout(() => {
        const input = document.querySelector(
          '.header__search-input, .header-search-mobile__input',
        ) as HTMLInputElement | null;

        input?.focus();
      });
    } else {
      this.searchTerm = '';
      this.searchResults = [];
      this.isSearchDropdownOpen = false;
    }
  }

  updateExpandedSections(url: string): void {
    this.learnExpanded = url.includes('/learn');
    this.accountExpanded = url.includes('/account');
    this.adminExpanded = url.includes('/admin');
    this.coursesExpanded = url.startsWith('/learn/courses/');
    this.frontendExpanded = url.startsWith('/learn/courses/frontend/');
    this.backendExpanded = url.startsWith('/learn/courses/backend/');
    this.databaseExpanded = url.startsWith('/learn/courses/banco-de-dados/');
    this.mobileExpanded = url.startsWith('/learn/courses/mobile/');
    this.devopsExpanded = url.startsWith('/learn/courses/devops/');
    this.artificialIntelligenceExpanded = url.startsWith('/learn/courses/artificial-intelligence/');
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

  onSearchInput(): void {
    const term = this.searchTerm.trim();

    if (term.length < 3) {
      this.searchResults = [];
      this.isSearchDropdownOpen = false;
      this.cdr.detectChanges();
      return;
    }

    this.courseService.searchCourses(term).subscribe({
      next: (courses) => {
        this.searchResults = courses;
        this.isSearchDropdownOpen = true;
        this.cdr.detectChanges();
      },
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchResults = [];
    this.isSearchDropdownOpen = false;
  }

  openCourse(course: Course): void {
    this.router.navigate(['/learn/courses', course.playlistId]);
    this.clearSearch();
  }

  submitSearch(): void {
    this.searchTerm = '';

    setTimeout(() => {
      const input = document.querySelector(
        '.header__search-input, .header-search-mobile__input',
      ) as HTMLInputElement | null;

      input?.focus();
    });
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
      this.searchResults = [];
      this.isSearchDropdownOpen = false;
      this.searchTerm = '';
    }

    if (!target.closest('.header-profile')) {
      this.isProfileMenuOpen = false;
    }

    if (!target.closest('.header-notifications')) {
      this.isNotificationsOpen = false;
    }
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.userAvatarUrl = undefined;
    this.userInitial = '';
    this.isProfileMenuOpen = false;
    this.router.navigate(['/']);
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

  loadNotifications(): void {
    if (!this.isAuthenticated) {
      this.notifications = [];
      return;
    }

    this.notificationService.getNotifications().subscribe({
      next: (notifications) => {
        this.notifications = notifications;
        this.selectedNotificationIds.clear();
        this.selectionMode = false;
        this.cdr.detectChanges();
      },
    });
  }

  toggleNotifications(): void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }

  toggleSelectionMode(): void {
    this.selectionMode = !this.selectionMode;

    if (!this.selectionMode) {
      this.selectedNotificationIds.clear();
    }
  }

  toggleNotificationSelection(notificationId: string): void {
    if (this.selectedNotificationIds.has(notificationId)) {
      this.selectedNotificationIds.delete(notificationId);
    } else {
      this.selectedNotificationIds.add(notificationId);
    }
  }

  toggleSelectAllNotifications(): void {
    if (this.allNotificationsSelected) {
      this.selectedNotificationIds.clear();
      return;
    }

    this.selectedNotificationIds.clear();

    this.notifications.forEach((notification) => {
      this.selectedNotificationIds.add(notification.id);
    });
  }

  deleteSelectedNotifications(): void {
    if (!this.selectedNotificationIds.size) {
      return;
    }

    const ids = [...this.selectedNotificationIds];
    const previousNotifications = [...this.notifications];

    this.notifications = this.notifications.filter(
      (notification) => !this.selectedNotificationIds.has(notification.id),
    );

    this.selectedNotificationIds.clear();
    this.selectionMode = false;

    this.cdr.detectChanges();

    this.notificationService.deleteNotifications(ids).subscribe({
      error: () => {
        this.notifications = previousNotifications;
        this.cdr.detectChanges();
      },
    });
  }

  getRelativeDate(date: string): string {
    const createdAt = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - createdAt.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 60) {
      if (diffMinutes <= 1) {
        return '1 minuto';
      }

      return `${diffMinutes} minutos`;
    }

    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours < 24) {
      if (diffHours <= 1) {
        return 'há 1 hora';
      }

      return `há ${diffHours} horas`;
    }

    const diffDays = Math.floor(diffHours / 24);

    if (diffDays <= 1) {
      return 'há 1 dia';
    }

    return `há ${diffDays} dias`;
  }

  openNotificationCourse(notification: Notification): void {
    if (!notification.read) {
      notification.read = true;
      this.notificationService.markAsRead(notification.id).subscribe();
    }

    this.isNotificationsOpen = false;

    if (!notification.playlistId) {
      this.router.navigate(['/not-found']);
      return;
    }

    this.router.navigate(['/learn/courses', notification.playlistId]);
  }

  markNotificationAsRead(notification: Notification): void {
    if (notification.read) {
      return;
    }

    notification.read = true;
    this.cdr.detectChanges();

    this.notificationService.markAsRead(notification.id).subscribe({
      error: () => {
        notification.read = false;
        this.cdr.detectChanges();
      },
    });
  }

  deleteNotification(notificationId: string, event: Event): void {
    event.stopPropagation();
    const previousNotifications = [...this.notifications];

    this.notifications = this.notifications.filter(
      (notification) => notification.id !== notificationId,
    );

    this.cdr.detectChanges();

    this.selectedNotificationIds.delete(notificationId);

    this.notificationService.deleteNotification(notificationId).subscribe({
      error: () => {
        this.notifications = previousNotifications;
        this.cdr.detectChanges();
      },
    });
  }

  toggleNotificationReadStatus(notification: Notification): void {
    const previousValue = notification.read;
    notification.read = !notification.read;
    this.cdr.detectChanges();

    const request = notification.read
      ? this.notificationService.markAsRead(notification.id)
      : this.notificationService.markAsUnread(notification.id);

    request.subscribe({
      error: () => {
        notification.read = previousValue;
        this.cdr.detectChanges();
      },
    });
  }

  ngOnDestroy(): void {
    this.courseContextService.clear();
  }
}
