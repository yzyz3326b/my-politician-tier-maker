"use client";

import { useRef, useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";
import { Party, CoalitionKey, POOL_ID } from "@/types";
import { useTierState } from "@/hooks/useTierState";
import { useShareUrl } from "@/hooks/useShareUrl";
import TierRow from "./TierRow";
import PoliticianPool from "./PoliticianPool";
import PartyFilter from "./PartyFilter";
import { PoliticianCardOverlay } from "./PoliticianCard";
import partiesData from "@/data/parties.json";

const partiesMap: Record<string, Party> = Object.fromEntries(
  (partiesData as Party[]).map((p) => [p.id, p])
);

const collisionDetection = (args: Parameters<typeof pointerWithin>[0]) => {
  const hit = pointerWithin(args);
  if (hit.length > 0) return hit;
  return rectIntersection(args);
};

export default function TierBoard() {
  const {
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
  } = useTierState();
  const { copyShareUrl } = useShareUrl();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [coalition, setCoalition] = useState<CoalitionKey | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  // Upload new politician form state
  const [uploadName, setUploadName] = useState("");
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 8 } })
  );

  const findContainer = useCallback(
    (id: string): string | null => {
      if (id === POOL_ID || tiers.some((t) => t.id === id)) return id;
      for (const [containerId, ids] of Object.entries(items)) {
        if (ids.includes(id)) return containerId;
      }
      return null;
    },
    [items, tiers]
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    const from = findContainer(active.id as string);
    const to = findContainer(over.id as string);
    if (!from || !to || from === to) return;

    const toItems = items[to] || [];
    const overIndex = toItems.indexOf(over.id as string);
    const insertAt = overIndex >= 0 ? overIndex : toItems.length;

    moveItem(active.id as string, from, to, insertAt);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) { setActiveId(null); return; }

    const from = findContainer(active.id as string);
    const to = findContainer(over.id as string);

    if (from && to && from === to) {
      const list = items[from];
      const oldIdx = list.indexOf(active.id as string);
      const newIdx = list.indexOf(over.id as string);
      if (oldIdx !== newIdx && newIdx >= 0) reorderWithin(from, oldIdx, newIdx);
    }

    setActiveId(null);
  };

  const handleShare = async () => {
    await copyShareUrl(tiers, items);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSavePng = async () => {
    if (!boardRef.current) return;
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(boardRef.current, {
      backgroundColor: "#111111",
      scale: 2,
      useCORS: true,
    });
    const link = document.createElement("a");
    link.download = "malaysia-tier-list.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleUploadFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleAddPolitician = () => {
    if (!uploadPreview || !uploadName.trim()) return;
    addCustomPolitician(uploadName, uploadPreview);
    setUploadName("");
    setUploadPreview(null);
  };

  const activePolitician = activeId ? allPoliticians.find((p) => p.id === activeId) : null;

  return (
    <div className="space-y-4">
      {/* Action bar */}
      <div className="flex flex-wrap gap-2 justify-end">
        <button
          onClick={resetLabels}
          className="px-3 py-1.5 text-sm rounded border border-gray-600 text-gray-300 hover:bg-white/10 transition-colors"
        >
          Reset Labels
        </button>
        <button
          onClick={addTier}
          className="px-3 py-1.5 text-sm rounded border border-gray-600 text-gray-300 hover:bg-white/10 transition-colors"
        >
          + Add Tier
        </button>
        <button
          onClick={resetAll}
          className="px-3 py-1.5 text-sm rounded border border-red-700 text-red-400 hover:bg-red-900/30 transition-colors"
        >
          Reset All
        </button>
        <button
          onClick={handleSavePng}
          className="px-3 py-1.5 text-sm rounded bg-blue-700 text-white hover:bg-blue-600 transition-colors"
        >
          Save as PNG
        </button>
        <button
          onClick={handleShare}
          className="px-3 py-1.5 text-sm rounded bg-green-700 text-white hover:bg-green-600 transition-colors"
        >
          {copied ? "Copied!" : "Share"}
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {/* Tier rows */}
        <div ref={boardRef} className="space-y-1 bg-[#111] p-2 rounded-lg">
          {tiers.map((tier) => (
            <TierRow
              key={tier.id}
              tier={tier}
              politicianIds={items[tier.id] || []}
              allPoliticians={allPoliticians}
              partiesMap={partiesMap}
              onRename={renameLabel}
              onRemove={removeTier}
              onRemovePolitician={removePolitician}
            />
          ))}
        </div>

        {/* Pool section */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <PartyFilter active={coalition} onChange={setCoalition} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search politician..."
              className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 outline-none focus:border-white/30"
            />
          </div>

          {/* Upload new politician box */}
          <div className="flex flex-wrap items-center gap-2 px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.03]">
            <span className="text-xs text-gray-400 font-medium shrink-0">Add politician:</span>

            <label className="shrink-0 cursor-pointer">
              <span className="px-2 py-1 text-xs rounded border border-white/20 text-gray-300 hover:bg-white/10 transition-colors">
                {uploadPreview ? "Change photo" : "Choose photo"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUploadFileChange}
              />
            </label>

            {uploadPreview && (
              <img
                src={uploadPreview}
                alt="preview"
                className="w-8 h-8 rounded object-cover border border-white/20 shrink-0"
              />
            )}

            <input
              value={uploadName}
              onChange={(e) => setUploadName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleAddPolitician(); }}
              placeholder="Name..."
              className="flex-1 min-w-[120px] bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-gray-500 outline-none focus:border-white/30"
            />

            <button
              onClick={handleAddPolitician}
              disabled={!uploadPreview || !uploadName.trim()}
              className="shrink-0 px-2.5 py-1 text-xs rounded bg-blue-700 text-white hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              + Add to pool
            </button>
          </div>

          <PoliticianPool
            politicianIds={items[POOL_ID] || []}
            allPoliticians={allPoliticians}
            partiesMap={partiesMap}
            activeCoalition={coalition}
            searchQuery={search}
            onRemovePolitician={removePolitician}
          />
        </div>

        <DragOverlay dropAnimation={null}>
          {activePolitician && (
            <PoliticianCardOverlay
              politician={activePolitician}
              party={partiesMap[activePolitician.party]}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
