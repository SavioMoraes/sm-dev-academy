import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  /* DESKTOP */
  isCollapsed = false;

  /* MOBILE */
  isMobileMenuOpen = false;

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  navigationItems = [
    {
      label: 'Início',
      route: '/',
    },
    {
      label: 'Cursos',
      route: '/courses',
    },
    {
      label: 'Meus Cursos',
      route: '/my-courses',
    },
    {
      label: 'Favoritos',
      route: '/favorites',
    },
    {
      label: 'Histórico',
      route: '/history',
    },
    {
      label: 'Perfil',
      route: '/profile',
    },
    {
      label: 'Admin',
      route: '/admin',
    },
  ];

  categoryItems = [
    {
      label: 'Angular',
      route: '/categories/angular',
    },
    {
      label: 'TypeScript',
      route: '/categories/typescript',
    },
    {
      label: 'Node.js',
      route: '/categories/nodejs',
    },
    {
      label: 'NestJS',
      route: '/categories/nestjs',
    },
    {
      label: 'Banco de Dados',
      route: '/categories/database',
    },
    {
      label: 'Carreira Dev',
      route: '/categories/career',
    },
  ];

  footerItems = [
    {
      label: 'Portfólio',
      route: '/',
    },
    {
      label: 'GitHub',
      route: '/',
    },
    {
      label: 'LinkedIn',
      route: '/',
    },
  ];
}