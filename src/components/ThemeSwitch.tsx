import { useLanguage } from "../context/LanguageContext";
import { useTheme, type ThemePref } from "../context/ThemeContext";
import { useStrings } from "../i18n/strings";

export function ThemeSwitch() {
  const { pref, setPref } = useTheme();
  const { lang } = useLanguage();
  const t = useStrings(lang);

  const options: { key: ThemePref; label: string }[] = [
    { key: "light", label: t.themeLight },
    { key: "system", label: t.themeSystem },
    { key: "dark", label: t.themeDark },
  ];

  return (
    <span className="select">
      <select
        aria-label={t.themeLabel}
        value={pref}
        onChange={(e) => setPref(e.target.value as ThemePref)}
      >
        {options.map((o) => (
          <option key={o.key} value={o.key}>
            {o.label}
          </option>
        ))}
      </select>
    </span>
  );
}
