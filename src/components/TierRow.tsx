"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { TierConfig, Politician, Party } from "@/types";
import PoliticianCard from "./PoliticianCard";

interface Props {
  tier: TierConfig;
  politicianIds: string[];
  allPoliticians: Politician[];
  partiesMap: Record<string, Party>;
  onRename: (tierId: string, newLabel: string) => void;
  onRemove: (tierId: string) => void;
  onRemovePolitician: (id: string) => void;
  onTapPlace?: () => void;
}

export default function TierRow({ tier, politicianIds, allPoliticians, partiesMap, onRename, onRemove, onRemovePolitician, onTapPlace }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(tier.label);
  const { setNodeRef, isOver } = useDroppable({ id: tier.id });

  const rowPoliticians = politicianIds
    .map((id) => allPoliticians.find((p) => p.id === id))
    .filter((p): p is Politician => !!p);

  const commitRename = () => {
    setEditing(false);
    if (draft.trim()) onRename(tier.id, draft.trim());
    else setDraft(tier.label);
  };

  return (
    <div
      ref={setNodeRef}
      className="flex min-h-[100px] border border-white/10 rounded overflow-hidden"
      style={{ backgroundColor: isOver ? "rgba(255,255,255,0.08)" : tier.rowColor }}
    >
      {/* Label cell */}
      <div
        className="w-16 shrink-0 flex flex-col items-center justify-center gap-1 relative group"
        style={{ backgroundColor: tier.color }}
      >
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitRename}
            onKeyDown={(e) => { if (e.key === "Enter") commitRename(); if (e.key === "Escape") { setEditing(false); setDraft(tier.label); } }}
            className="w-12 text-center text-lg font-bold bg-transparent border-b border-white/60 text-white outline-none"
            maxLength={8}
          />
        ) : (
          <span
            className="text-xl font-bold text-white cursor-pointer select-none"
            onClick={() => { setEditing(true); setDraft(tier.label); }}
            title="Click to rename"
          >
            {tier.label}
          </span>
        )}
        <button
          onClick={() => onRemove(tier.id)}
          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-white/50 hover:text-white text-xs transition-opacity"
          title="Remove tier"
        >
          ×
        </button>
      </div>

      {/* Cards area */}
      <div className="flex-1 p-2" onClick={onTapPlace}>
        <SortableContext items={rowPoliticians.map((p) => p.id)} strategy={horizontalListSortingStrategy}>
          <div className="flex flex-wrap gap-2 min-h-[80px] items-start content-start">
            {rowPoliticians.map((p) => (
              <PoliticianCard
                key={p.id}
                politician={p}
                party={partiesMap[p.party]}
                onRemove={() => onRemovePolitician(p.id)}
                showName={false}
              />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
