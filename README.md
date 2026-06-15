# OpenHKO

A clean Hong Kong weather app powered entirely by official **[Hong Kong Observatory Open Data](https://www.hko.gov.hk/en/abouthko/opendata_intro.htm)**.

No API key, no backend — a fully client-side React app that reads the HKO Open Data Weather API directly from the browser.

## Features

- **Current conditions** — official Hong Kong Observatory temperature, humidity, UV index, and weather icon
- **Active warnings** — typhoon signals, rainstorm warnings, and special weather tips, surfaced prominently with severity styling
- **Local forecast** — the Observatory's general-situation and forecast narrative
- **9-day forecast** — daily high/low, weather icon, rain probability (PSR), and wind
- **Trilingual** — English / 繁體中文 / 简体中文, with a switcher (persisted to `localStorage`)

## Design

"Atmospheric Broadsheet" — an editorial weather bulletin with meteorological-instrument precision: a newspaper nameplate, mono instrument readouts, hairline rules, a soft atmospheric sky-gradient, and a paper-grain texture. Typeset in Fraunces (display) and IBM Plex Sans / TC / SC + Plex Mono.

## Tech

React 18 · TypeScript · Vite · plain CSS (no UI framework).

```
src/
  api/        HKO API client + TypeScript response models
  hooks/      useWeather — fetch/poll/abort with lang reactivity
  context/    LanguageContext (en | tc | sc)
  i18n/       UI label translations
  lib/        weather-icon lookup + date/time formatting
  components/ Masthead, WarningBanner, CurrentConditions, LocalForecast,
              NineDayForecast, ForecastCard, WeatherIcon, LanguageSwitcher
```

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + static bundle in dist/
npm run preview  # serve the production build
```

## Data

All data comes from `https://data.weather.gov.hk/weatherAPI/opendata/weather.php`
(`rhrread`, `flw`, `fnd`, `warnsum`). The headline temperature uses the
**Hong Kong Observatory** reference station. Data © Hong Kong Observatory.
