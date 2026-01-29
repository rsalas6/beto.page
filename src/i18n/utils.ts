import { ui, type UiKey } from "./ui";
import { defaultLang, type Lang } from "./languages";

// Pages that only exist in Spanish (no English version)
const spanishOnlyPaths = ["/tools", "/resume-print"];

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang === "en") return "en";
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function getLocalizedPath(path: string, lang: Lang): string {
  const cleanPath = path.replace(/^\/(es|en)/, "") || "/";
  if (lang === defaultLang) return cleanPath;
  return `/${lang}${cleanPath}`;
}

export function switchLang(currentPath: string, newLang: Lang): string {
  const cleanPath = currentPath.replace(/^\/(es|en)/, "") || "/";

  // If switching to English but page only exists in Spanish, go to home
  if (newLang === "en" && spanishOnlyPaths.some(p => cleanPath.startsWith(p))) {
    return "/en";
  }

  if (newLang === defaultLang) return cleanPath;
  return `/${newLang}${cleanPath}`;
}

export function isSpanishOnlyPage(path: string): boolean {
  const cleanPath = path.replace(/^\/(es|en)/, "") || "/";
  return spanishOnlyPaths.some(p => cleanPath.startsWith(p));
}
