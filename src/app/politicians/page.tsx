import Image from "next/image";
import { Metadata } from "next";
import allPoliticiansData from "@/data/politicians.json";
import partiesData from "@/data/parties.json";
import { Politician, Party } from "@/types";

export const metadata: Metadata = {
  title: "Politicians — MY Tier",
  description: "Browse all Malaysian politicians available in MY Tier.",
};

const allPoliticians = allPoliticiansData as Politician[];
const partiesMap: Record<string, Party> = Object.fromEntries(
  (partiesData as Party[]).map((p) => [p.id, p])
);

const COALITION_ORDER = ["PH", "BN", "PN", "GPS", "GRS", "MUDA", "IND"];

export default function PoliticiansPage() {
  const grouped: Record<string, Politician[]> = {};
  COALITION_ORDER.forEach((c) => { grouped[c] = []; });
  allPoliticians.forEach((p) => {
    if (!grouped[p.coalition]) grouped[p.coalition] = [];
    grouped[p.coalition].push(p);
  });

  const COALITION_LABELS: Record<string, string> = {
    PH: "Pakatan Harapan",
    BN: "Barisan Nasional",
    PN: "Perikatan Nasional",
    GPS: "Gabungan Parti Sarawak",
    GRS: "Gabungan Rakyat Sabah",
    MUDA: "Parti Muda",
    IND: "Independent / Others",
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-bold text-white">Politician Directory</h1>
        <p className="text-gray-400 text-sm mt-1">
          {allPoliticians.length} politicians across {COALITION_ORDER.length} coalitions/groups.
          Missing someone?{" "}
          <a href="/submit" className="underline text-yellow-400 hover:text-yellow-300">
            Submit them here.
          </a>
        </p>
      </div>

      {COALITION_ORDER.map((coalitionKey) => {
        const pols = grouped[coalitionKey];
        if (!pols || pols.length === 0) return null;
        return (
          <section key={coalitionKey} className="space-y-4">
            <h2 className="text-lg font-bold text-white border-b border-white/10 pb-2">
              {COALITION_LABELS[coalitionKey] ?? coalitionKey}
              <span className="text-gray-500 font-normal text-sm ml-2">({pols.length})</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {pols.map((p) => {
                const party = partiesMap[p.party];
                return (
                  <a
                    key={p.id}
                    href={p.wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-center gap-2 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors group"
                  >
                    <div
                      className="w-16 h-16 rounded-full overflow-hidden border-2"
                      style={{ borderColor: party?.color ?? "#555" }}
                    >
                      <Image
                        src={p.photoUrl}
                        alt={p.name}
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
                        {p.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{p.role}</p>
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
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
