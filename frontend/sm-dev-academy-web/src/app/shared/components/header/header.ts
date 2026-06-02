import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Footer } from '../footer/footer';
import { AuthService } from '../../../core/services/auth-service/auth.service';


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

  learnExpanded = true;
  technologiesExpanded = false;
  accountExpanded = true;
  adminExpanded = true;

  isAdmin = false;
  isAuthenticated = false;
  userAvatarUrl?: string;
  userInitial = '';
  isProfileMenuOpen = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.checkViewport();

    this.updateExpandedSections(this.router.url);

    const user =
      this.authService.getUser();

    this.isAuthenticated =
      !!user;

    this.isAdmin =
      user?.role === 'ADMIN';

    this.userAvatarUrl =
      user?.avatarUrl;

    this.userInitial =
      user?.name?.charAt(0).toUpperCase() || '';

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
    this.technologiesExpanded = url.includes('/technologies');
    this.accountExpanded = url.includes('/account');
    this.adminExpanded = url.includes('/admin');
  }

  toggleSection(section: string): void {
    switch (section) {
      case 'learn':
        this.learnExpanded = !this.learnExpanded;
        break;
      case 'technologies':
        this.technologiesExpanded = !this.technologiesExpanded;
        break;
      case 'account':
        this.accountExpanded = !this.accountExpanded;
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

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.userAvatarUrl = undefined;
    this.userInitial = '';
    this.isProfileMenuOpen = false;
  }

  toggleProfileMenu(): void {

    this.isProfileMenuOpen =
      !this.isProfileMenuOpen;

  }

  goToProfile(): void {

    this.isProfileMenuOpen =
      false;

    this.router.navigate([
      '/account/profile',
    ]);

  }

  handleLogout(): void {
    this.isProfileMenuOpen = false;
    this.logout();
  }

  @HostListener(
    'document:click',
    ['$event'],
  )
  onDocumentClick(
    event: MouseEvent,
  ): void {

    const target =
      event.target as HTMLElement;

    if (
      !target.closest('.header-profile')
    ) {

      this.isProfileMenuOpen =
        false;

    }

  }
}
