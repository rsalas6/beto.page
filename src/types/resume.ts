import type { Lang } from "@i18n/languages";

export interface LocalizedString {
  es: string;
  en: string;
}

export interface Personal {
  name: string;
  title: LocalizedString;
  email: string;
  location: string;
  website: string;
  available: boolean;
  social: {
    linkedin: string;
    github: string;
    x: string;
  };
}

export interface Experience {
  title: LocalizedString;
  company: string;
  period: string;
  location: string;
  details: {
    es: string[];
    en: string[];
  };
}

export interface Education {
  title: LocalizedString;
  institution: string;
  period: string;
  credential: string;
}

export interface Project {
  title: string;
  description: LocalizedString;
  url: string;
  image: string;
}

export interface Skill {
  label: LocalizedString;
  items: string[];
}

export interface Resume {
  personal: Personal;
  about: LocalizedString;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
}

// Helper to get localized value
export function localized<T extends LocalizedString>(
  obj: T,
  lang: Lang
): string {
  return obj[lang] ?? obj.es;
}
