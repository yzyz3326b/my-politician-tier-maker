# MY Tier — Setup Guide

## Prerequisites

Install **Node.js** (v18+) from https://nodejs.org/

## Run locally

```bash
cd my-politician-tier-maker
npm install
npm run dev
```

Then open http://localhost:3000

## Add politician photos

Photos go in `public/politicians/` as JPEG files named after the politician's `id` in `politicians.json`.

Example: `public/politicians/anwar-ibrahim.jpg`

**Recommended size:** 200×200 px square, cropped to face. Casual/candid photos are fine.

**Sources:** Wikipedia Commons, official social media (public posts), party press kits.

Without photos, a grey silhouette placeholder shows instead.

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Add more politicians

Edit `src/data/politicians.json` and add a new entry following the existing format:

```json
{
  "id": "unique-kebab-id",
  "name": "Full Name",
  "party": "PKR",
  "coalition": "PH",
  "role": "MP for Somewhere",
  "state": "Selangor",
  "photoUrl": "/politicians/unique-kebab-id.jpg",
  "wikiUrl": "https://en.wikipedia.org/wiki/..."
}
```

Then add the photo to `public/politicians/`.

## User submissions

Submissions from `/submit` are saved to `submissions-queue.json` in the project root.
Review them manually and copy approved entries into `politicians.json`.

A full admin UI with Supabase is planned for Phase 3.
