'use client';

import React, { useState, useMemo } from 'react';
import { brandOptions } from '../lib/data';
import { generateDesignSystem } from '../lib/generator';
import { Copy, Check, AlertTriangle, CheckCircle2, Info, XCircle, Search } from 'lucide-react';

export default function TokenForge() {
  const [selectedBrand, setSelectedBrand] = useState<string>('indigo');
  const [copied, setCopied] = useState(false);

  const tokens = useMemo(() => generateDesignSystem(selectedBrand), [selectedBrand]);

  const handleCopy = () => {
    const cssBlock = `:root {\n${Object.entries(tokens)
      .map(([key, val]) => `  ${key}: ${val};`)
      .join('\n')}\n}`;
    navigator.clipboard.writeText(cssBlock);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      style={tokens as React.CSSProperties} 
      className="min-h-screen bg-page-pri text-body font-sans transition-colors duration-300"
    >
      
      <header className="sticky top-0 z-10 border-b border-div-pri bg-page-pri/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-heading flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-action-pri-def"></span>
              Relaysis Token Forge
            </h1>
            <p className="text-sm text-caption">165 Variable Standard Mode</p>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-heading">Brand Color:</label>
            <select 
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-3 py-2 rounded-md border border-input-def bg-input-def text-body focus:outline-none focus:ring-2 focus:ring-focus-ring capitalize"
            >
              {brandOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        
        {/* --- PREVIEW SECTION --- */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-heading">Live Preview</h2>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-card-sec-def border border-div-pri text-caption">
              {Object.keys(tokens).length} Variables Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 1. Buttons & Inputs */}
            <div className="p-6 rounded-xl border border-div-pri bg-card-pri-def shadow-sm space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-caption">Interactivity</h3>
              
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 rounded-lg bg-action-pri-def text-action-def hover:bg-action-pri-hov transition-colors">
                  Primary Action
                </button>
                <button className="px-4 py-2 rounded-lg bg-action-sec-def text-body border border-div-sec hover:bg-action-sec-hov transition-colors">
                  Secondary
                </button>
                <button className="px-4 py-2 rounded-lg bg-action-sub-def text-caption hover:bg-action-sub-hov transition-colors">
                  Ghost Button
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-caption" />
                <input 
                  type="text" 
                  placeholder="Focus for glow..." 
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input-def bg-input-def text-body placeholder-placeholder focus:outline-none focus:border-input-focus focus:ring-4 focus:ring-focus-ring transition-all"
                />
              </div>
            </div>

            {/* 2. Feedback */}
            <div className="p-6 rounded-xl border border-div-pri bg-card-pri-def shadow-sm space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-caption">Semantic States</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-success-soft-def border border-success-def">
                  <CheckCircle2 className="w-5 h-5 text-success-def" />
                  <p className="text-sm font-medium text-success-def">Success: System Operational</p>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-error-soft-def border border-error-def">
                  <XCircle className="w-5 h-5 text-error-def" />
                  <p className="text-sm font-medium text-error-def">Error: Connection Failed</p>
                </div>

                 <div className="flex items-center gap-3 p-3 rounded-lg bg-warning-soft-def border border-warning-def">
                  <AlertTriangle className="w-5 h-5 text-warning-def" />
                  <p className="text-sm font-medium text-warning-def">Warning: Review Pending</p>
                </div>
              </div>
            </div>

            {/* 3. Typography */}
            <div className="md:col-span-2 p-6 rounded-xl border border-div-pri bg-card-pri-def shadow-sm grid md:grid-cols-2 gap-8">
               <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-caption mb-4">Typography</h3>
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-heading">Heading Level 1</h1>
                    <h2 className="text-xl font-semibold text-body">Heading Level 2</h2>
                    <p className="text-body leading-relaxed">
                      This is standard body text using <span className="font-semibold text-heading">Neutral Scales</span>. <a href="#" className="underline text-link-def hover:text-link-hov">This is a link</a>.
                    </p>
                    <p className="text-sm text-caption">This is caption text for metadata.</p>
                  </div>
               </div>
            </div>

          </div>
        </section>

        {/* --- EXPORT --- */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-heading">Export CSS</h2>
          <div className="relative group rounded-xl overflow-hidden border border-div-pri bg-base-black text-gray-300">
            <button 
              onClick={handleCopy}
              className="absolute top-4 right-4 p-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
            <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed max-h-96 custom-scrollbar">
              <code>
{`:root {
${Object.entries(tokens).map(([key, val]) => `  ${key}: ${val};`).join('\n')}
}`}
              </code>
            </pre>
          </div>
        </section>

      </main>
    </div>
  );
}