import ar from "../locales/ar.json";
import de from "../locales/de.json";
import en from "../locales/en.json";
import es from "../locales/es.json";
import fr from "../locales/fr.json";
import hi from "../locales/hi.json";
import id from "../locales/id.json";
import it from "../locales/it.json";
import ja from "../locales/ja.json";
import ko from "../locales/ko.json";
import nl from "../locales/nl.json";
import pl from "../locales/pl.json";
import pt from "../locales/pt.json";
import ru from "../locales/ru.json";
import th from "../locales/th.json";
import tr from "../locales/tr.json";
import uk from "../locales/uk.json";
import vi from "../locales/vi.json";
import zh from "../locales/zh.json";
import bn from "../locales/bn.json";

export const supportedLocales = ["ar", "bn", "de", "en", "es", "fr", "hi", "id", "it", "ja", "ko", "nl", "pl", "pt", "ru", "th", "tr", "uk", "vi", "zh"] as const;
export type Locale = (typeof supportedLocales)[number];
export type Dictionary = typeof en;
export const defaultLocale: Locale = "en";

function normalizeLocale(locale: string | null | undefined): Locale {
  const primaryLocale = (locale ?? "").split(",")[0].split("-")[0].trim().toLowerCase();

  if (supportedLocales.includes(primaryLocale as Locale)) {
    return primaryLocale as Locale;
  }

  return defaultLocale;
}

export function getLocaleFromAcceptLanguage(acceptLanguage: string | null | undefined): Locale {
  return normalizeLocale(acceptLanguage);
}

export function getDictionary(locale: Locale): Dictionary {
  switch (locale) {
    case "ar":
      return ar;
    case "de":
      return de;
    case "es":
      return es;
    case "fr":
      return fr;
    case "hi":
      return hi;
    case "id":
      return id;
    case "it":
      return it;
    case "ja":
      return ja;
    case "ko":
      return ko;
    case "nl":
      return nl;
    case "pl":
      return pl;
    case "pt":
      return pt;
    case "ru":
      return ru;
    case "th":
      return th;
    case "tr":
      return tr;
    case "uk":
      return uk;
    case "vi":
      return vi;
    case "zh":
      return zh;
    case "bn":
      return bn;
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
