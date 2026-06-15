import type { Lang } from "../api/types";
import { shortDate } from "../lib/format";
import { formatTemp } from "../lib/temp";
import { useUnit } from "../context/UnitContext";
import { useStrings } from "../i18n/strings";
import { WeatherIcon } from "./WeatherIcon";

/** Normalized view model so forecast days and the observed "today" card
 *  share one renderer. Range fields are absent for observed readings. */
export interface DayView {
  date: string; // YYYYMMDD
  weekday: string;
  icon: number;
  tempHigh: number;
  tempLow?: number;
  rhHigh: number;
  rhLow?: number;
  psr?: string;
  wind?: string;
  observed?: boolean;
}

interface Props {
  day: DayView;
  lang: Lang;
}

export function ForecastCard({ day, lang }: Props) {
  const t = useStrings(lang);
  const { unit } = useUnit();

  const rh =
    day.rhLow != null ? `${day.rhLow}–${day.rhHigh}%` : `${day.rhHigh}%`;

  return (
    <div className={`day${day.observed ? " day--today" : ""}`}>
      <div className="day__head">
        <span className="day__week">{day.weekday}</span>
        <span className="day__date">{shortDate(day.date, lang)}</span>
      </div>

      <WeatherIcon code={day.icon} className="day__icon" />

      <div className="day__temps">
        <span className="day__hi">{formatTemp(day.tempHigh, unit)}°</span>
        {day.tempLow != null ? (
          <span className="day__lo">{formatTemp(day.tempLow, unit)}°</span>
        ) : (
          <span className="day__nowtag">{t.now}</span>
        )}
      </div>
      <div className="day__bar" />

      <div className="day__meta">
        <span className="day__rh">
          {t.humidity}: <span className="day__rhval">{rh}</span>
        </span>
        {day.psr ? (
          <span className="day__rain">
            {t.rainProbability}: <span className="day__psr">{day.psr}</span>
          </span>
        ) : null}
        {day.wind ? <span className="day__wind">{day.wind}</span> : null}
      </div>
    </div>
  );
}
