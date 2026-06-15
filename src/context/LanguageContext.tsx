import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "../api/types";
import { getCookie, setCookie } from "../lib/cookies";

const COOKIE_KEY = "openhko.lang";
const LANGS: Lang[] = ["en", "tc", "sc"];

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readInitialLang(): Lang {
  const stored = getCookie(COOKIE_KEY);
  if (stored && (LANGS as string[]).includes(stored)) {
    return stored as Lang;
  }
  // Fall back to the browser preference, defaulting to English.
  const nav = navigator.language.toLowerCase();
  if (nav.startsWith("zh")) {
    return nav.includes("cn") || nav.includes("hans") ? "sc" : "tc";
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    setCookie(COOKIE_KEY, next);
  }, []);

  useEffect(() => {
    document.documentElement.lang =
      lang === "tc" ? "zh-Hant" : lang === "sc" ? "zh-Hans" : "en";
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

export { LANGS };
