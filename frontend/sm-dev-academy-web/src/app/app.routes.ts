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
          import('./features/home/home')
            .then((m) => m.Home),
      },

      /* =========================================================
         BIBLIOTECA
      ========================================================= */

      {
        path: 'biblioteca/cursos',
        loadComponent: () =>
          import('./features/biblioteca/cursos/cursos')
            .then((m) => m.Cursos),
      },

      {
        path: 'biblioteca/meus-cursos',
        loadComponent: () =>
          import('./features/biblioteca/meus-cursos/meus-cursos')
            .then((m) => m.MeusCursos),
      },

      {
        path: 'biblioteca/favoritos',
        loadComponent: () =>
          import('./features/biblioteca/favoritos/favoritos')
            .then((m) => m.Favoritos),
      },

      {
        path: 'biblioteca/historico',
        loadComponent: () =>
          import('./features/biblioteca/historico/historico')
            .then((m) => m.Historico),
      },

      /* =========================================================
         TECNOLOGIAS
      ========================================================= */

      {
        path: 'tecnologias/html',
        loadComponent: () =>
          import('./features/tecnologias/html/html')
            .then((m) => m.Html),
      },

      {
        path: 'tecnologias/css',
        loadComponent: () =>
          import('./features/tecnologias/css/css')
            .then((m) => m.Css),
      },

      {
        path: 'tecnologias/javascript',
        loadComponent: () =>
          import('./features/tecnologias/javascript/javascript')
            .then((m) => m.Javascript),
      },

      {
        path: 'tecnologias/typescript',
        loadComponent: () =>
          import('./features/tecnologias/typescript/typescript')
            .then((m) => m.Typescript),
      },

      {
        path: 'tecnologias/angular',
        loadComponent: () =>
          import('./features/tecnologias/angular/angular')
            .then((m) => m.Angular),
      },

      {
        path: 'tecnologias/react',
        loadComponent: () =>
          import('./features/tecnologias/react/react')
            .then((m) => m.React),
      },

      {
        path: 'tecnologias/python',
        loadComponent: () =>
          import('./features/tecnologias/python/python')
            .then((m) => m.Python),
      },

      {
        path: 'tecnologias/nodejs',
        loadComponent: () =>
          import('./features/tecnologias/nodejs/nodejs')
            .then((m) => m.Nodejs),
      },

      {
        path: 'tecnologias/nestjs',
        loadComponent: () =>
          import('./features/tecnologias/nestjs/nestjs')
            .then((m) => m.Nestjs),
      },

      {
        path: 'tecnologias/mongodb',
        loadComponent: () =>
          import('./features/tecnologias/mongodb/mongodb')
            .then((m) => m.Mongodb),
      },

      {
        path: 'tecnologias/mysql',
        loadComponent: () =>
          import('./features/tecnologias/mysql/mysql')
            .then((m) => m.Mysql),
      },

      {
        path: 'tecnologias/postgresql',
        loadComponent: () =>
          import('./features/tecnologias/postgresql/postgresql')
            .then((m) => m.Postgresql),
      },

      /* =========================================================
         CONTA
      ========================================================= */

      {
        path: 'conta/perfil',
        loadComponent: () =>
          import('./features/conta/perfil/perfil')
            .then((m) => m.Perfil),
      },

      /* =========================================================
         ADMIN
      ========================================================= */

      {
        path: 'admin/dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard')
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