import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — MY Tier",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">About MY Tier</h1>
        <p className="text-gray-400 text-sm mt-1">Malaysian Politician Tier Maker</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-white">What is this?</h2>
        <p className="text-gray-400 leading-relaxed">
          MY Tier is a drag-and-drop tier list maker specifically for Malaysian politicians. You can
          rank them from S (the best) to F (the worst) based on your own subjective assessment of
          their performance. This site is purely for entertainment and to spark discussion — not
          political campaigning.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Disclaimer</h2>
        <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4 text-sm text-yellow-200 leading-relaxed space-y-2">
          <p>
            <strong>This site is for entertainment purposes only.</strong> The rankings and tier
            placements represent the subjective opinions of individual users and do not reflect the
            views of the site creator or any political party.
          </p>
          <p>
            This site is not affiliated with, endorsed by, or connected to any Malaysian political
            party, coalition, or government body.
          </p>
          <p>
            No content on this site constitutes defamation, slander, or political endorsement.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Photo Sources</h2>
        <p className="text-gray-400 leading-relaxed text-sm">
          All politician photos are sourced from public domain or Creative Commons–licensed sources
          including Wikipedia Commons, official party websites, and Bernama press releases. Photos
          are stored locally and not hotlinked.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Add a Politician</h2>
        <p className="text-gray-400 text-sm">
          Anyone can{" "}
          <a href="/submit" className="text-yellow-400 underline hover:text-yellow-300">
            submit a politician
          </a>{" "}
          to be added to the pool. Submissions are reviewed before going live to ensure quality and
          accuracy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Tech Stack</h2>
        <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
          <li>Next.js 14 (App Router)</li>
          <li>TypeScript + Tailwind CSS</li>
          <li>@dnd-kit for drag and drop</li>
          <li>html2canvas for PNG export</li>
        </ul>
      </section>
    </div>
  );
}
