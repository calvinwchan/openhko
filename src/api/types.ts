// TypeScript models for the Hong Kong Observatory Open Data Weather API.
// Source: https://data.weather.gov.hk/weatherAPI/opendata/weather.php

export type Lang = "en" | "tc" | "sc";

export interface Measurement {
  place: string;
  value: number;
  unit?: string;
}

export interface UvIndexEntry {
  place: string;
  value: number;
  desc: string;
}

export interface RainfallEntry {
  place: string;
  /** Maximum rainfall over the reporting period. */
  max: number;
  /** Some districts also report a `min`. */
  min?: number;
  unit: string;
  /** "TRUE" when the reading is the main value for the district. */
  main: string;
}

/** dataType=rhrread — current weather report. */
export interface CurrentWeather {
  rainfall: { data: RainfallEntry[]; startTime?: string; endTime?: string };
  temperature: { data: Measurement[]; recordTime: string };
  humidity: { data: Measurement[]; recordTime: string };
  uvindex?: { data: UvIndexEntry[]; recordDesc: string } | "";
  /** Weather icon code(s), e.g. [62]. */
  icon: number[];
  iconUpdateTime: string;
  warningMessage: string | string[];
  rainstormReminder?: string;
  specialWxTips?: string[];
  tcmessage?: string | string[];
  mintempFrom00To09?: string;
  rainfallFrom00To12?: string;
  rainfallLastMonth?: string;
  rainfallJanuaryToLastMonth?: string;
  updateTime: string;
}

/** dataType=flw — local weather forecast. */
export interface LocalForecast {
  generalSituation: string;
  tcInfo: string;
  fireDangerWarning: string;
  forecastPeriod: string;
  forecastDesc: string;
  outlook: string;
  updateTime: string;
}

export interface DailyForecast {
  forecastDate: string; // YYYYMMDD
  week: string;
  forecastWind: string;
  forecastWeather: string;
  forecastMaxtemp: { value: number; unit: string };
  forecastMintemp: { value: number; unit: string };
  forecastMaxrh: { value: number; unit: string };
  forecastMinrh: { value: number; unit: string };
  ForecastIcon: number;
  /** Probability of Significant Rain, e.g. "High", "Medium Low". */
  PSR: string;
}

/** dataType=fnd — 9-day weather forecast. */
export interface NineDayForecast {
  generalSituation: string;
  weatherForecast: DailyForecast[];
  updateTime: string;
  seaTemp?: { place: string; value: number; unit: string; recordTime: string };
  soilTemp?: Array<{
    place: string;
    value: number;
    unit: string;
    recordTime: string;
    depth: { unit: string; value: number };
  }>;
}

export interface WarningEntry {
  /** Localized warning name, e.g. "Rainstorm Warning Signal". */
  name: string;
  /** Warning code, e.g. "WRAINA" (amber rainstorm). */
  code?: string;
  /** "ISSUE", "UPDATE", "EXTEND", "REISSUE", "CANCEL". */
  actionCode: string;
  type?: string;
  issueTime: string;
  updateTime?: string;
  expireTime?: string;
}

/** dataType=warnsum — warning summary. Empty object when no active warnings. */
export type WarningSummary = Record<string, WarningEntry>;

export interface WarningDetail {
  /** Full advisory text, one entry per paragraph. */
  contents: string[];
  /** Statement code, matches a WarningSummary key (e.g. "WRAIN", "WTCSGNL"). */
  warningStatementCode: string;
  /** Specific subtype, e.g. "WRAINR", "TC3". */
  subtype?: string;
  updateTime: string;
}

/** dataType=warningInfo — detailed warning bulletins. Empty object when none. */
export interface WarningInfo {
  details?: WarningDetail[];
}
