import type {
  CurrentWeather,
  Lang,
  NineDayForecast as NineDayData,
} from "../api/types";
import { useStrings } from "../i18n/strings";
import { hkTodayYmd } from "../lib/format";
import { ForecastCard, type DayView } from "./ForecastCard";

interface Props {
  data: NineDayData;
  /** Current observations, used to synthesize a "Today" lead-in card. */
  current: CurrentWeather | null;
  lang: Lang;
}

const REFERENCE_STATION = "Hong Kong Observatory";

/** Build an observed "Today" card from the current weather report. The HKO
 *  9-day forecast (`fnd`) begins tomorrow and has no entry for today, so we
 *  fill it from the live observation (rhrread). */
function buildTodayCard(
  current: CurrentWeather,
  todayYmd: string,
  todayLabel: string,
): DayView | null {
  const code = current.icon[0];
  const temp =
    current.temperature.data.find((d) => d.place === REFERENCE_STATION) ??
    current.temperature.data[0];
  const humidity =
    current.humidity.data.find((d) => d.place === REFERENCE_STATION) ??
    current.humidity.data[0];

  if (code == null || !temp || !humidity) return null;

  return {
    date: todayYmd,
    weekday: todayLabel,
    icon: code,
    tempHigh: Math.round(temp.value),
    rhHigh: Math.round(humidity.value),
    observed: true,
  };
}

function toDayView(day: NineDayData["weatherForecast"][number]): DayView {
  return {
    date: day.forecastDate,
    weekday: day.week,
    icon: day.ForecastIcon,
    tempHigh: day.forecastMaxtemp.value,
    tempLow: day.forecastMintemp.value,
    rhHigh: day.forecastMaxrh.value,
    rhLow: day.forecastMinrh.value,
    psr: day.PSR,
    wind: day.forecastWind,
  };
}

export function NineDayForecast({ data, current, lang }: Props) {
  const t = useStrings(lang);
  const todayYmd = hkTodayYmd();

  const forecastDays = data.weatherForecast.map(toDayView);

  // Prepend an observed "Today" card only when the forecast doesn't already
  // include today (it normally starts tomorrow).
  const fndHasToday = data.weatherForecast.some(
    (d) => d.forecastDate === todayYmd,
  );
  const todayCard =
    !fndHasToday && current
      ? buildTodayCard(current, todayYmd, t.today)
      : null;

  const days: DayView[] = todayCard ? [todayCard, ...forecastDays] : forecastDays;

  return (
    <section className="section reveal" style={{ animationDelay: "0.25s" }}>
      <div className="section__label">
        <span className="num">03</span>
        {t.extendedForecast}
      </div>

      <div className="ninedays">
        {days.map((day) => (
          <ForecastCard key={day.date} day={day} lang={lang} />
        ))}
      </div>
    </section>
  );
}
