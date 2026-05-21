import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,

    children: [
      /* =========================================================
         HOME
      ========================================================= */

      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home')
            .then((m) => m.Home),
      },

      /* =========================================================
         BIBLIOTECA
      ========================================================= */

      {
        path: 'biblioteca/cursos',
        loadComponent: () =>
          import('./pages/biblioteca/cursos/cursos')
            .then((m) => m.Cursos),
      },

      {
        path: 'biblioteca/meus-cursos',
        loadComponent: () =>
          import('./pages/biblioteca/meus-cursos/meus-cursos')
            .then((m) => m.MeusCursos),
      },

      {
        path: 'biblioteca/favoritos',
        loadComponent: () =>
          import('./pages/biblioteca/favoritos/favoritos')
            .then((m) => m.Favoritos),
      },

      {
        path: 'biblioteca/historico',
        loadComponent: () =>
          import('./pages/biblioteca/historico/historico')
            .then((m) => m.Historico),
      },

      /* =========================================================
         TECNOLOGIAS
      ========================================================= */

      {
        path: 'tecnologias/html',
        loadComponent: () =>
          import('./pages/tecnologias/html/html')
            .then((m) => m.Html),
      },

      {
        path: 'tecnologias/css',
        loadComponent: () =>
          import('./pages/tecnologias/css/css')
            .then((m) => m.Css),
      },

      {
        path: 'tecnologias/javascript',
        loadComponent: () =>
          import('./pages/tecnologias/javascript/javascript')
            .then((m) => m.Javascript),
      },

      {
        path: 'tecnologias/typescript',
        loadComponent: () =>
          import('./pages/tecnologias/typescript/typescript')
            .then((m) => m.Typescript),
      },

      {
        path: 'tecnologias/angular',
        loadComponent: () =>
          import('./pages/tecnologias/angular/angular')
            .then((m) => m.Angular),
      },

      {
        path: 'tecnologias/react',
        loadComponent: () =>
          import('./pages/tecnologias/react/react')
            .then((m) => m.React),
      },

      {
        path: 'tecnologias/python',
        loadComponent: () =>
          import('./pages/tecnologias/python/python')
            .then((m) => m.Python),
      },

      {
        path: 'tecnologias/nodejs',
        loadComponent: () =>
          import('./pages/tecnologias/nodejs/nodejs')
            .then((m) => m.Nodejs),
      },

      {
        path: 'tecnologias/nestjs',
        loadComponent: () =>
          import('./pages/tecnologias/nestjs/nestjs')
            .then((m) => m.Nestjs),
      },

      {
        path: 'tecnologias/mongodb',
        loadComponent: () =>
          import('./pages/tecnologias/mongodb/mongodb')
            .then((m) => m.Mongodb),
      },

      {
        path: 'tecnologias/mysql',
        loadComponent: () =>
          import('./pages/tecnologias/mysql/mysql')
            .then((m) => m.Mysql),
      },

      {
        path: 'tecnologias/postgresql',
        loadComponent: () =>
          import('./pages/tecnologias/postgresql/postgresql')
            .then((m) => m.Postgresql),
      },

      /* =========================================================
         CONTA
      ========================================================= */

      {
        path: 'conta/perfil',
        loadComponent: () =>
          import('./pages/conta/perfil/perfil')
            .then((m) => m.Perfil),
      },

      /* =========================================================
         ADMIN
      ========================================================= */

      {
        path: 'admin/dashboard',
        loadComponent: () =>
          import('./pages/admin/dashboard/dashboard')
            .then((m) => m.Dashboard),
      },
    ],
  },

  /* =========================================================
     FALLBACK
  ========================================================= */

  {
    path: '**',
    redirectTo: '',
  },
];