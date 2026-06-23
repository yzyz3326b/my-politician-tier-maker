import Link from "next/link";
import AdUnit from "@/components/AdUnit";

const TIERS = [
  { label: "S", color: "#FF4D4D", example: "PM" },
  { label: "A", color: "#FF9F4D", example: "Ministers" },
  { label: "B", color: "#FFDF4D", example: "Okay MPs" },
  { label: "C", color: "#4DFF91", example: "Meh" },
  { label: "D", color: "#4D9FFF", example: "Not great" },
  { label: "F", color: "#C84DFF", example: "Disgrace" },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center space-y-6 pt-8">
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Rank Malaysian Politicians.
            <br />
            <span className="text-yellow-400">Your Call.</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Drag and drop 80+ Malaysian politicians across all major parties into your own tier list.
            Share it with friends. Start a debate.
          </p>
        </div>
        <Link
          href="/tiermaker"
          className="inline-block bg-yellow-400 text-black font-bold text-lg px-8 py-3 rounded-lg hover:bg-yellow-300 transition-colors"
        >
          Start Ranking
        </Link>
      </section>

      {/* Tier preview */}
      <section className="max-w-2xl mx-auto space-y-3">
        <h2 className="text-center text-gray-400 text-sm font-medium uppercase tracking-wider">
          S to F — You Decide
        </h2>
        <div className="rounded-xl overflow-hidden border border-white/10">
          {TIERS.map((t) => (
            <div
              key={t.label}
              className="flex items-center gap-4 border-b border-white/5 last:border-0"
            >
              <div
                className="w-14 h-12 flex items-center justify-center text-white font-black text-xl shrink-0"
                style={{ backgroundColor: t.color }}
              >
                {t.label}
              </div>
              <span className="text-gray-400 text-sm">{t.example}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Ad unit between tier preview and features */}
      <AdUnit slot="SLOT_ID_HOME" className="my-2" />

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {[
          {
            icon: "🏛️",
            title: "80+ Politicians",
            desc: "All major coalitions — PH, BN, PN, GPS, GRS, Muda, and Independents.",
          },
          {
            icon: "🖱️",
            title: "Drag & Drop",
            desc: "Works on desktop and mobile. Reorder within rows, move between tiers.",
          },
          {
            icon: "📤",
            title: "Share & Export",
            desc: "Copy a share link or save your tier list as a PNG image.",
          },
        ].map((f) => (
          <div key={f.title} className="bg-white/5 rounded-xl p-6 space-y-2">
            <div className="text-3xl">{f.icon}</div>
            <h3 className="font-bold text-white">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="text-center">
        <Link
          href="/tiermaker"
          className="inline-block border border-yellow-400 text-yellow-400 font-semibold px-6 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors"
        >
          Open Tier Maker →
        </Link>
      </section>
    </div>
  );
}
