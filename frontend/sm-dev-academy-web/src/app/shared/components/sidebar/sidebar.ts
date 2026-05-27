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

  learnExpanded = true;
  technologiesExpanded = false;
  accountExpanded = true;
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

  /* MOBILE */
  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}