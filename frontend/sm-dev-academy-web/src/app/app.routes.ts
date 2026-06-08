import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';

export const routes: Routes = [
  /* =========================================================
      ACCOUNT
  ========================================================= */
  {
    path: 'account/login',
    loadComponent: () =>
      import('./features/account/login/login')
        .then((m) => m.Login),
  },

  {
    path: 'account/register',
    loadComponent: () =>
      import('./features/account/register/register')
        .then((m) => m.Register),
  },

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
         LEARN
      ========================================================= */

      {
        path: 'learn/courses',
        loadComponent: () =>
          import('./features/learn/courses/courses')
            .then((m) => m.Courses),
      },

      {
        path: 'learn/courses/frontend',
        loadComponent: () =>
          import('./features/learn/courses/frontend/frontend')
            .then((m) => m.Frontend),
      },

      {
        path: 'learn/courses/backend',
        loadComponent: () =>
          import('./features/learn/courses/backend/backend')
            .then((m) => m.Backend),
      },

      {
        path: 'learn/courses/mobile',
        loadComponent: () =>
          import('./features/learn/courses/mobile/mobile')
            .then((m) => m.Mobile),
      },

      {
        path: 'learn/courses/devops',
        loadComponent: () =>
          import('./features/learn/courses/devops/devops')
            .then((m) => m.Devops),
      },

      {
        path: 'learn/courses/artificial-intelligence',
        loadComponent: () =>
          import('./features/learn/courses/artificial-intelligence/artificial-intelligence')
            .then((m) => m.ArtificialIntelligence),
      },

      {
        path: 'learn/courses/:playlistId',
        loadComponent: () =>
          import('./features/learn/course-player/course-player')
            .then((m) => m.CoursePlayer),
      },

      {
        path: 'learn/my-courses',
        loadComponent: () =>
          import('./features/learn/my-courses/my-courses')
            .then((m) => m.MyCourses),
      },

      {
        path: 'learn/favorites',
        loadComponent: () =>
          import('./features/learn/favorites/favorites')
            .then((m) => m.Favorites),
      },

      /* =========================================================
         TECHNOLOGIES
      ========================================================= */

      {
        path: 'learn/technologies/html',
        loadComponent: () =>
          import('./features/learn/technologies/html/html')
            .then((m) => m.Html),
      },

      {
        path: 'learn/technologies/css',
        loadComponent: () =>
          import('./features/learn/technologies/css/css')
            .then((m) => m.Css),
      },

      {
        path: 'learn/technologies/javascript',
        loadComponent: () =>
          import('./features/learn/technologies/javascript/javascript')
            .then((m) => m.Javascript),
      },

      {
        path: 'learn/technologies/typescript',
        loadComponent: () =>
          import('./features/learn/technologies/typescript/typescript')
            .then((m) => m.Typescript),
      },

      {
        path: 'learn/technologies/angular',
        loadComponent: () =>
          import('./features/learn/technologies/angular/angular')
            .then((m) => m.Angular),
      },

      {
        path: 'learn/technologies/react',
        loadComponent: () =>
          import('./features/learn/technologies/react/react')
            .then((m) => m.React),
      },

      {
        path: 'learn/technologies/python',
        loadComponent: () =>
          import('./features/learn/technologies/python/python')
            .then((m) => m.Python),
      },

      {
        path: 'learn/technologies/nodejs',
        loadComponent: () =>
          import('./features/learn/technologies/nodejs/nodejs')
            .then((m) => m.Nodejs),
      },

      {
        path: 'learn/technologies/nestjs',
        loadComponent: () =>
          import('./features/learn/technologies/nestjs/nestjs')
            .then((m) => m.Nestjs),
      },

      {
        path: 'learn/technologies/mongodb',
        loadComponent: () =>
          import('./features/learn/technologies/mongodb/mongodb')
            .then((m) => m.Mongodb),
      },

      {
        path: 'learn/technologies/mysql',
        loadComponent: () =>
          import('./features/learn/technologies/mysql/mysql')
            .then((m) => m.Mysql),
      },

      {
        path: 'learn/technologies/postgresql',
        loadComponent: () =>
          import('./features/learn/technologies/postgresql/postgresql')
            .then((m) => m.Postgresql),
      },

      {
        path: 'learn/tracks',
        loadComponent: () =>
          import('./features/learn/tracks/tracks')
            .then((m) => m.Tracks),
      },

      /* =========================================================
         ACCOUNT
      ========================================================= */
      
      {
        path: 'account/profile',
        loadComponent: () =>
          import('./features/account/profile/profile')
            .then((m) => m.Profile),
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