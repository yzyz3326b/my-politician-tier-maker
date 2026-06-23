"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

const STORAGE_KEY = "mptm-photo-overrides";

interface PhotoOverridesContextValue {
  photoOverrides: Record<string, string>;
  setPhotoOverride: (id: string, dataUrl: string) => void;
  clearPhotoOverride: (id: string) => void;
}

const PhotoOverridesContext = createContext<PhotoOverridesContextValue>({
  photoOverrides: {},
  setPhotoOverride: () => {},
  clearPhotoOverride: () => {},
});

export function PhotoOverridesProvider({ children }: { children: ReactNode }) {
  const [photoOverrides, setPhotoOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setPhotoOverrides(JSON.parse(stored));
    } catch {}
  }, []);

  const setPhotoOverride = useCallback((id: string, dataUrl: string) => {
    setPhotoOverrides((prev) => {
      const next = { ...prev, [id]: dataUrl };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const clearPhotoOverride = useCallback((id: string) => {
    setPhotoOverrides((prev) => {
      const next = { ...prev };
      delete next[id];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  return (
    <PhotoOverridesContext.Provider value={{ photoOverrides, setPhotoOverride, clearPhotoOverride }}>
      {children}
    </PhotoOverridesContext.Provider>
  );
}

export function usePhotoOverrides() {
  return useContext(PhotoOverridesContext);
}
