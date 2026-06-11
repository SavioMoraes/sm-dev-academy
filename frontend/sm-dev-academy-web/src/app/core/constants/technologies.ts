import { Technology } from '../interfaces/technology.interface';

export const TECHNOLOGIES = {

  frontend: <Technology[]>[
    {
      label: 'HTML',
      slug: 'html',
      icon: 'assets/svg/html5.svg',
    },
    {
      label: 'CSS',
      slug: 'css',
      icon: 'assets/svg/css.svg',
    },
    {
      label: 'SCSS',
      slug: 'scss',
      icon: 'assets/svg/scss.svg',
    },
    {
      label: 'Styled Components',
      slug: 'styled-components',
      icon: 'assets/svg/styledcomponents.svg',
    },
    {
      label: 'Tailwind',
      slug: 'tailwind',
      icon: 'assets/svg/tailwindcss.svg',
    },
    {
      label: 'Bootstrap',
      slug: 'bootstrap',
      icon: 'assets/svg/bootstrap.svg',
    },
    {
      label: 'JavaScript',
      slug: 'javascript',
      icon: 'assets/svg/javascript.svg',
    },
    {
      label: 'TypeScript',
      slug: 'typescript',
      icon: 'assets/svg/typescript.svg',
    },
    {
      label: 'React',
      slug: 'react',
      icon: 'assets/svg/react.svg',
    },
    {
      label: 'Angular',
      slug: 'angular',
      icon: 'assets/svg/angular.svg',
    },
    {
      label: 'Vue',
      slug: 'vue',
      icon: 'assets/svg/vue.svg',
    },
  ],

  backend: <Technology[]>[
    {
      label: 'Python',
      slug: 'python',
      icon: 'assets/svg/python.svg',
    },
    {
      label: 'Node.js',
      slug: 'nodejs',
      icon: 'assets/svg/nodedotjs.svg',
    },
    {
      label: 'NestJS',
      slug: 'nestjs',
      icon: 'assets/svg/nestjs.svg',
    },
    {
      label: 'Java',
      slug: 'java',
      icon: 'assets/svg/java.svg',
    },
    {
      label: '.NET',
      slug: 'dotnet',
      icon: 'assets/svg/dotnet.svg',
    },
    {
      label: 'PHP',
      slug: 'php',
      icon: 'assets/svg/php.svg',
    },
  ],

  database: <Technology[]>[
    {
      label: 'MongoDB',
      slug: 'mongodb',
      icon: 'assets/svg/mongodb.svg',
    },
    {
      label: 'MySQL',
      slug: 'mysql',
      icon: 'assets/svg/mysql.svg',
    },
    {
      label: 'PostgreSQL',
      slug: 'postgresql',
      icon: 'assets/svg/postgresql.svg',
    },
    {
      label: 'SQL Server',
      slug: 'sql-server',
      icon: 'assets/svg/sql-server.svg',
    },
  ],

  mobile: <Technology[]>[
    {
      label: 'React Native',
      slug: 'react-native',
      icon: 'assets/svg/react-native.svg',
    },
    {
      label: 'Flutter',
      slug: 'flutter',
      icon: 'assets/svg/flutter.svg',
    },
  ],

  devops: <Technology[]>[
    {
      label: 'Docker',
      slug: 'docker',
      icon: 'assets/svg/docker.svg',
    },
    {
      label: 'Git',
      slug: 'git',
      icon: 'assets/svg/git.svg',
    },
    {
      label: 'CI/CD',
      slug: 'ci-cd',
      icon: 'assets/svg/ci-cd.svg',
    },
    {
      label: 'Kubernetes',
      slug: 'kubernetes',
      icon: 'assets/svg/kubernetes.svg',
    },
    {
      label: 'AWS',
      slug: 'aws',
      icon: 'assets/svg/aws.svg',
    },
    {
      label: 'Azure',
      slug: 'azure',
      icon: 'assets/svg/azure.svg',
    },
    {
      label: 'GitHub',
      slug: 'git-hub',
      icon: 'assets/svg/github-technology.svg',
    },
  ],

  artificialIntelligence: <Technology[]>[
    {
      label: 'ChatGPT',
      slug: 'chat-gpt',
      icon: 'assets/svg/chatgpt.svg',
    },
    {
      label: 'Deep Seek',
      slug: 'deep-seek',
      icon: 'assets/svg/deepseek.svg',
    },
  ],

} as const;