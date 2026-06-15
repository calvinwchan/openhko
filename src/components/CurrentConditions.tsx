import type { CurrentWeather, Lang } from "../api/types";
import { iconLabel } from "../lib/icons";
import { formatUpdateTime } from "../lib/format";
import { formatTemp } from "../lib/temp";
import { useUnit } from "../context/UnitContext";
import { useStrings } from "../i18n/strings";
import { WeatherIcon } from "./WeatherIcon";

interface Props {
  data: CurrentWeather;
  lang: Lang;
}

const REFERENCE_STATION = "Hong Kong Observatory";

export function CurrentConditions({ data, lang }: Props) {
  const t = useStrings(lang);
  const { unit } = useUnit();

  // The Hong Kong Observatory station is the official city reference reading.
  const temp =
    data.temperature.data.find((d) => d.place === REFERENCE_STATION) ??
    data.temperature.data[0];
  const humidity =
    data.humidity.data.find((d) => d.place === REFERENCE_STATION) ??
    data.humidity.data[0];
  const uv =
    data.uvindex && typeof data.uvindex === "object"
      ? data.uvindex.data[0]
      : undefined;

  const code = data.icon[0];
  const condition = code ? iconLabel(code, lang) : "";

  return (
    <section className="section reveal" style={{ animationDelay: "0.05s" }}>
      <div className="section__label">
        <span className="num">01</span>
        {t.currentConditions}
      </div>

      <div className="now">
        <div className="now__primary">
          {code ? <WeatherIcon code={code} className="now__icon" /> : null}
          <div className="now__readout">
            <div className="now__temp">
              {temp ? formatTemp(temp.value, unit) : "--"}
              <sup>°{unit}</sup>
            </div>
            {condition ? <div className="now__condition">{condition}</div> : null}
            <div className="now__place">{t.observedAt}</div>
          </div>
        </div>

        <div className="now__aside">
          <div className="now__instruments">
            <div className="instrument">
              <span className="instrument__label">{t.humidity}</span>
              <span className="instrument__value">
                {humidity ? Math.round(humidity.value) : "--"}
                <small>%</small>
              </span>
              <span className="instrument__note" aria-hidden="true">
                &nbsp;
              </span>
            </div>
            <div className="instrument">
              <span className="instrument__label">{t.uvIndex}</span>
              <span className="instrument__value">{uv ? uv.value : "--"}</span>
              <span className="instrument__note">{uv?.desc ?? " "}</span>
            </div>
          </div>
          <div className="now__updated">
            <span className="now__updated-label">{t.updated}</span>
            <time>{formatUpdateTime(data.updateTime, lang)}</time>
          </div>
        </div>
      </div>
    </section>
  );
}
