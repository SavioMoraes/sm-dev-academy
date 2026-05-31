export const LANGUAGES = [

  'Português',
  'Inglês',
  'Español',

] as const;

export type Language =
  typeof LANGUAGES[number];
