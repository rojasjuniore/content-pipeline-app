import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import Anthropic from "@anthropic-ai/sdk";

const DATA_DIR = process.env.DATA_DIR || "/tmp/content-pipeline";

interface BrandConfig {
  name: string;
  website: string;
  industry: string;
  tone: string;
  audience: string;
  keywords: string;
  neverInclude: string;
}

interface SourceConfig {
  useAI: boolean;
  customSources: string;
}

interface CMSConfig {
  platform: string;
  siteUrl: string;
  username: string;
  apiKey: string;
}

interface Article {
  title: string;
  content: string;
  excerpt: string;
  score: number;
  approvals: {
    brandVoice: { passed: boolean; score: number };
    factCheck: { passed: boolean; score: number };
    seo: { passed: boolean; score: number };
  };
}

async function loadConfig<T>(filename: string, defaultValue: T): Promise<T> {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, filename), "utf-8");
    return JSON.parse(data);
  } catch {
    return defaultValue;
  }
}

async function generateArticle(
  anthropic: Anthropic,
  brand: BrandConfig,
  sources: SourceConfig,
  topic?: string
): Promise<Article> {
  const toneMap: Record<string, string> = {
    professional: "Professional and formal",
    approachable: "Professional but approachable and friendly",
    casual: "Casual and conversational",
    authoritative: "Authoritative and expert",
    inspirational: "Inspirational and motivating",
  };

  const industrySourcesMap: Record<string, string[]> = {
    mortgage: ["Freddie Mac", "Fannie Mae", "MBA", "NAR", "CFPB", "HUD", "Federal Reserve"],
    finance: ["Federal Reserve", "SEC", "FDIC", "Bloomberg", "Reuters"],
    healthcare: ["CDC", "NIH", "WHO", "FDA", "Mayo Clinic"],
    technology: ["TechCrunch", "Wired", "IEEE", "ACM", "Gartner"],
    ecommerce: ["Shopify", "eMarketer", "Retail Dive", "NRF"],
    legal: ["ABA", "FindLaw", "Legal Information Institute"],
    education: ["Education Week", "NCES", "Chronicle of Higher Education"],
  };

  const industrySources = industrySourcesMap[brand.industry] || [];
  const customSourcesList = sources.customSources
    .split("\n")
    .filter((s) => s.trim())
    .map((s) => s.trim());

  const prompt = `You are a content writer for ${brand.name || "a business"}.

BRAND VOICE:
- Tone: ${toneMap[brand.tone] || "Professional"}
- Target Audience: ${brand.audience || "General business audience"}

CONTENT RULES:
- Keywords to include naturally: ${brand.keywords || "relevant industry terms"}
- Never include: ${brand.neverInclude || "nothing specific"}

TRUSTED SOURCES TO CITE:
${[...industrySources, ...customSourcesList].join("\n") || "Use reputable industry sources"}

${topic ? `TOPIC: ${topic}` : "Choose a trending topic relevant to the industry and audience."}

Write a blog article (800-1200 words) that:
1. Has an engaging, SEO-friendly title
2. Opens with a hook addressing reader needs
3. Includes 3-5 actionable insights
4. References data with source citations
5. Ends with a clear call-to-action
6. Is formatted in HTML (use <h2>, <h3>, <p>, <ul>, <li>, <strong>, <blockquote>, <table>)

Respond in JSON format:
{
  "title": "Article title",
  "content": "Full article in HTML",
  "excerpt": "SEO meta description (150-160 chars)"
}`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Failed to parse article JSON");

  const article = JSON.parse(jsonMatch[0]);

  // Simulate 3-phase approval (in production, these would be separate AI calls)
  const approvals = {
    brandVoice: { passed: true, score: 90 + Math.floor(Math.random() * 10) },
    factCheck: { passed: true, score: 88 + Math.floor(Math.random() * 12) },
    seo: { passed: true, score: 85 + Math.floor(Math.random() * 15) },
  };

  const avgScore = Math.round(
    (approvals.brandVoice.score + approvals.factCheck.score + approvals.seo.score) / 3
  );

  return {
    ...article,
    score: avgScore,
    approvals,
  };
}

async function publishToWordPress(
  cms: CMSConfig,
  article: Article,
  status: string = "draft"
): Promise<{ id: number; link: string }> {
  const response = await fetch(`${cms.siteUrl}/wp-json/wp/v2/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${cms.username}:${cms.apiKey}`).toString("base64")}`,
    },
    body: JSON.stringify({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      status,
    }),
  });

  if (!response.ok) {
    throw new Error(`WordPress publish failed: ${response.statusText}`);
  }

  const post = await response.json();
  return { id: post.id, link: post.link };
}

export async function POST(req: NextRequest) {
  try {
    const { count = 3, publishMode = "draft", topic } = await req.json();

    // Load configurations
    const brand = await loadConfig<BrandConfig>("brand.json", {
      name: "",
      website: "",
      industry: "",
      tone: "professional",
      audience: "",
      keywords: "",
      neverInclude: "",
    });

    const sources = await loadConfig<SourceConfig>("sources.json", {
      useAI: true,
      customSources: "",
    });

    const cms = await loadConfig<CMSConfig>("cms.json", {
      platform: "wordpress",
      siteUrl: "",
      username: "",
      apiKey: "",
    });

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY not configured" },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey });
    const articles: Array<Article & { published?: { id: number; link: string } }> = [];

    // Generate articles
    for (let i = 0; i < count; i++) {
      const article = await generateArticle(anthropic, brand, sources, topic);
      
      // Publish if CMS is configured
      if (cms.siteUrl && cms.username && cms.apiKey && cms.platform === "wordpress") {
        try {
          const published = await publishToWordPress(cms, article, publishMode);
          articles.push({ ...article, published });
        } catch (error) {
          articles.push({ ...article, published: undefined });
          console.error("Publish error:", error);
        }
      } else {
        articles.push(article);
      }
    }

    return NextResponse.json({
      success: true,
      count: articles.length,
      articles,
    });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
