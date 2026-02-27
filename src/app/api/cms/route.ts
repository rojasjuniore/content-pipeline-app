import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = process.env.DATA_DIR || "/tmp/content-pipeline";
const CMS_FILE = path.join(DATA_DIR, "cms.json");

export async function GET() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(CMS_FILE, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({
      platform: "wordpress",
      siteUrl: "",
      username: "",
      apiKey: "",
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const cms = await req.json();
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(CMS_FILE, JSON.stringify(cms, null, 2));
    return NextResponse.json({ success: true, cms });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
