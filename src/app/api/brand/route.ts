import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = process.env.DATA_DIR || "/tmp/content-pipeline";
const BRAND_FILE = path.join(DATA_DIR, "brand.json");

export async function GET() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(BRAND_FILE, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({
      name: "",
      website: "",
      industry: "",
      tone: "professional",
      audience: "",
      keywords: "",
      neverInclude: "",
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const brand = await req.json();
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(BRAND_FILE, JSON.stringify(brand, null, 2));
    return NextResponse.json({ success: true, brand });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
