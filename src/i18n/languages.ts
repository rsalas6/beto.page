export const languages = {
  es: "Español",
  en: "English",
} as const;

export const defaultLang = "es" as const;

export type Lang = keyof typeof languages;
