import en from "../locales/en.json";
import nl from "../locales/nl.json";

export const supportedLocales = ["en", "nl"] as const;
export type Locale = (typeof supportedLocales)[number];
export type Dictionary = typeof en;
export const defaultLocale: Locale = "en";

export function getLocaleFromAcceptLanguage(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const locale = acceptLanguage.split(",")[0].split("-")[0].trim().toLowerCase();
  return locale === "nl" ? "nl" : defaultLocale;
}

export function getDictionary(locale: Locale): Dictionary {
  switch (locale) {
    case "nl":
      return nl;
    default:
      return en;
  }
}

export function formatTranslation(template: string, values?: Record<string, string | number>) {
  if (!values) return template;

  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = values[key];
    return value === undefined ? `{${key}}` : String(value);
  });
}

export function resolveTranslation(
  dictionary: Dictionary,
  key: string,
  values?: Record<string, string | number>
) {
  const value = key.split(".").reduce<unknown>((current, segment) => {
    if (current && typeof current === "object" && segment in (current as Record<string, unknown>)) {
      return (current as Record<string, unknown>)[segment];
    }

    return undefined;
  }, dictionary);

  if (typeof value !== "string") {
    return key;
  }

  return formatTranslation(value, values);
}
