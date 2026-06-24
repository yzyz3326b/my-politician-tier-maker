import type { Metadata } from "next";
import "./globals.css";

// Replace with your real Publisher ID after AdSense approval
const ADSENSE_PUBLISHER_ID = "ca-pub-7124926890944153";

export const metadata: Metadata = {
  title: "MY Tier Maker — Rank Malaysian Politicians",
  description:
    "Drag and drop Malaysian politicians into your own tier list. Who performs S-tier? Who belongs in F? You decide.",
  keywords: ["Malaysia", "politician", "tier list", "tier maker", "ranking", "politics"],
  other: {
    "google-adsense-account": ADSENSE_PUBLISHER_ID,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-[#0d0d0d] text-gray-100">
        <header className="border-b border-white/10 bg-[#111]">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white">
                MY<span className="text-yellow-400">Tier</span>
              </span>
              <span className="text-xs text-gray-400 font-medium hidden sm:block">
                Malaysian Politician Tier Maker
              </span>
            </a>
            <nav className="flex items-center gap-4 text-sm text-gray-400">
              <a href="/tiermaker" className="hover:text-white transition-colors">
                Rank
              </a>
              <a href="/politicians" className="hover:text-white transition-colors">
                Politicians
              </a>
              <a href="/about" className="hover:text-white transition-colors">
                About
              </a>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>

        <footer className="border-t border-white/10 mt-16 py-6 text-center text-xs text-gray-600">
          <p>
            For entertainment purposes only. Not affiliated with any political party.
            Politician photos sourced from public domain / CC-licensed sources.
          </p>
          <p className="mt-1">
            <a href="/about" className="hover:text-gray-400">
              About
            </a>
            {" · "}
            <a href="/privacy" className="hover:text-gray-400">
              Privacy Policy
            </a>
            {" · "}
            <a
              href="https://ko-fi.com/YOUR_KOFI_NAME"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              Support ☕
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
