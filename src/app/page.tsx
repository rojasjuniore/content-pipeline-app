"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
        
        <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">CP</span>
            </div>
            <span className="text-white font-semibold text-xl">ContentPipeline</span>
          </div>
          <Link href="/dashboard">
            <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-0">
              Dashboard
            </Button>
          </Link>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
          <Badge className="mb-6 bg-indigo-500/10 text-indigo-300 border-indigo-500/20 hover:bg-indigo-500/20">
            AI-Powered Content Generation
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Generate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Brand-Aligned</span><br />
            Content at Scale
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mb-10">
            Upload your brand guidelines, connect your CMS, and let AI create 
            SEO-optimized articles that pass 3-phase approval automatically.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 h-12 text-lg">
                Get Started
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 h-12 text-lg">
              View Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              End-to-End Content Automation
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From brand guidelines to published articles in minutes, not hours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <CardTitle className="text-white">Brand Configuration</CardTitle>
                <CardDescription className="text-slate-400">
                  Upload your brand guidelines, define tone of voice, and set content rules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Brand voice and tone
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Keywords and topics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Content rules and restrictions
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <CardTitle className="text-white">AI Source Research</CardTitle>
                <CardDescription className="text-slate-400">
                  Use your own sources or let AI find credible data from trusted sites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Custom source URLs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Industry-specific databases
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Real-time market data
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <CardTitle className="text-white">3-Phase AI Approval</CardTitle>
                <CardDescription className="text-slate-400">
                  Every article passes brand voice, fact-check, and SEO validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Brand voice alignment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Source verification
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    SEO optimization
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CMS Integrations */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Connect to Your CMS
          </h2>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto">
            Auto-publish to WordPress, Shopify, and more with one click
          </p>
          
          <div className="flex flex-wrap justify-center gap-8">
            {["WordPress", "Shopify", "Webflow", "Ghost", "Contentful"].map((cms) => (
              <div key={cms} className="flex items-center gap-3 px-6 py-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <span className="text-white font-semibold">{cms[0]}</span>
                </div>
                <span className="text-slate-300">{cms}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Automate Your Content?
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            Set up once, generate unlimited brand-aligned articles
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-12 h-14 text-lg">
              Start Building Your Pipeline
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-500 text-sm">
          <span>ContentPipeline by IntechChain</span>
          <span>Powered by AI</span>
        </div>
      </footer>
    </div>
  );
}
