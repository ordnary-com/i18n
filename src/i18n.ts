import en from "../locales/en.json";
import nl from "../locales/nl.json";

export const supportedLocales = ["en", "nl"] as const;
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = "en";

export function getLocaleFromAcceptLanguage(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const locale = acceptLanguage.split(",")[0].split("-")[0].trim().toLowerCase();
  return locale === "nl" ? "nl" : defaultLocale;
}

export function getDictionary(locale: Locale) {
  switch (locale) {
    case "nl":
      return nl;
    default:
      return en;
  }
}
