// src/components/ExportView.tsx
import React, { useState } from 'react';
import { Copy, Check, FileJson, FileCode, Palette, Info } from 'lucide-react';

interface ExportViewProps {
  tokens: Record<string, string>;
  selectedBrand: string;
}

export function ExportView({ tokens, selectedBrand }: ExportViewProps) {
  const [exportTab, setExportTab] = useState<'css' | 'config' | 'figma'>('config');
  const [copied, setCopied] = useState(false);

  // 1. TAILWIND CONFIG
  const tailwindConfigString = `import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      textColor: {
        heading: 'var(--text-heading)',
        body: 'var(--text-body)',
        // ... (Truncated for view)
      },
      // ... Add other mappings
    },
  },
  plugins: [],
};`;

  // 2. GLOBAL CSS
  const cssString = `:root {
  /* * Relaysis Token Forge
   * Brand: ${selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}
   */
${Object.entries(tokens).map(([key, val]) => `  ${key}: ${val};`).join('\n')}
}`;

  // 3. FIGMA JSON
  const figmaJsonString = JSON.stringify(
    Object.keys(tokens).reduce((acc, key) => {
      const cleanKey = key.replace(/^--/, ''); 
      acc[cleanKey] = tokens[key];
      return acc;
    }, {} as Record<string, string>),
    null, 2
  );

  const getExportString = () => {
    if (exportTab === 'config') return tailwindConfigString;
    if (exportTab === 'css') return cssString;
    return figmaJsonString;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getExportString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in zoom-in-95 duration-300">
       
       <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-heading">Export System</h2>
          <p className="text-body max-w-lg mx-auto">Choose your format below.</p>
       </div>

       <div className="bg-card-pri-def rounded-xl border border-div-pri shadow-2xl overflow-hidden">
          
          <div className="flex border-b border-div-pri bg-page-sec/50 overflow-x-auto">
            {['config', 'css', 'figma'].map((t) => (
                <button 
                  key={t}
                  onClick={() => setExportTab(t as any)}
                  className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 capitalize transition-colors ${
                    exportTab === t 
                    // CRITICAL FIX: Explicitly use text-base-black on white bg
                    ? 'border-action-def text-base-black bg-base-white' 
                    : 'border-transparent text-caption hover:text-body'
                  }`}
                >
                  {t}
                </button>
            ))}
          </div>

          <div className="flex-1 bg-base-black p-6 relative group min-h-[400px]">
             <button 
                onClick={handleCopy}
                className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/10 z-10"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
             </button>
             <pre className="text-sm font-mono leading-relaxed text-code">
               <code>{getExportString()}</code>
             </pre>
          </div>
       </div>
    </div>
  );
}