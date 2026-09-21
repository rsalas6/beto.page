export type Lang = "es" | "en";

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
  /** Número de cédula profesional (SEP) */
  credential: string;
  type: "bachelor" | "master";
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
