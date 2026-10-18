import { useEffect, useSyncExternalStore } from "react";
import { statsConfig as config } from "../data/config";
import type { StatsResponse } from "../data/types";

type Snapshot = {
  data: StatsResponse | null;
  loading: boolean;
  failed: boolean;
};
let snapshot: Snapshot = { data: null, loading: true, failed: false };
const listeners = new Set<() => void>();
let consumers = 0;
let controller: AbortController | null = null;
let pending: Promise<void> | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
let retryMs: number = config.refreshMs;
let lastAttempt = 0;
let releaseTimer: ReturnType<typeof setTimeout> | undefined;
const emit = () => listeners.forEach((listener) => listener());
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
function schedule() {
  clearTimeout(timer);
  if (consumers && !document.hidden)
    timer = setTimeout(() => {
      void refresh();
    }, retryMs);
}
async function refresh() {
  if (pending || document.hidden || !consumers) return pending;
  clearTimeout(timer);
  const active = new AbortController();
  controller = active;
  lastAttempt = Date.now();
  const timeout = setTimeout(() => active.abort(), config.clientTimeoutMs);
  pending = (async () => {
    try {
      const response = await fetch(config.endpoint, { signal: active.signal });
      if (!response.ok) throw new Error("Stats unavailable");
      const data = (await response.json()) as StatsResponse;
      if (
        !Array.isArray(data.games) ||
        !Array.isArray(data.topGames) ||
        typeof data.stale !== "boolean"
      )
        throw new Error("Invalid stats");
      snapshot = {
        data: data.updatedAt
          ? data
          : snapshot.data
            ? { ...snapshot.data, stale: true }
            : data,
        loading: false,
        failed: data.stale,
      };
      retryMs = data.stale
        ? Math.min(retryMs * config.backoffFactor, config.maxBackoffMs)
        : config.refreshMs;
    } catch {
      if (!consumers) return;
      snapshot = {
        data: snapshot.data ? { ...snapshot.data, stale: true } : null,
        loading: false,
        failed: true,
      };
      retryMs = Math.min(retryMs * config.backoffFactor, config.maxBackoffMs);
    } finally {
      clearTimeout(timeout);
      controller = null;
      pending = null;
      emit();
      schedule();
    }
  })();
  return pending;
}
function visibility() {
  if (document.hidden) clearTimeout(timer);
  else if (Date.now() - lastAttempt >= retryMs) void refresh();
  else schedule();
}
export function useRobloxStats() {
  const state = useSyncExternalStore(subscribe, () => snapshot);
  useEffect(() => {
    clearTimeout(releaseTimer);
    consumers++;
    if (consumers === 1) {
      document.addEventListener("visibilitychange", visibility);
      if (!snapshot.data || Date.now() - lastAttempt >= config.refreshMs)
        void refresh();
      else schedule();
    }
    return () => {
      consumers--;
      if (!consumers) {
        document.removeEventListener("visibilitychange", visibility);
        clearTimeout(timer);
        // Allows React StrictMode's immediate resubscription without duplicate requests.
        releaseTimer = setTimeout(() => {
          if (!consumers) controller?.abort();
        }, 0);
      }
    };
  }, []);
  return { ...state, refresh };
}
