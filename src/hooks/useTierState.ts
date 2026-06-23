"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { TierConfig, DEFAULT_TIERS, POOL_ID, Politician } from "@/types";
import staticPoliticiansData from "@/data/politicians.json";

const staticPoliticians = staticPoliticiansData as Politician[];
const CUSTOM_KEY = "mptm-custom-politicians";

function buildInitialItems(tiers: TierConfig[], extraIds: string[] = []): Record<string, string[]> {
  const items: Record<string, string[]> = {
    [POOL_ID]: [...staticPoliticians.map((p) => p.id), ...extraIds],
  };
  tiers.forEach((t) => { items[t.id] = []; });
  return items;
}

export function useTierState() {
  const [tiers, setTiers] = useState<TierConfig[]>(DEFAULT_TIERS);
  const [items, setItems] = useState<Record<string, string[]>>(() =>
    buildInitialItems(DEFAULT_TIERS)
  );
  const [customPoliticians, setCustomPoliticians] = useState<Politician[]>([]);

  // Load custom politicians from localStorage after mount (localStorage unavailable on server)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CUSTOM_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as Politician[];
      if (!parsed.length) return;
      setCustomPoliticians(parsed);
      setItems((prev) => {
        const existing = new Set(Object.values(prev).flat());
        const toAdd = parsed.map((p) => p.id).filter((id) => !existing.has(id));
        if (!toAdd.length) return prev;
        return { ...prev, [POOL_ID]: [...prev[POOL_ID], ...toAdd] };
      });
    } catch {}
  }, []);

  const allPoliticians = useMemo(
    () => [...staticPoliticians, ...customPoliticians],
    [customPoliticians]
  );

  const moveItem = useCallback(
    (politicianId: string, fromContainer: string, toContainer: string, toIndex?: number) => {
      setItems((prev) => {
        const next = { ...prev };
        next[fromContainer] = next[fromContainer].filter((id) => id !== politicianId);
        const dest = [...(next[toContainer] || [])];
        if (toIndex !== undefined) {
          dest.splice(toIndex, 0, politicianId);
        } else {
          dest.push(politicianId);
        }
        next[toContainer] = dest;
        return next;
      });
    },
    []
  );

  const reorderWithin = useCallback((containerId: string, oldIndex: number, newIndex: number) => {
    setItems((prev) => {
      const list = [...prev[containerId]];
      const [item] = list.splice(oldIndex, 1);
      list.splice(newIndex, 0, item);
      return { ...prev, [containerId]: list };
    });
  }, []);

  const resetAll = useCallback(() => {
    setItems((prev) => {
      const customIds = customPoliticians.map((p) => p.id);
      return buildInitialItems(tiers, customIds);
    });
  }, [tiers, customPoliticians]);

  const renameLabel = useCallback((tierId: string, newLabel: string) => {
    setTiers((prev) => prev.map((t) => (t.id === tierId ? { ...t, label: newLabel } : t)));
  }, []);

  const resetLabels = useCallback(() => {
    setTiers(DEFAULT_TIERS);
  }, []);

  const addTier = useCallback(() => {
    const id = `custom-${Date.now()}`;
    const newTier: TierConfig = { id, label: "?", color: "#888888", rowColor: "rgba(136,136,136,0.12)" };
    setTiers((prev) => [...prev, newTier]);
    setItems((prev) => ({ ...prev, [id]: [] }));
  }, []);

  const removeTier = useCallback((tierId: string) => {
    setItems((prev) => {
      const returning = prev[tierId] || [];
      const next = { ...prev };
      delete next[tierId];
      next[POOL_ID] = [...next[POOL_ID], ...returning];
      return next;
    });
    setTiers((prev) => prev.filter((t) => t.id !== tierId));
  }, []);

  const addCustomPolitician = useCallback((name: string, photoDataUrl: string) => {
    const id = `custom-${Date.now()}`;
    const newP: Politician = {
      id,
      name: name.trim(),
      party: "CUSTOM",
      coalition: "IND",
      role: "Custom",
      state: "Custom",
      photoUrl: photoDataUrl,
    };
    setCustomPoliticians((prev) => {
      const next = [...prev, newP];
      try { localStorage.setItem(CUSTOM_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
    setItems((prev) => ({ ...prev, [POOL_ID]: [...prev[POOL_ID], id] }));
  }, []);

  const removePolitician = useCallback((id: string) => {
    // Remove from every container
    setItems((prev) => {
      const next: Record<string, string[]> = {};
      for (const [k, v] of Object.entries(prev)) {
        next[k] = v.filter((pid) => pid !== id);
      }
      return next;
    });
    // If it was a custom politician, remove from persistent storage too
    setCustomPoliticians((prev) => {
      if (!prev.some((p) => p.id === id)) return prev;
      const next = prev.filter((p) => p.id !== id);
      try { localStorage.setItem(CUSTOM_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  return {
    tiers,
    items,
    allPoliticians,
    moveItem,
    reorderWithin,
    resetAll,
    renameLabel,
    resetLabels,
    addTier,
    removeTier,
    addCustomPolitician,
    removePolitician,
  };
}
