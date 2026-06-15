import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "../api/types";

type Fetcher<T> = (lang: Lang, signal?: AbortSignal) => Promise<T>;

interface WeatherState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface Options {
  /** Poll interval in milliseconds. Omit for fetch-on-mount/lang-change only. */
  pollMs?: number;
}

/**
 * Generic loader for an HKO endpoint. Re-fetches whenever `lang` changes,
 * optionally polls on an interval, and aborts in-flight requests on cleanup.
 */
export function useWeather<T>(
  fetcher: Fetcher<T>,
  lang: Lang,
  options: Options = {},
): WeatherState<T> {
  const { pollMs } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Bump to force a manual refetch.
  const [nonce, setNonce] = useState(0);

  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const refetch = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    const load = async () => {
      try {
        setError(null);
        const result = await fetcherRef.current(lang, controller.signal);
        if (active) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (controller.signal.aborted || !active) return;
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    load();

    let timer: ReturnType<typeof setInterval> | undefined;
    if (pollMs) {
      timer = setInterval(load, pollMs);
    }

    return () => {
      active = false;
      controller.abort();
      if (timer) clearInterval(timer);
    };
  }, [lang, pollMs, nonce]);

  return { data, loading, error, refetch };
}
