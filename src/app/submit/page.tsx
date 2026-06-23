"use client";

import { useState } from "react";

const COALITIONS = ["PH", "BN", "PN", "GPS", "GRS", "MUDA", "IND"];

export default function SubmitPage() {
  const [form, setForm] = useState({
    name: "",
    party: "",
    coalition: "",
    role: "",
    state: "",
    photoUrl: "",
    wikiUrl: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="max-w-lg mx-auto text-center space-y-4 py-16">
        <div className="text-5xl">🎉</div>
        <h1 className="text-2xl font-bold text-white">Submission Received!</h1>
        <p className="text-gray-400">
          Thanks for the suggestion. We&apos;ll review it and add them to the pool soon.
        </p>
        <a href="/tiermaker" className="inline-block mt-4 text-yellow-400 underline">
          Back to Tier Maker
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Submit a Politician</h1>
        <p className="text-gray-400 text-sm mt-1">
          Missing someone from the pool? Fill in the details below and we&apos;ll review your
          submission.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Full Name *" name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Siti Kasim" />
        <Field label="Party" name="party" value={form.party} onChange={handleChange} placeholder="e.g. PKR, UMNO, DAP..." />

        <div className="space-y-1">
          <label className="text-sm text-gray-300 font-medium">Coalition / Group</label>
          <select
            name="coalition"
            value={form.coalition}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-white/30"
          >
            <option value="">Select coalition...</option>
            {COALITIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <Field label="Current Role / Position" name="role" value={form.role} onChange={handleChange} placeholder="e.g. MP for Bukit Bintang" />
        <Field label="State" name="state" value={form.state} onChange={handleChange} placeholder="e.g. Federal, Selangor..." />
        <Field label="Photo URL (optional)" name="photoUrl" value={form.photoUrl} onChange={handleChange} placeholder="https://..." type="url" />
        <Field label="Wikipedia URL (optional)" name="wikiUrl" value={form.wikiUrl} onChange={handleChange} placeholder="https://en.wikipedia.org/wiki/..." type="url" />

        <button
          type="submit"
          disabled={status === "submitting" || !form.name}
          className="w-full bg-yellow-400 text-black font-bold py-2.5 rounded-lg hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === "submitting" ? "Submitting..." : "Submit for Review"}
        </button>

        {status === "error" && (
          <p className="text-red-400 text-sm text-center">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}

function Field({
  label, name, value, onChange, required, placeholder, type = "text",
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; placeholder?: string; type?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-300 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-white/30"
      />
    </div>
  );
}
