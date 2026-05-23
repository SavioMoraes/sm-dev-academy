import { Course } from '../interfaces/course.interface';
import { limitCourseText } from '../utils/course-utils';

const rawCourses: Course[] = [
  {
    title: 'Aprenda Angular moderno com arquitetura enterprise, componentes standalone, signals e muito mais.',
    description: 'Aprenda Angular moderno com arquitetura enterprise, componentes standalone e formulários reativos.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop',
    category: 'Frontend',
  },
  {
    title: 'NestJS API Enterprise',
    description: 'Construa APIs escaláveis usando NestJS, Prisma ORM e PostgreSQL.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
    category: 'Backend',
  },
  {
    title: 'Docker & DevOps Moderno',
    description: 'Containers, CI/CD e deploy cloud para aplicações modernas.',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1600&auto=format&fit=crop',
    category: 'DevOps',
  },
  {
    title: 'React Performance Master',
    description: 'Performance, arquitetura escalável e aplicações modernas com React.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
    category: 'Frontend',
  },
  {
    title: 'PostgreSQL para Fullstack',
    description: 'Modelagem, queries avançadas e integração enterprise.',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1600&auto=format&fit=crop',
    category: 'Banco de Dados',
  },
];

export const COURSES_MOCK: Course[] = rawCourses.map((course: Course) => ({
  ...course,
  ...limitCourseText(
    course.title,
    course.description,
    35,
    100,
  ),
}));