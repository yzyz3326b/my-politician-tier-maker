import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import path from "path";

const QUEUE_FILE = path.join(process.cwd(), "submissions-queue.json");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, party, coalition, role, state, photoUrl, wikiUrl } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    let queue: object[] = [];
    try {
      const raw = await readFile(QUEUE_FILE, "utf-8");
      queue = JSON.parse(raw);
    } catch {
      queue = [];
    }

    queue.push({
      id: `submission-${Date.now()}`,
      name: name.trim(),
      party: party?.trim() ?? "",
      coalition: coalition?.trim() ?? "IND",
      role: role?.trim() ?? "",
      state: state?.trim() ?? "",
      photoUrl: photoUrl?.trim() ?? "",
      wikiUrl: wikiUrl?.trim() ?? "",
      submittedAt: new Date().toISOString(),
      approved: false,
    });

    await writeFile(QUEUE_FILE, JSON.stringify(queue, null, 2));
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Submit error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
