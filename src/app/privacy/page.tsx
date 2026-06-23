import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — MY Tier",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 py-8 text-gray-300">
      <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
      <p className="text-sm text-gray-500">Last updated: June 2026</p>

      <section className="space-y-2">
        <h2 className="font-semibold text-white">1. Information We Collect</h2>
        <p className="text-sm leading-relaxed">
          MY Tier does not collect any personally identifiable information. Your tier list is stored
          locally in your browser (localStorage) and is never sent to our servers.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold text-white">2. Cookies & Advertising</h2>
        <p className="text-sm leading-relaxed">
          This site uses Google AdSense to display advertisements. Google may use cookies to serve
          ads based on your prior visits to this or other websites. You can opt out of personalised
          advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Google Ads Settings
          </a>
          .
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold text-white">3. Third-Party Services</h2>
        <p className="text-sm leading-relaxed">
          We use Google AdSense for advertising. Please refer to{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Google&apos;s Privacy Policy
          </a>{" "}
          for details on how Google handles data.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold text-white">4. Data Retention</h2>
        <p className="text-sm leading-relaxed">
          Custom politicians you add and your tier list title are stored only in your browser&apos;s
          localStorage. Clearing your browser data removes this information permanently.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold text-white">5. Contact</h2>
        <p className="text-sm leading-relaxed">
          For any privacy-related questions, contact us via the{" "}
          <a href="/about" className="underline hover:text-white">
            About
          </a>{" "}
          page.
        </p>
      </section>
    </div>
  );
}
