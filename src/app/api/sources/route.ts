import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = process.env.DATA_DIR || "/tmp/content-pipeline";
const SOURCES_FILE = path.join(DATA_DIR, "sources.json");

export async function GET() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(SOURCES_FILE, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({
      useAI: true,
      customSources: "",
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const sources = await req.json();
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(SOURCES_FILE, JSON.stringify(sources, null, 2));
    return NextResponse.json({ success: true, sources });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
