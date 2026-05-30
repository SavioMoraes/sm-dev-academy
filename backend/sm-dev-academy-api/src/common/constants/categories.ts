export const CATEGORIES = [

  'Fullstack',
  'Frontend',
  'Backend',
  'Database',
  'Mobile',
  'DevOps',
  'IA',

] as const;

export type Category =
  typeof CATEGORIES[number];
