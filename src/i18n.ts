import ar from "../locales/ar.json";
import de from "../locales/de.json";
import da from "../locales/da.json";
import en from "../locales/en.json";
import es from "../locales/es.json";
import fa from "../locales/fa.json";
import fi from "../locales/fi.json";
import fr from "../locales/fr.json";
import hi from "../locales/hi.json";
import he from "../locales/he.json";
import hu from "../locales/hu.json";
import id from "../locales/id.json";
import it from "../locales/it.json";
import ja from "../locales/ja.json";
import ko from "../locales/ko.json";
import ms from "../locales/ms.json";
import nl from "../locales/nl.json";
import no from "../locales/no.json";
import pl from "../locales/pl.json";
import pt from "../locales/pt.json";
import ro from "../locales/ro.json";
import ru from "../locales/ru.json";
import sv from "../locales/sv.json";
import th from "../locales/th.json";
import tr from "../locales/tr.json";
import uk from "../locales/uk.json";
import vi from "../locales/vi.json";
import zh from "../locales/zh.json";
import bn from "../locales/bn.json";
import cs from "../locales/cs.json";

export const supportedLocales = ["ar", "bn", "cs", "da", "de", "en", "es", "fa", "fi", "fr", "he", "hi", "hu", "id", "it", "ja", "ko", "ms", "nl", "no", "pl", "pt", "ro", "ru", "sv", "th", "tr", "uk", "vi", "zh"] as const;
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
    case "cs":
      return cs;
    case "da":
      return da;
    case "de":
      return de;
    case "es":
      return es;
    case "fa":
      return fa;
    case "fi":
      return fi;
    case "fr":
      return fr;
    case "he":
      return he;
    case "hi":
      return hi;
    case "hu":
      return hu;
    case "id":
      return id;
    case "it":
      return it;
    case "ja":
      return ja;
    case "ko":
      return ko;
    case "ms":
      return ms;
    case "nl":
      return nl;
    case "no":
      return no;
    case "pl":
      return pl;
    case "pt":
      return pt;
    case "ro":
      return ro;
    case "ru":
      return ru;
    case "sv":
      return sv;
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
