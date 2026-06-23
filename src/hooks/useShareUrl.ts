"use client";

import { useCallback } from "react";
import { TierConfig } from "@/types";

export function useShareUrl() {
  const encode = useCallback(
    (tiers: TierConfig[], items: Record<string, string[]>): string => {
      const payload: Record<string, string[]> = {};
      tiers.forEach((t) => { payload[t.label] = items[t.id] || []; });
      const json = JSON.stringify(payload);
      const encoded = btoa(unescape(encodeURIComponent(json)));
      const url = new URL(window.location.href);
      url.searchParams.set("state", encoded);
      return url.toString();
    },
    []
  );

  const copyShareUrl = useCallback(
    async (tiers: TierConfig[], items: Record<string, string[]>) => {
      const url = encode(tiers, items);
      await navigator.clipboard.writeText(url);
    },
    [encode]
  );

  const decodeFromUrl = useCallback((): Record<string, string[]> | null => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("state");
    if (!encoded) return null;
    try {
      const json = decodeURIComponent(escape(atob(encoded)));
      return JSON.parse(json);
    } catch {
      return null;
    }
  }, []);

  return { copyShareUrl, decodeFromUrl };
}
