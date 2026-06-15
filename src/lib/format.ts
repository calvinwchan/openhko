// Date & time formatting helpers, localized per app language.

import type { Lang } from "../api/types";

const LOCALE: Record<Lang, string> = {
  en: "en-HK",
  tc: "zh-Hant-HK",
  sc: "zh-Hans-CN",
};

const HK_TZ = "Asia/Hong_Kong";

/** Today's date in Hong Kong as an "YYYYMMDD" string (matches HKO format). */
export function hkTodayYmd(): string {
  // en-CA renders ISO-like "2026-06-13"; strip the dashes.
  const s = new Intl.DateTimeFormat("en-CA", {
    timeZone: HK_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return s.replace(/-/g, "");
}

/** Parse an HKO "YYYYMMDD" date string into a Date. */
export function parseForecastDate(yyyymmdd: string): Date {
  const y = Number(yyyymmdd.slice(0, 4));
  const m = Number(yyyymmdd.slice(4, 6));
  const d = Number(yyyymmdd.slice(6, 8));
  return new Date(y, m - 1, d);
}

/** Short month/day for a forecast card, e.g. "14 Jun" / "6月14日". */
export function shortDate(yyyymmdd: string, lang: Lang): string {
  const date = parseForecastDate(yyyymmdd);
  return new Intl.DateTimeFormat(LOCALE[lang], {
    day: "numeric",
    month: "short",
  }).format(date);
}

/** Format an ISO timestamp from the API as a readable HK local time. */
export function formatUpdateTime(iso: string, lang: Lang): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(LOCALE[lang], {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: HK_TZ,
  }).format(date);
}

/** Today's masthead date line. */
export function todayLine(lang: Lang): string {
  return new Intl.DateTimeFormat(LOCALE[lang], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: HK_TZ,
  }).format(new Date());
}
