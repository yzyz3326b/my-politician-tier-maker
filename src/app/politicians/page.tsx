import { Metadata } from "next";
import allPoliticiansData from "@/data/politicians.json";
import partiesData from "@/data/parties.json";
import { Politician, Party } from "@/types";
import PoliticianDirectoryCard from "@/components/PoliticianDirectoryCard";

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
          You can add custom politicians directly on the{" "}
          <a href="/tiermaker" className="underline text-yellow-400 hover:text-yellow-300">
            Tier Maker
          </a>{" "}
          page.
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
              {pols.map((p) => (
                <PoliticianDirectoryCard
                  key={p.id}
                  politician={p}
                  party={partiesMap[p.party]}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
