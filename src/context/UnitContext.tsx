import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { TempUnit } from "../lib/temp";
import { getCookie, setCookie } from "../lib/cookies";

const COOKIE_KEY = "openhko.unit";

interface UnitContextValue {
  unit: TempUnit;
  setUnit: (unit: TempUnit) => void;
}

const UnitContext = createContext<UnitContextValue | null>(null);

function readInitialUnit(): TempUnit {
  return getCookie(COOKIE_KEY) === "F" ? "F" : "C";
}

export function UnitProvider({ children }: { children: ReactNode }) {
  const [unit, setUnitState] = useState<TempUnit>(readInitialUnit);

  const setUnit = useCallback((next: TempUnit) => setUnitState(next), []);

  useEffect(() => {
    setCookie(COOKIE_KEY, unit);
  }, [unit]);

  const value = useMemo(() => ({ unit, setUnit }), [unit, setUnit]);

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
}

export function useUnit(): UnitContextValue {
  const ctx = useContext(UnitContext);
  if (!ctx) {
    throw new Error("useUnit must be used within a UnitProvider");
  }
  return ctx;
}
