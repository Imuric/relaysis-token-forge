'use client';

import React, { useState, useMemo } from 'react';
import { brandOptions } from '../lib/data';
import { generateDesignSystem } from '../lib/generator';
import { 
  Copy, 
  Check, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  XCircle, 
  Search, 
  Bell 
} from 'lucide-react';

export default function TokenForge() {
  const [selectedBrand, setSelectedBrand] = useState<string>('indigo');
  const [copied, setCopied] = useState(false);

  // 1. GENERATE TOKENS: Runs instantly when brand changes
  const tokens = useMemo(() => generateDesignSystem(selectedBrand), [selectedBrand]);

  // 2. COPY FUNCTION
  const handleCopy = () => {
    const cssBlock = `:root {\n${Object.entries(tokens)
      .map(([key, val]) => `  ${key}: ${val};`)
      .join('\n')}\n}`;
    navigator.clipboard.writeText(cssBlock);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // INJECT VARIABLES: We apply the generated tokens to the style prop of the main container.
    // This makes them instantly available to all Tailwind utility classes inside.
    <div 
      style={tokens as React.CSSProperties} 
      className="min-h-screen bg-[var(--surface-page)] text-[var(--text-body)] font-sans transition-colors duration-300"
    >
      
      {/* --- HEADER & CONTROLS --- */}
      <header className="sticky top-0 z-10 border-b border-[var(--border-base)] bg-[var(--surface-page)]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-[var(--text-heading)] flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-[var(--surface-primary)]"></span>
              Relaysis Token Forge
            </h1>
            <p className="text-sm text-[var(--text-caption)]">No-Math Design System Generator</p>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-[var(--text-body-strong)]">Brand Color:</label>
            <select 
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-3 py-2 rounded-md border border-[var(--border-input)] bg-[var(--surface-input)] text-[var(--text-body-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus-ring)] focus:border-[var(--border-input-focus)] capitalize"
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
            <h2 className="text-2xl font-semibold text-[var(--text-heading)]">Live Preview</h2>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--surface-secondary)] border border-[var(--border-base)] text-[var(--text-caption)]">
              {Object.keys(tokens).length} Variables Generated
            </span>
          </div>

          {/* Component Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 1. Buttons & Inputs Card */}
            <div className="p-6 rounded-xl border border-[var(--border-base)] bg-[var(--surface-card)] shadow-sm space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-caption)]">Interactivity</h3>
              
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 rounded-lg bg-[var(--surface-primary)] text-[var(--text-action-primary)] hover:bg-[var(--surface-primary-hover)] active:bg-[var(--surface-primary-active)] font-medium transition-colors">
                  Primary Action
                </button>
                <button className="px-4 py-2 rounded-lg bg-[var(--surface-secondary)] text-[var(--text-action-secondary)] border border-[var(--border-secondary)] hover:bg-[var(--surface-secondary-hover)] active:bg-[var(--surface-secondary-active)] font-medium transition-colors">
                  Secondary
                </button>
                <button className="px-4 py-2 rounded-lg bg-[var(--surface-ghost)] text-[var(--text-action-ghost)] hover:bg-[var(--surface-ghost-hover)] hover:text-[var(--text-action-ghost-hover)] font-medium transition-colors">
                  Ghost Button
                </button>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-[var(--icon-secondary)]" />
                  <input 
                    type="text" 
                    placeholder="Focus me to see brand glow..." 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border-input)] bg-[var(--surface-input)] text-[var(--text-body)] placeholder-[var(--text-caption)] focus:outline-none focus:border-[var(--border-input-focus)] focus:ring-4 focus:ring-[var(--border-focus-ring)] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* 2. Feedback & Alerts Card */}
            <div className="p-6 rounded-xl border border-[var(--border-base)] bg-[var(--surface-card)] shadow-sm space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-caption)]">Semantic Feedback</h3>
              
              <div className="space-y-3">
                {/* Success */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--surface-success-soft)] border border-[var(--border-success)]">
                  <CheckCircle2 className="w-5 h-5 text-[var(--icon-success)] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-success)]">Success State</p>
                    <p className="text-xs text-[var(--text-success)] opacity-90">Action completed successfully.</p>
                  </div>
                </div>

                {/* Error (Swaps automatically if Brand is Red/Rose) */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--surface-error-soft)] border border-[var(--border-error)]">
                  <XCircle className="w-5 h-5 text-[var(--icon-error)] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-error)]">Error State</p>
                    <p className="text-xs text-[var(--text-error)] opacity-90">Something went wrong here.</p>
                  </div>
                </div>

                 {/* Warning */}
                 <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--surface-warning-soft)] border border-[var(--border-warning)]">
                  <AlertTriangle className="w-5 h-5 text-[var(--icon-warning)]" />
                  <p className="text-sm font-medium text-[var(--text-warning)]">Warning: Check your data.</p>
                </div>
              </div>
            </div>

            {/* 3. Surface & Typography Card */}
            <div className="md:col-span-2 p-6 rounded-xl border border-[var(--border-base)] bg-[var(--surface-card)] shadow-sm grid md:grid-cols-2 gap-8">
               <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-caption)] mb-4">Typography</h3>
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-[var(--text-heading)]">Heading Level 1</h1>
                    <h2 className="text-xl font-semibold text-[var(--text-body-strong)]">Heading Level 2</h2>
                    <p className="text-[var(--text-body)] leading-relaxed">
                      This is standard body text. It uses the <span className="font-semibold text-[var(--text-body-strong)]">Neutral Scale</span> automatically paired with your brand. <a href="#" className="underline text-[var(--text-link)] hover:text-[var(--text-link-hover)]">This is a link</a>.
                    </p>
                    <p className="text-sm text-[var(--text-caption)]">This is caption text, used for metadata or hints.</p>
                  </div>
               </div>

               <div>
                 <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-caption)] mb-4">Borders & Dividers</h3>
                 <div className="space-y-4">
                    <div className="p-4 border border-[var(--border-base)] rounded text-center text-[var(--text-caption)]">
                      Base Border
                    </div>
                    <div className="p-4 border border-[var(--border-strong)] rounded text-center text-[var(--text-caption)]">
                      Strong Border
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="h-px bg-[var(--border-base)] flex-1"></div>
                       <span className="text-xs text-[var(--text-caption)]">Divider</span>
                       <div className="h-px bg-[var(--border-base)] flex-1"></div>
                    </div>
                 </div>
               </div>
            </div>

          </div>
        </section>

        {/* --- EXPORT SECTION --- */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text-heading)]">Export CSS</h2>
          <div className="relative group rounded-xl overflow-hidden border border-[var(--border-base)] bg-[#1e1e1e] text-gray-300">
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