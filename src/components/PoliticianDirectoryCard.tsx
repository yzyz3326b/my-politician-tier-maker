"use client";

import { Politician, Party } from "@/types";

interface Props {
  politician: Politician;
  party: Party | undefined;
}

export default function PoliticianDirectoryCard({ politician, party }: Props) {
  return (
    <a
      href={politician.wikiUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center text-center gap-2 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors group"
    >
      <div
        className="w-16 h-16 rounded-full overflow-hidden border-2"
        style={{ borderColor: party?.color ?? "#555" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={politician.photoUrl}
          alt={politician.name}
          width={64}
          height={64}
          className="object-cover w-full h-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/politicians/placeholder.svg";
          }}
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-white group-hover:text-yellow-300 transition-colors leading-tight">
          {politician.name}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{politician.role}</p>
        {party && (
          <span
            className="inline-block text-[10px] font-bold px-1.5 rounded mt-1"
            style={{ backgroundColor: party.color, color: party.textColor }}
          >
            {party.shortName}
          </span>
        )}
      </div>
    </a>
  );
}
