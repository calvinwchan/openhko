import { iconLabel, iconUrl } from "../lib/icons";
import { useLanguage } from "../context/LanguageContext";

interface Props {
  code: number;
  className?: string;
}

export function WeatherIcon({ code, className }: Props) {
  const { lang } = useLanguage();
  const label = iconLabel(code, lang);
  return (
    <img
      className={className}
      src={iconUrl(code)}
      alt={label}
      title={label}
      width={124}
      height={124}
      loading="lazy"
    />
  );
}
