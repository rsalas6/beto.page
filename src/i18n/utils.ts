import { ui, type UiKey } from "./ui";
import { defaultLang, type Lang } from "./languages";

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
  if (newLang === defaultLang) return cleanPath;
  return `/${newLang}${cleanPath}`;
}
