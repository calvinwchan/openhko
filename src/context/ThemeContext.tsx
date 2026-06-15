import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { deleteCookie, getCookie, setCookie } from "../lib/cookies";

/** What the user picked. "system" follows the OS preference. */
export type ThemePref = "light" | "dark" | "system";
/** What actually gets applied to the page. */
export type ResolvedTheme = "light" | "dark";

const COOKIE_KEY = "openhko.theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const META_COLOR: Record<ResolvedTheme, string> = {
  light: "#f1ede3",
  dark: "#10141c",
};

interface ThemeContextValue {
  pref: ThemePref;
  resolved: ResolvedTheme;
  setPref: (pref: ThemePref) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function systemTheme(): ResolvedTheme {
  return matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function readInitialPref(): ThemePref {
  // Only an explicit light/dark is stored; anything else means "system".
  const stored = getCookie(COOKIE_KEY);
  return stored === "light" || stored === "dark" ? stored : "system";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [pref, setPrefState] = useState<ThemePref>(readInitialPref);
  const [system, setSystem] = useState<ResolvedTheme>(systemTheme);

  // Track OS preference so "system" updates live.
  useEffect(() => {
    const mq = matchMedia(DARK_QUERY);
    const onChange = () => setSystem(mq.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const resolved: ResolvedTheme = pref === "system" ? system : pref;

  useEffect(() => {
    document.documentElement.dataset.theme = resolved;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", META_COLOR[resolved]);
  }, [resolved]);

  const setPref = useCallback((next: ThemePref) => {
    setPrefState(next);
    // Persist only an explicit choice; "system" clears the cookie so a fresh
    // load falls back to the OS preference.
    if (next === "system") deleteCookie(COOKIE_KEY);
    else setCookie(COOKIE_KEY, next);
  }, []);

  const value = useMemo(
    () => ({ pref, resolved, setPref }),
    [pref, resolved, setPref],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
