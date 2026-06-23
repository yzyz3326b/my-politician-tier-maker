"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Politician, Party, POOL_ID, CoalitionKey } from "@/types";
import PoliticianCard from "./PoliticianCard";

interface Props {
  politicianIds: string[];
  allPoliticians: Politician[];
  partiesMap: Record<string, Party>;
  activeCoalition: CoalitionKey | "ALL";
  searchQuery: string;
  onRemovePolitician: (id: string) => void;
}

export default function PoliticianPool({
  politicianIds,
  allPoliticians,
  partiesMap,
  activeCoalition,
  searchQuery,
  onRemovePolitician,
}: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: POOL_ID });

  const poolPoliticians = politicianIds
    .map((id) => allPoliticians.find((p) => p.id === id))
    .filter((p): p is Politician => {
      if (!p) return false;
      if (activeCoalition !== "ALL" && p.coalition !== activeCoalition) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[140px] rounded-lg p-3 transition-colors"
      style={{ backgroundColor: isOver ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)" }}
    >
      {poolPoliticians.length === 0 ? (
        <div className="flex items-center justify-center h-[100px] text-gray-500 text-sm">
          {politicianIds.length === 0
            ? "All politicians ranked!"
            : "No politicians match this filter."}
        </div>
      ) : (
        <SortableContext items={poolPoliticians.map((p) => p.id)} strategy={rectSortingStrategy}>
          <div className="flex flex-wrap gap-2">
            {poolPoliticians.map((p) => (
              <PoliticianCard
                key={p.id}
                politician={p}
                party={partiesMap[p.party]}
                onRemove={() => onRemovePolitician(p.id)}
              />
            ))}
          </div>
        </SortableContext>
      )}
    </div>
  );
}
