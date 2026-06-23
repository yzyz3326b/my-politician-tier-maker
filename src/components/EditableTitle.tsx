"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "mptm-title";
const DEFAULT_TITLE = "Malaysian Politician Tier Maker";

export default function EditableTitle() {
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(DEFAULT_TITLE);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) { setTitle(stored); setDraft(stored); }
    } catch {}
  }, []);

  const commit = () => {
    const value = draft.trim() || DEFAULT_TITLE;
    setTitle(value);
    setDraft(value);
    try { localStorage.setItem(STORAGE_KEY, value); } catch {}
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") { setEditing(false); setDraft(title); }
        }}
        className="text-2xl font-bold text-white bg-transparent border-b-2 border-white/50 outline-none w-full"
        maxLength={80}
      />
    );
  }

  return (
    <h1
      className="text-2xl font-bold text-white cursor-text flex items-center gap-2 group"
      onClick={() => { setEditing(true); setDraft(title); }}
      title="Click to rename"
    >
      {title}
      <span className="text-xs text-gray-600 font-normal opacity-0 group-hover:opacity-100 transition-opacity select-none">
        ✏️ edit
      </span>
    </h1>
  );
}
