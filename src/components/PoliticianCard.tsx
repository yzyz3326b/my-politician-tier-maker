"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Politician, Party } from "@/types";

interface Props {
  politician: Politician;
  party: Party | undefined;
  isDragOverlay?: boolean;
  onRemove?: () => void;
  isSelected?: boolean;
  onTap?: () => void;
  showName?: boolean;
}

export default function PoliticianCard({ politician, party, isDragOverlay, onRemove, isSelected, onTap, showName = true }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: politician.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? undefined : transition,
    opacity: isDragging ? 0.3 : 1,
    cursor: isDragOverlay ? "grabbing" : "grab",
  };

  const borderColor = party?.color ?? "#555";
  const imgSize = showName ? 80 : 96;
  const outerW = showName ? "w-[90px]" : "w-[100px]";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onTap ? (e) => { e.stopPropagation(); onTap(); } : undefined}
      className={`relative flex flex-col items-center ${outerW} shrink-0 select-none`}
      title={`${politician.name} — ${politician.role}`}
    >
      <div
        className={`rounded overflow-hidden border-2 transition-all ${isSelected ? "ring-2 ring-yellow-400 ring-offset-2 ring-offset-black scale-105" : ""}`}
        style={{ borderColor, width: imgSize, height: imgSize }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={politician.photoUrl}
          alt={politician.name}
          width={imgSize}
          height={imgSize}
          className="object-cover w-full h-full"
          draggable={false}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/politicians/placeholder.svg";
          }}
        />
      </div>

      {/* Remove button — always visible, top-right corner */}
      {!isDragOverlay && onRemove && (
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="absolute top-0 right-[3px] w-[16px] h-[16px] flex items-center justify-center bg-gray-800/90 hover:bg-red-600 text-white text-[11px] font-bold rounded-full transition-colors z-10 leading-none"
          title="Remove"
        >
          ×
        </button>
      )}

      {showName && (
        <span className="mt-1 text-[10px] text-center text-gray-200 leading-tight max-w-[88px] line-clamp-2">
          {politician.name}
        </span>
      )}
    </div>
  );
}

export function PoliticianCardOverlay({
  politician,
  party,
}: {
  politician: Politician;
  party: Party | undefined;
}) {
  const borderColor = party?.color ?? "#555";

  return (
    <div className="flex flex-col items-center w-[90px] select-none cursor-grabbing">
      <div
        className="w-[80px] h-[80px] rounded overflow-hidden border-2 shadow-2xl ring-2 ring-white/30"
        style={{ borderColor }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={politician.photoUrl}
          alt={politician.name}
          width={80}
          height={80}
          className="object-cover w-full h-full"
          draggable={false}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/politicians/placeholder.svg";
          }}
        />
      </div>
      <span className="mt-1 text-[10px] text-center text-gray-200 leading-tight max-w-[88px] line-clamp-2">
        {politician.name}
      </span>
    </div>
  );
}
