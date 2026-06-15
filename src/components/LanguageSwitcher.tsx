import type { Lang } from "../api/types";
import { LANGS, useLanguage } from "../context/LanguageContext";
import { STRINGS } from "../i18n/strings";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  return (
    <span className="select">
      <select
        aria-label={STRINGS[lang].langLabel}
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
      >
        {LANGS.map((code) => (
          <option key={code} value={code}>
            {STRINGS[code].langNames[code]}
          </option>
        ))}
      </select>
    </span>
  );
}
