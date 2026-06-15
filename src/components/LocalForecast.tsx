import type { Lang, LocalForecast as LocalForecastData } from "../api/types";
import { useStrings } from "../i18n/strings";

interface Props {
  data: LocalForecastData;
  lang: Lang;
}

export function LocalForecast({ data, lang }: Props) {
  const t = useStrings(lang);

  return (
    <section className="section reveal" style={{ animationDelay: "0.15s" }}>
      <div className="section__label">
        <span className="num">02</span>
        {t.localForecast}
      </div>

      <div className="forecast">
        <div className="forecast__block">
          <h3>{t.generalSituation}</h3>
          <p className="forecast__lead">{data.generalSituation}</p>
        </div>

        <div className="forecast__block">
          {data.forecastPeriod ? (
            <h3 className="forecast__period">{data.forecastPeriod}</h3>
          ) : null}
          <p className="forecast__body">{data.forecastDesc}</p>
          {data.outlook ? (
            <p className="forecast__body forecast__outlook">
              <strong>{t.outlook}: </strong>
              {data.outlook}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
