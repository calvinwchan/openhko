// UI label translations. API-supplied text (forecasts, warnings) is already
// localized by the `lang` query param; this table covers only our own chrome.

import type { Lang } from "../api/types";

interface Strings {
  appName: string;
  tagline: string;
  langLabel: string;
  langNames: Record<Lang, string>;
  unitLabel: string;
  themeLabel: string;
  themeLight: string;
  themeDark: string;
  themeSystem: string;
  currentConditions: string;
  humidity: string;
  uvIndex: string;
  observedAt: string;
  updated: string;
  localForecast: string;
  generalSituation: string;
  outlook: string;
  extendedForecast: string;
  rainProbability: string;
  wind: string;
  today: string;
  now: string;
  loading: string;
  errorTitle: string;
  retry: string;
  noWarnings: string;
  dataSource: string;
  high: string;
  low: string;
}

export const STRINGS: Record<Lang, Strings> = {
  en: {
    appName: "OpenHKO",
    tagline: "Hong Kong weather, from the Observatory",
    langLabel: "Language",
    langNames: { en: "English", tc: "繁體中文", sc: "简体中文" },
    unitLabel: "Temperature unit",
    themeLabel: "Theme",
    themeLight: "Light",
    themeDark: "Dark",
    themeSystem: "System",
    currentConditions: "Current conditions",
    humidity: "Humidity",
    uvIndex: "UV index",
    observedAt: "Observed at Hong Kong Observatory",
    updated: "Updated",
    localForecast: "Local forecast",
    generalSituation: "General situation",
    outlook: "Outlook",
    extendedForecast: "Extended forecast",
    rainProbability: "Chance of rain",
    wind: "Wind",
    today: "Today",
    now: "Now",
    loading: "Loading…",
    errorTitle: "Couldn’t load weather data",
    retry: "Try again",
    noWarnings: "No weather warnings in force",
    dataSource: "Data source: Hong Kong Observatory",
    high: "High",
    low: "Low",
  },
  tc: {
    appName: "OpenHKO",
    tagline: "天文台香港天氣資訊",
    langLabel: "語言",
    langNames: { en: "English", tc: "繁體中文", sc: "简体中文" },
    unitLabel: "溫度單位",
    themeLabel: "主題",
    themeLight: "淺色",
    themeDark: "深色",
    themeSystem: "系統",
    currentConditions: "現時天氣",
    humidity: "相對濕度",
    uvIndex: "紫外線指數",
    observedAt: "香港天文台錄得",
    updated: "更新時間",
    localForecast: "本港天氣預報",
    generalSituation: "天氣概況",
    outlook: "展望",
    extendedForecast: "延伸預報",
    rainProbability: "降雨概率",
    wind: "風",
    today: "今日",
    now: "現時",
    loading: "載入中…",
    errorTitle: "無法載入天氣資料",
    retry: "重試",
    noWarnings: "現時沒有天氣警告生效",
    dataSource: "資料來源：香港天文台",
    high: "最高",
    low: "最低",
  },
  sc: {
    appName: "OpenHKO",
    tagline: "天文台香港天气资讯",
    langLabel: "语言",
    langNames: { en: "English", tc: "繁體中文", sc: "简体中文" },
    unitLabel: "温度单位",
    themeLabel: "主题",
    themeLight: "浅色",
    themeDark: "深色",
    themeSystem: "系统",
    currentConditions: "现时天气",
    humidity: "相对湿度",
    uvIndex: "紫外线指数",
    observedAt: "香港天文台录得",
    updated: "更新时间",
    localForecast: "本港天气预报",
    generalSituation: "天气概况",
    outlook: "展望",
    extendedForecast: "延伸预报",
    rainProbability: "降雨概率",
    wind: "风",
    today: "今日",
    now: "现时",
    loading: "加载中…",
    errorTitle: "无法加载天气资料",
    retry: "重试",
    noWarnings: "现时没有天气警告生效",
    dataSource: "资料来源：香港天文台",
    high: "最高",
    low: "最低",
  },
};

export function useStrings(lang: Lang): Strings {
  return STRINGS[lang];
}
