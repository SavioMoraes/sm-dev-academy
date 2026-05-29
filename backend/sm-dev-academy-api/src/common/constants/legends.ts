export const LEGENDS = [

  'Português',
  'English',
  'Español',

] as const;

export type Legend =
  typeof LEGENDS[number];
