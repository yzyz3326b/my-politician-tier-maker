"use client";

import { CoalitionKey } from "@/types";

const FILTERS: { key: CoalitionKey | "ALL"; label: string; color: string }[] = [
  { key: "ALL", label: "All", color: "#555555" },
  { key: "PH", label: "PH", color: "#0066CC" },
  { key: "BN", label: "BN", color: "#CC0000" },
  { key: "PN", label: "PN", color: "#006600" },
  { key: "GPS", label: "GPS", color: "#FF6600" },
  { key: "GRS", label: "GRS", color: "#CC6600" },
  { key: "MUDA", label: "Muda", color: "#9900CC" },
  { key: "IND", label: "Ind.", color: "#666666" },
];

interface Props {
  active: CoalitionKey | "ALL";
  onChange: (key: CoalitionKey | "ALL") => void;
}

export default function PartyFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((f) => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          className="px-3 py-1 rounded text-sm font-semibold transition-all border"
          style={{
            backgroundColor: active === f.key ? f.color : "transparent",
            borderColor: f.color,
            color: active === f.key ? "#fff" : f.color,
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
