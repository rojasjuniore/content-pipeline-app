"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

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

export default function Dashboard() {
  const [brand, setBrand] = useState<BrandConfig>({
    name: "",
    website: "",
    industry: "",
    tone: "professional",
    audience: "",
    keywords: "",
    neverInclude: "",
  });

  const [sources, setSources] = useState<SourceConfig>({
    useAI: true,
    customSources: "",
  });

  const [cms, setCMS] = useState<CMSConfig>({
    platform: "wordpress",
    siteUrl: "",
    username: "",
    apiKey: "",
  });

  const [generating, setGenerating] = useState(false);
  const [articles, setArticles] = useState<Array<{
    title: string;
    status: string;
    score: number;
  }>>([]);

  const handleGenerate = async () => {
    setGenerating(true);
    // Simulate generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setArticles([
      { title: "Understanding Market Trends in 2026", status: "approved", score: 94 },
      { title: "5 Tips for First-Time Clients", status: "approved", score: 91 },
      { title: "Industry Best Practices Guide", status: "approved", score: 89 },
    ]);
    setGenerating(false);
  };

  return (
    <div className="min-h-[100dvh] bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
            <span className="text-white font-semibold">ContentPipeline</span>
          </Link>
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
            Dashboard
          </Badge>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Content Pipeline</h1>
          <p className="text-slate-400">Configure your brand, sources, and CMS connection</p>
        </div>

        <Tabs defaultValue="brand" className="space-y-6">
          <TabsList className="bg-slate-900 border border-slate-800">
            <TabsTrigger value="brand" className="data-[state=active]:bg-slate-800">
              1. Brand
            </TabsTrigger>
            <TabsTrigger value="sources" className="data-[state=active]:bg-slate-800">
              2. Sources
            </TabsTrigger>
            <TabsTrigger value="cms" className="data-[state=active]:bg-slate-800">
              3. CMS
            </TabsTrigger>
            <TabsTrigger value="generate" className="data-[state=active]:bg-slate-800">
              4. Generate
            </TabsTrigger>
          </TabsList>

          {/* Brand Configuration Tab */}
          <TabsContent value="brand">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Brand Configuration</CardTitle>
                <CardDescription>
                  Define your brand identity and content guidelines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="brandName" className="text-slate-300">Brand Name</Label>
                    <Input
                      id="brandName"
                      placeholder="e.g., Lending Spot"
                      value={brand.name}
                      onChange={(e) => setBrand({ ...brand, name: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-slate-300">Website URL</Label>
                    <Input
                      id="website"
                      placeholder="https://yoursite.com"
                      value={brand.website}
                      onChange={(e) => setBrand({ ...brand, website: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-slate-300">Industry</Label>
                    <Select value={brand.industry} onValueChange={(v) => setBrand({ ...brand, industry: v })}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="mortgage">Mortgage / Real Estate</SelectItem>
                        <SelectItem value="finance">Finance / Banking</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="ecommerce">E-commerce / Retail</SelectItem>
                        <SelectItem value="legal">Legal Services</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tone" className="text-slate-300">Brand Tone</Label>
                    <Select value={brand.tone} onValueChange={(v) => setBrand({ ...brand, tone: v })}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="professional">Professional & Formal</SelectItem>
                        <SelectItem value="approachable">Professional but Approachable</SelectItem>
                        <SelectItem value="casual">Casual & Friendly</SelectItem>
                        <SelectItem value="authoritative">Authoritative & Expert</SelectItem>
                        <SelectItem value="inspirational">Inspirational & Motivating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience" className="text-slate-300">Target Audience</Label>
                  <Textarea
                    id="audience"
                    placeholder="Describe your target audience (e.g., First-time homebuyers, Loan officers, Small business owners...)"
                    value={brand.audience}
                    onChange={(e) => setBrand({ ...brand, audience: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords" className="text-slate-300">Keywords & Topics</Label>
                  <Textarea
                    id="keywords"
                    placeholder="Enter keywords separated by commas (e.g., mortgage rates, home financing, pre-approval, refinance...)"
                    value={brand.keywords}
                    onChange={(e) => setBrand({ ...brand, keywords: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="neverInclude" className="text-slate-300">Never Include (Restrictions)</Label>
                  <Textarea
                    id="neverInclude"
                    placeholder="Content to avoid (e.g., specific rate promises, competitor names, political topics...)"
                    value={brand.neverInclude}
                    onChange={(e) => setBrand({ ...brand, neverInclude: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 min-h-[80px]"
                  />
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                    Save Brand Config
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sources Tab */}
          <TabsContent value="sources">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Data Sources</CardTitle>
                <CardDescription>
                  Choose how AI will research and cite information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div>
                    <h3 className="font-medium text-white">AI-Powered Research</h3>
                    <p className="text-sm text-slate-400">Let AI find credible sources from industry databases</p>
                  </div>
                  <Switch
                    checked={sources.useAI}
                    onCheckedChange={(checked) => setSources({ ...sources, useAI: checked })}
                  />
                </div>

                <Separator className="bg-slate-800" />

                <div className="space-y-2">
                  <Label className="text-slate-300">Custom Trusted Sources</Label>
                  <p className="text-sm text-slate-500 mb-2">
                    Add specific URLs that AI should prioritize for research (one per line)
                  </p>
                  <Textarea
                    placeholder={`https://freddiemac.com
https://fanniemae.com
https://nar.realtor
https://consumerfinance.gov`}
                    value={sources.customSources}
                    onChange={(e) => setSources({ ...sources, customSources: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 min-h-[160px] font-mono text-sm"
                  />
                </div>

                <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <h4 className="font-medium text-indigo-300 mb-2">Pre-loaded Industry Sources</h4>
                  <p className="text-sm text-slate-400 mb-3">
                    Based on your industry selection, we&apos;ll automatically include these trusted sources:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Freddie Mac", "Fannie Mae", "MBA", "NAR", "CFPB", "HUD", "Federal Reserve"].map((source) => (
                      <Badge key={source} variant="secondary" className="bg-slate-800 text-slate-300">
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                    Save Sources
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CMS Connection Tab */}
          <TabsContent value="cms">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">CMS Connection</CardTitle>
                <CardDescription>
                  Connect to your content management system for auto-publishing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-slate-300">Platform</Label>
                  <Select value={cms.platform} onValueChange={(v) => setCMS({ ...cms, platform: v })}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="wordpress">WordPress</SelectItem>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="webflow">Webflow</SelectItem>
                      <SelectItem value="ghost">Ghost</SelectItem>
                      <SelectItem value="contentful">Contentful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteUrl" className="text-slate-300">Site URL</Label>
                  <Input
                    id="siteUrl"
                    placeholder="https://yoursite.com"
                    value={cms.siteUrl}
                    onChange={(e) => setCMS({ ...cms, siteUrl: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>

                {cms.platform === "wordpress" && (
                  <>
                    <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                      <h4 className="font-medium text-amber-300 mb-2">WordPress Setup Instructions</h4>
                      <ol className="text-sm text-slate-400 space-y-2 list-decimal list-inside">
                        <li>Go to <code className="text-amber-300">yoursite.com/wp-admin</code></li>
                        <li>Navigate to Users &gt; Profile</li>
                        <li>Scroll to &quot;Application Passwords&quot;</li>
                        <li>Enter name: &quot;ContentPipeline&quot; and click Add New</li>
                        <li>Copy the generated password below</li>
                      </ol>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-slate-300">Username</Label>
                        <Input
                          id="username"
                          placeholder="Your WordPress username"
                          value={cms.username}
                          onChange={(e) => setCMS({ ...cms, username: e.target.value })}
                          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apiKey" className="text-slate-300">Application Password</Label>
                        <Input
                          id="apiKey"
                          type="password"
                          placeholder="xxxx xxxx xxxx xxxx xxxx xxxx"
                          value={cms.apiKey}
                          onChange={(e) => setCMS({ ...cms, apiKey: e.target.value })}
                          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                {cms.platform === "shopify" && (
                  <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <h4 className="font-medium text-emerald-300 mb-2">Shopify Setup Instructions</h4>
                    <ol className="text-sm text-slate-400 space-y-2 list-decimal list-inside">
                      <li>Go to Settings &gt; Apps and sales channels</li>
                      <li>Click &quot;Develop apps&quot; &gt; Create an app</li>
                      <li>Configure Admin API scopes: write_content</li>
                      <li>Install app and copy Admin API access token</li>
                    </ol>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                    Test Connection
                  </Button>
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                    Save Connection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Generate Tab */}
          <TabsContent value="generate">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Generate Articles</CardTitle>
                  <CardDescription>
                    Create brand-aligned content with AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Number of Articles</Label>
                      <Select defaultValue="3">
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="1">1 Article</SelectItem>
                          <SelectItem value="2">2 Articles</SelectItem>
                          <SelectItem value="3">3 Articles</SelectItem>
                          <SelectItem value="5">5 Articles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Publish Mode</Label>
                      <Select defaultValue="draft">
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="draft">Save as Draft</SelectItem>
                          <SelectItem value="publish">Auto-Publish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Topic Focus (Optional)</Label>
                    <Textarea
                      placeholder="Leave blank for AI to choose trending topics, or specify a focus area..."
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>

                  <Button 
                    onClick={handleGenerate}
                    disabled={generating}
                    className="w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-lg"
                  >
                    {generating ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Generating & Approving...
                      </span>
                    ) : (
                      "Generate Articles"
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Pipeline Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Brand Config</p>
                        <p className="text-xs text-slate-500">Configured</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Sources</p>
                        <p className="text-xs text-slate-500">7 trusted sources</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">CMS</p>
                        <p className="text-xs text-slate-500">WordPress connected</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {articles.length > 0 && (
              <Card className="mt-6 bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Generated Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {articles.map((article, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-0">
                            {article.score}/100
                          </Badge>
                          <span className="text-white">{article.title}</span>
                        </div>
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                          Approved
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
