import { useLanguage } from "../context/LanguageContext";
import { useUnit } from "../context/UnitContext";
import { useStrings } from "../i18n/strings";
import type { TempUnit } from "../lib/temp";

const UNITS: TempUnit[] = ["C", "F"];

export function UnitSwitch() {
  const { unit, setUnit } = useUnit();
  const { lang } = useLanguage();
  const t = useStrings(lang);

  return (
    <span className="select select--mono">
      <select
        aria-label={t.unitLabel}
        value={unit}
        onChange={(e) => setUnit(e.target.value as TempUnit)}
      >
        {UNITS.map((u) => (
          <option key={u} value={u}>
            °{u}
          </option>
        ))}
      </select>
    </span>
  );
}
