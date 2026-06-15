// Hong Kong Observatory weather icon codes.
// Official icon imagery is served at:
//   https://www.hko.gov.hk/images/HKOWxIconOutline/pic{code}.png
// We keep a localized label table for accessible alt text.

import type { Lang } from "../api/types";

export function iconUrl(code: number): string {
  return `https://www.hko.gov.hk/images/HKOWxIconOutline/pic${code}.png`;
}

type Label = Record<Lang, string>;

const LABELS: Record<number, Label> = {
  50: { en: "Sunny", tc: "天晴", sc: "天晴" },
  51: { en: "Sunny periods", tc: "短暫時間有陽光", sc: "短暂时间有阳光" },
  52: { en: "Sunny intervals", tc: "短暫時間有陽光", sc: "短暂时间有阳光" },
  53: { en: "Sunny periods with a few showers", tc: "間中有陽光及驟雨", sc: "间中有阳光及阵雨" },
  54: { en: "Sunny intervals with showers", tc: "短暫時間有陽光及有驟雨", sc: "短暂时间有阳光及有阵雨" },
  60: { en: "Cloudy", tc: "多雲", sc: "多云" },
  61: { en: "Overcast", tc: "密雲", sc: "密云" },
  62: { en: "Light rain", tc: "微雨", sc: "微雨" },
  63: { en: "Rain", tc: "雨", sc: "雨" },
  64: { en: "Heavy rain", tc: "大雨", sc: "大雨" },
  65: { en: "Thunderstorms", tc: "雷暴", sc: "雷暴" },
  70: { en: "Fine", tc: "天色良好", sc: "天色良好" },
  71: { en: "Fine", tc: "天色良好", sc: "天色良好" },
  72: { en: "Fine", tc: "天色良好", sc: "天色良好" },
  73: { en: "Fine", tc: "天色良好", sc: "天色良好" },
  74: { en: "Fine", tc: "天色良好", sc: "天色良好" },
  75: { en: "Fine", tc: "天色良好", sc: "天色良好" },
  76: { en: "Mainly cloudy", tc: "大致多雲", sc: "大致多云" },
  77: { en: "Mainly fine", tc: "天色大致良好", sc: "天色大致良好" },
  80: { en: "Windy", tc: "大風", sc: "大风" },
  81: { en: "Dry", tc: "乾燥", sc: "干燥" },
  82: { en: "Humid", tc: "潮濕", sc: "潮湿" },
  83: { en: "Fog", tc: "霧", sc: "雾" },
  84: { en: "Mist", tc: "薄霧", sc: "薄雾" },
  85: { en: "Haze", tc: "煙霞", sc: "烟霞" },
  90: { en: "Hot", tc: "炎熱", sc: "炎热" },
  91: { en: "Warm", tc: "和暖", sc: "和暖" },
  92: { en: "Cool", tc: "清涼", sc: "清凉" },
  93: { en: "Cold", tc: "寒冷", sc: "寒冷" },
};

export function iconLabel(code: number, lang: Lang): string {
  return LABELS[code]?.[lang] ?? LABELS[code]?.en ?? "Weather";
}
