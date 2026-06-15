// Thin, typed client for the Hong Kong Observatory Open Data Weather API.
// No API key required; the endpoints are CORS-enabled and callable directly
// from the browser.

import type {
  CurrentWeather,
  Lang,
  LocalForecast,
  NineDayForecast,
  WarningInfo,
  WarningSummary,
} from "./types";

const BASE = "https://data.weather.gov.hk/weatherAPI/opendata/weather.php";

type DataType = "rhrread" | "flw" | "fnd" | "warnsum" | "warningInfo";

async function request<T>(dataType: DataType, lang: Lang, signal?: AbortSignal): Promise<T> {
  const url = `${BASE}?dataType=${dataType}&lang=${lang}`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`HKO API ${dataType} responded with ${res.status}`);
  }
  return (await res.json()) as T;
}

export const fetchCurrent = (lang: Lang, signal?: AbortSignal) =>
  request<CurrentWeather>("rhrread", lang, signal);

export const fetchLocalForecast = (lang: Lang, signal?: AbortSignal) =>
  request<LocalForecast>("flw", lang, signal);

export const fetchNineDay = (lang: Lang, signal?: AbortSignal) =>
  request<NineDayForecast>("fnd", lang, signal);

export const fetchWarnings = (lang: Lang, signal?: AbortSignal) =>
  request<WarningSummary>("warnsum", lang, signal);

export const fetchWarningInfo = (lang: Lang, signal?: AbortSignal) =>
  request<WarningInfo>("warningInfo", lang, signal);
