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

      /* =========================================================
         LEARN/COURSES
      ========================================================= */

      {
        path: 'learn/courses',
        loadComponent: () =>
          import('./features/learn/courses/courses')
            .then((m) => m.Courses),
      },

      /* =========================================================
         LEARN/COURSES/CATEGORIES
      ========================================================= */

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

      /* =========================================================
         LEARN/COURSES/CATEGORIES/TECHNOLOGIES
      ========================================================= */

      /* =========================================================
         FRONTEND
      ========================================================= */

      {
        path: 'learn/courses/frontend/html',
        loadComponent: () =>
          import('./features/learn/courses/frontend/html/html')
            .then((m) => m.Html),
      },

      {
        path: 'learn/courses/frontend/css',
        loadComponent: () =>
          import('./features/learn/courses/frontend/css/css')
            .then((m) => m.Css),
      },

      {
        path: 'learn/courses/frontend/javascript',
        loadComponent: () =>
          import('./features/learn/courses/frontend/javascript/javascript')
            .then((m) => m.Javascript),
      },

      {
        path: 'learn/courses/frontend/typescript',
        loadComponent: () =>
          import('./features/learn/courses/frontend/typescript/typescript')
            .then((m) => m.Typescript),
      },

      {
        path: 'learn/courses/frontend/angular',
        loadComponent: () =>
          import('./features/learn/courses/frontend/angular/angular')
            .then((m) => m.Angular),
      },

      {
        path: 'learn/courses/frontend/react',
        loadComponent: () =>
          import('./features/learn/courses/frontend/react/react')
            .then((m) => m.React),
      },

      {
        path: 'learn/courses/frontend/scss',
        loadComponent: () =>
          import('./features/learn/courses/frontend/scss/scss')
            .then((m) => m.Scss),
      },

      {
        path: 'learn/courses/frontend/styled-components',
        loadComponent: () =>
          import('./features/learn/courses/frontend/styled-components/styled-components')
            .then((m) => m.StyledComponents),
      },

      {
        path: 'learn/courses/frontend/tailwind',
        loadComponent: () =>
          import('./features/learn/courses/frontend/tailwind/tailwind')
            .then((m) => m.Tailwind),
      },

      {
        path: 'learn/courses/frontend/bootstrap',
        loadComponent: () =>
          import('./features/learn/courses/frontend/bootstrap/bootstrap')
            .then((m) => m.Bootstrap),
      },

      {
        path: 'learn/courses/frontend/vue',
        loadComponent: () =>
          import('./features/learn/courses/frontend/vue/vue')
            .then((m) => m.Vue),
      },

      /* =========================================================
         BACKEND
      ========================================================= */

      {
        path: 'learn/courses/backend/python',
        loadComponent: () =>
          import('./features/learn/courses/backend/python/python')
            .then((m) => m.Python),
      },

      {
        path: 'learn/courses/backend/nodejs',
        loadComponent: () =>
          import('./features/learn/courses/backend/nodejs/nodejs')
            .then((m) => m.Nodejs),
      },

      {
        path: 'learn/courses/backend/nestjs',
        loadComponent: () =>
          import('./features/learn/courses/backend/nestjs/nestjs')
            .then((m) => m.Nestjs),
      },

      {
        path: 'learn/courses/backend/java',
        loadComponent: () =>
          import('./features/learn/courses/backend/java/java')
            .then((m) => m.Java),
      },

      {
        path: 'learn/courses/backend/dotnet',
        loadComponent: () =>
          import('./features/learn/courses/backend/dot-net/dot-net')
            .then((m) => m.DotNet),
      },

      {
        path: 'learn/courses/backend/php',
        loadComponent: () =>
          import('./features/learn/courses/backend/php/php')
            .then((m) => m.Php),
      },

      /* =========================================================
         BANCO DE DADOS
      ========================================================= */

      {
        path: 'learn/courses/banco-de-dados/mongodb',
        loadComponent: () =>
          import('./features/learn/courses/banco-de-dados/mongodb/mongodb')
            .then((m) => m.Mongodb),
      },

      {
        path: 'learn/courses/banco-de-dados/mysql',
        loadComponent: () =>
          import('./features/learn/courses/banco-de-dados/mysql/mysql')
            .then((m) => m.Mysql),
      },

      {
        path: 'learn/courses/banco-de-dados/postgresql',
        loadComponent: () =>
          import('./features/learn/courses/banco-de-dados/postgresql/postgresql')
            .then((m) => m.Postgresql),
      },

      {
        path: 'learn/courses/banco-de-dados/sql-server',
        loadComponent: () =>
          import('./features/learn/courses/banco-de-dados/sql-server/sql-server')
            .then((m) => m.SqlServer),
      },

      /* =========================================================
         MOBILE
      ========================================================= */

      {
        path: 'learn/courses/mobile/react-native',
        loadComponent: () =>
          import('./features/learn/courses/mobile/react-native/react-native')
            .then((m) => m.ReactNative),
      },

      {
        path: 'learn/courses/mobile/flutter',
        loadComponent: () =>
          import('./features/learn/courses/mobile/flutter/flutter')
            .then((m) => m.Flutter),
      },

      /* =========================================================
         DEVOPS
      ========================================================= */

      {
        path: 'learn/courses/devops/docker',
        loadComponent: () =>
          import('./features/learn/courses/devops/docker/docker')
            .then((m) => m.Docker),
      },

      {
        path: 'learn/courses/devops/aws',
        loadComponent: () =>
          import('./features/learn/courses/devops/aws/aws')
            .then((m) => m.Aws),
      },

      {
        path: 'learn/courses/devops/azure',
        loadComponent: () =>
          import('./features/learn/courses/devops/azure/azure')
            .then((m) => m.Azure),
      },

      {
        path: 'learn/courses/devops/ci-cd',
        loadComponent: () =>
          import('./features/learn/courses/devops/ci-cd/ci-cd')
            .then((m) => m.CiCd),
      },

      {
        path: 'learn/courses/devops/git',
        loadComponent: () =>
          import('./features/learn/courses/devops/git/git')
            .then((m) => m.Git),
      },

      {
        path: 'learn/courses/devops/git-hub',
        loadComponent: () =>
          import('./features/learn/courses/devops/git-hub/git-hub')
            .then((m) => m.GitHub),
      },

      {
        path: 'learn/courses/devops/kubernetes',
        loadComponent: () =>
          import('./features/learn/courses/devops/kubernetes/kubernetes')
            .then((m) => m.Kubernetes),
      },

      /* =========================================================
         ARTIFICIAL INTELLIGENCE
      ========================================================= */

      {
        path: 'learn/courses/artificial-intelligence/chat-gpt',
        loadComponent: () =>
          import('./features/learn/courses/artificial-intelligence/chat-gpt/chat-gpt')
            .then((m) => m.ChatGpt),
      },

      {
        path: 'learn/courses/artificial-intelligence/deep-seek',
        loadComponent: () =>
          import('./features/learn/courses/artificial-intelligence/deep-seek/deep-seek')
            .then((m) => m.DeepSeek),
      },

      /* =========================================================
         PLAY LIST ID
      ========================================================= */

      {
        path: 'learn/courses/:playlistId',
        loadComponent: () =>
          import('./features/learn/course-player/course-player')
            .then((m) => m.CoursePlayer),
      },

      /* =========================================================
         MY COURSES
      ========================================================= */

      {
        path: 'learn/my-courses',
        loadComponent: () =>
          import('./features/learn/my-courses/my-courses')
            .then((m) => m.MyCourses),
      },

      /* =========================================================
         FAVORITES
      ========================================================= */

      {
        path: 'learn/favorites',
        loadComponent: () =>
          import('./features/learn/favorites/favorites')
            .then((m) => m.Favorites),
      },  
      
      /* =========================================================
         TRACKS
      ========================================================= */

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