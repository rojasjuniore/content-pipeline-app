import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import Anthropic from "@anthropic-ai/sdk";

// Dynamic import for pdf-parse (CommonJS module)
const loadPdfParse = async () => {
  const pdfParse = await import("pdf-parse");
  return pdfParse.default || pdfParse;
};

const DATA_DIR = process.env.DATA_DIR || "/tmp/content-pipeline";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read PDF content
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    let textContent = "";
    
    try {
      const pdf = await loadPdfParse();
      const pdfData = await pdf(buffer);
      textContent = pdfData.text;
    } catch {
      return NextResponse.json({ error: "Failed to parse PDF" }, { status: 400 });
    }

    // Save original PDF
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(path.join(DATA_DIR, "brand-guideline.pdf"), buffer);
    await fs.writeFile(path.join(DATA_DIR, "brand-guideline.txt"), textContent);

    // Use AI to extract brand information
    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      // Return just the text if no API key
      return NextResponse.json({
        success: true,
        extracted: false,
        textContent: textContent.slice(0, 5000),
        message: "PDF uploaded. Configure ANTHROPIC_API_KEY for auto-extraction.",
      });
    }

    const anthropic = new Anthropic({ apiKey });

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `Analyze this brand guideline document and extract the key information. Return a JSON object with these fields:

- name: Brand name
- website: Website URL if mentioned
- industry: Industry/sector
- tone: Brand tone of voice (professional, casual, approachable, authoritative, inspirational)
- audience: Target audience description
- keywords: Important keywords/topics (comma-separated)
- neverInclude: Things to avoid in content (comma-separated)
- colors: Brand colors if mentioned
- tagline: Brand tagline if any

Document content:
${textContent.slice(0, 15000)}

Return ONLY valid JSON, no other text.`,
        },
      ],
    });

    const aiText = response.content[0].type === "text" ? response.content[0].text : "";
    
    let extractedBrand;
    try {
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      extractedBrand = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch {
      extractedBrand = null;
    }

    if (extractedBrand) {
      // Save extracted brand info
      await fs.writeFile(
        path.join(DATA_DIR, "brand.json"),
        JSON.stringify(extractedBrand, null, 2)
      );
    }

    return NextResponse.json({
      success: true,
      extracted: !!extractedBrand,
      brand: extractedBrand,
      textPreview: textContent.slice(0, 1000),
      message: extractedBrand 
        ? "Brand guidelines extracted successfully" 
        : "PDF uploaded but extraction failed",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
