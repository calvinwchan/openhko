import {
  fetchCurrent,
  fetchLocalForecast,
  fetchNineDay,
  fetchWarningInfo,
  fetchWarnings,
} from "./api/hko";
import { useLanguage } from "./context/LanguageContext";
import { useWeather } from "./hooks/useWeather";
import { useStrings } from "./i18n/strings";
import { todayLine } from "./lib/format";
import { CurrentConditions } from "./components/CurrentConditions";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { LocalForecast } from "./components/LocalForecast";
import { NineDayForecast } from "./components/NineDayForecast";
import { ThemeSwitch } from "./components/ThemeSwitch";
import { UnitSwitch } from "./components/UnitSwitch";
import { WarningBanner } from "./components/WarningBanner";

// rhrread refreshes ~every 10 min upstream; poll a little more often.
const CURRENT_POLL_MS = 5 * 60 * 1000;

export default function App() {
  const { lang } = useLanguage();
  const t = useStrings(lang);

  const current = useWeather(fetchCurrent, lang, { pollMs: CURRENT_POLL_MS });
  const warnings = useWeather(fetchWarnings, lang, { pollMs: CURRENT_POLL_MS });
  const warningInfo = useWeather(fetchWarningInfo, lang, { pollMs: CURRENT_POLL_MS });
  const local = useWeather(fetchLocalForecast, lang);
  const ninedays = useWeather(fetchNineDay, lang);

  const initialLoading =
    current.loading && local.loading && ninedays.loading && !current.data;
  const fatalError =
    current.error && local.error && ninedays.error && !current.data;

  return (
    <div className="shell">
      <header className="masthead">
        <div className="masthead__brand">
          <h1 className="masthead__title">
            Open<span>HKO</span>
          </h1>
          <span className="masthead__tagline">{t.tagline}</span>
        </div>
        <div className="masthead__meta">
          <div className="masthead__controls">
            <LanguageSwitcher />
            <UnitSwitch />
            <ThemeSwitch />
          </div>
          <span className="masthead__date">{todayLine(lang)}</span>
        </div>
      </header>

      {fatalError ? (
        <div className="state">
          <span className="state__title">{t.errorTitle}</span>
          <span className="state__msg">{current.error}</span>
          <button
            className="btn"
            onClick={() => {
              current.refetch();
              warnings.refetch();
              warningInfo.refetch();
              local.refetch();
              ninedays.refetch();
            }}
          >
            {t.retry}
          </button>
        </div>
      ) : initialLoading ? (
        <div className="state">
          <span className="state__spinner" />
          <span className="state__msg">{t.loading}</span>
        </div>
      ) : (
        <main>
          <WarningBanner
            warnings={warnings.data}
            info={warningInfo.data}
            current={current.data}
            lang={lang}
          />

          {current.data ? <CurrentConditions data={current.data} lang={lang} /> : null}
          {local.data ? <LocalForecast data={local.data} lang={lang} /> : null}
          {ninedays.data ? (
            <NineDayForecast data={ninedays.data} current={current.data} lang={lang} />
          ) : null}
        </main>
      )}

      <footer className="colophon">
        <span>
          {t.dataSource} ·{" "}
          <a href="https://www.hko.gov.hk/en/abouthko/opendata_intro.htm" target="_blank" rel="noreferrer">
            HKO Open Data
          </a>
        </span>
        <span>OpenHKO</span>
      </footer>
    </div>
  );
}
