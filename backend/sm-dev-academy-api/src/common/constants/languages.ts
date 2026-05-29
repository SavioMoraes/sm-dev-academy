export const LANGUAGES = [

  'Português',
  'Español',

] as const;

export type Language =
  typeof LANGUAGES[number];
