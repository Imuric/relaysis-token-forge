'use client';

import React, { useState, useMemo } from 'react';
import { brandOptions } from '../lib/data';
import { generateDesignSystem } from '../lib/generator';
import { LayoutDashboard, Component, Download, Code, Menu, Sun, Moon } from 'lucide-react';

import { DashboardView } from '../components/DashboardView';
import { LibraryView } from '../components/LibraryView';
import { ExportView } from '../components/ExportView';

export default function TokenForge() {
  const [selectedBrand, setSelectedBrand] = useState<string>('indigo');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tokens = useMemo(() => 
    generateDesignSystem(selectedBrand, isDarkMode ? 'dark' : 'light'), 
  [selectedBrand, isDarkMode]);

  return (
    <div 
      style={tokens as React.CSSProperties} 
      className="min-h-screen bg-page-pri text-body font-sans transition-colors duration-300 flex flex-col relative"
    >
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-div-pri bg-page-pri/90 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Brand */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-action-pri-def flex items-center justify-center text-action-def shadow-sm">
                <Code className="w-5 h-5" />
              </div>
              <span className="font-bold text-heading text-lg hidden sm:block">Token Forge</span>
            </div>
            <div className="h-6 w-px bg-div-pri hidden sm:block"></div>
            <select 
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-3 py-1.5 rounded-md border border-input-def bg-input-def text-body text-sm focus:outline-none focus:ring-2 focus:ring-focus-ring capitalize cursor-pointer"
            >
              {brandOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
             <button
               onClick={() => setIsDarkMode(!isDarkMode)}
               className="p-2 rounded-lg text-caption hover:text-body hover:bg-page-sec transition-colors"
             >
               {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>

             <div className="hidden md:flex items-center gap-1 bg-page-sec p-1 rounded-lg border border-div-sec">
                {[
                  { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
                  { id: 'library', icon: Component, label: 'Library' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                      activeTab === tab.id ? 'bg-base-white text-heading shadow-sm' : 'text-caption hover:text-body'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
             </div>

             <button
               onClick={() => setActiveTab('export')}
               className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-sm ${
                 activeTab === 'export' ? 'bg-action-pri-act text-action-def ring-2 ring-focus-ring' : 'bg-action-pri-def text-action-def hover:bg-action-pri-hov'
               }`}
             >
               <Download className="w-4 h-4" />
               Export
             </button>
          </div>
          
          {/* Mobile Menu */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-5 h-5" />
          </button>
        </div>
        
        {mobileMenuOpen && (
           <div className="md:hidden border-t border-div-pri bg-page-sec p-4 space-y-2">
             {['dashboard', 'library', 'export'].map((tab) => (
               <button key={tab} onClick={() => { setActiveTab(tab); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 rounded-lg bg-page-pri border border-div-pri capitalize">
                 {tab}
               </button>
             ))}
           </div>
        )}
      </header>

      {/* CONTENT */}
      <main className="flex-1 max-w-[1400px] mx-auto w-full p-4 sm:p-6 lg:p-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'library' && <LibraryView />}
        {activeTab === 'export' && <ExportView tokens={tokens} selectedBrand={selectedBrand} />}
      </main>
    </div>
  );
}