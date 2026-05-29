export const TECHNOLOGIES = [

  // FRONTEND

  'HTML',
  'CSS',
  'SCSS',
  'Styled-Components',
  'Tailwind',
  'Bootstrap',
  'JavaScript',
  'TypeScript',
  'React',
  'Angular',
  'Vue',

  // BACKEND

  'Python',
  'Node.js',
  'NestJS',
  'Java',
  '.NET',
  'PHP',

  // DATABASE

  'MongoDB',
  'MySQL',
  'PostgreSQL',
  'SQL Server',

  // MOBILE

  'React Native',
  'Flutter',

  // DEVOPS

  'Docker',
  'Git',
  'CI/CD',
  'Kubernetes',
  'AWS',
  'Azure',
  'GitHub',

  // IA

  'ChatGPT',
  'Vs Code Copilot',

] as const;

export type Technology =
  typeof TECHNOLOGIES[number];