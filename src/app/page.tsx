'use client';

import React, { useState, useMemo } from 'react';
import { brandOptions } from '../lib/data';
import { generateDesignSystem } from '../lib/generator';
import { 
  Copy, Check, LayoutDashboard, Component, Code, 
  Bell, Search, Menu, User, Settings, ArrowUpRight, 
  MoreVertical, Download, Filter, Plus, X, 
  CheckCircle2, AlertTriangle, XCircle, Info, Shield, 
  CreditCard, Calendar, BarChart3, ChevronRight, Mail
} from 'lucide-react';

export default function TokenForge() {
  const [selectedBrand, setSelectedBrand] = useState<string>('indigo');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Generate Tokens
  const tokens = useMemo(() => generateDesignSystem(selectedBrand), [selectedBrand]);

  // Copy Logic
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
      className="min-h-screen bg-page-pri text-body font-sans transition-colors duration-300 flex flex-col"
    >
      
      {/* --- TOP NAVIGATION --- */}
      <header className="sticky top-0 z-30 border-b border-div-pri bg-page-pri/90 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo & Brand Select */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-action-pri-def flex items-center justify-center text-action-def shadow-sm">
                <Code className="w-5 h-5" />
              </div>
              <span className="font-bold text-heading text-lg hidden sm:block">Token Forge</span>
            </div>
            
            <div className="h-6 w-px bg-div-pri hidden sm:block"></div>

            <div className="flex items-center gap-2">
               <span className="text-sm font-medium text-caption hidden sm:block">Brand:</span>
               <select 
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-3 py-1.5 rounded-md border border-input-def bg-input-def text-body text-sm focus:outline-none focus:ring-2 focus:ring-focus-ring capitalize cursor-pointer hover:border-input-hov"
              >
                {brandOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:flex items-center gap-1 bg-page-sec p-1 rounded-lg border border-div-sec">
             {[
               { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
               { id: 'library', icon: Component, label: 'Library' },
               { id: 'export', icon: Download, label: 'Export Code' },
             ].map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                   activeTab === tab.id 
                   ? 'bg-base-white text-heading shadow-sm ring-1 ring-black/5' 
                   : 'text-caption hover:text-body hover:bg-page-pri'
                 }`}
               >
                 <tab.icon className="w-4 h-4" />
                 {tab.label}
               </button>
             ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-body hover:bg-page-sec rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Tab Navigation */}
        {mobileMenuOpen && (
           <div className="md:hidden border-t border-div-pri bg-page-sec p-4 space-y-2">
             {[
               { id: 'dashboard', label: 'Overview Dashboard' },
               { id: 'library', label: 'Component Library' },
               { id: 'export', label: 'Export Code' },
             ].map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                 className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium ${
                   activeTab === tab.id 
                   ? 'bg-action-pri-def text-action-def' 
                   : 'bg-page-pri text-body border border-div-pri'
                 }`}
               >
                 {tab.label}
               </button>
             ))}
           </div>
        )}
      </header>


      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 max-w-[1400px] mx-auto w-full p-4 sm:p-6 lg:p-8">

        {/* =========================================================================
            TAB 1: DASHBOARD (Overview)
            Complex, dense UI to test "real world" layout composability.
           ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* 1. Top Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Revenue', val: '$45,231.89', change: '+20.1%', trend: 'up' },
                { label: 'Subscriptions', val: '2,350', change: '+180.1%', trend: 'up' },
                { label: 'Active Sessions', val: '12,234', change: '+19%', trend: 'up' },
                { label: 'Bounce Rate', val: '24.5%', change: '-4.05%', trend: 'down' },
              ].map((stat, i) => (
                <div key={i} className="p-5 rounded-xl border border-div-pri bg-card-pri-def shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-caption">{stat.label}</p>
                    <span className={`flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
                      stat.trend === 'up' ? 'bg-success-soft-def text-success-def' : 'bg-error-soft-def text-error-def'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="mt-2 text-2xl font-bold text-heading">{stat.val}</div>
                  <p className="text-xs text-caption mt-1">from last month</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* 2. Main Chart Area (Visual Mock) */}
              <div className="lg:col-span-2 p-6 rounded-xl border border-div-pri bg-card-pri-def shadow-sm flex flex-col h-[400px]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-base font-semibold text-heading">Revenue Overview</h3>
                    <p className="text-sm text-caption">Monthly Recurring Revenue (MRR)</p>
                  </div>
                  <div className="flex gap-2">
                     <button className="px-3 py-1 text-xs font-medium rounded-md bg-page-sec text-body border border-div-sec hover:bg-page-pri">Daily</button>
                     <button className="px-3 py-1 text-xs font-medium rounded-md bg-selected text-text-selected">Monthly</button>
                  </div>
                </div>
                
                {/* CSS Chart Mock */}
                <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2 border-b border-div-pri">
                   {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                     <div key={i} className="w-full bg-action-pri-def/10 rounded-t-sm relative group">
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-action-pri-def rounded-t-sm transition-all duration-500 group-hover:bg-action-pri-hov" 
                          style={{ height: `${h}%` }}
                        ></div>
                        {/* Tooltip Mock */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-base-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          ${h * 100}
                        </div>
                     </div>
                   ))}
                </div>
                <div className="flex justify-between text-xs text-caption mt-2 px-2">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                  <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                </div>
              </div>

              {/* 3. Activity Feed / Sidebar */}
              <div className="p-6 rounded-xl border border-div-pri bg-card-pri-def shadow-sm flex flex-col">
                 <h3 className="text-base font-semibold text-heading mb-4">Recent Activity</h3>
                 <div className="space-y-6">
                    {[
                      { icon: Mail, title: 'New Email', desc: 'john@example.com sent a message', time: '2m ago', color: 'bg-info-soft-def text-info-def' },
                      { icon: CreditCard, title: 'Payment Received', desc: 'Invoice #1023 paid', time: '1h ago', color: 'bg-success-soft-def text-success-def' },
                      { icon: AlertTriangle, title: 'Server Alert', desc: 'High CPU usage detected', time: '3h ago', color: 'bg-warning-soft-def text-warning-def' },
                      { icon: User, title: 'New User', desc: 'Sarah Smith created an account', time: '5h ago', color: 'bg-page-sec text-caption' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3">
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.color}`}>
                           <item.icon className="w-4 h-4" />
                         </div>
                         <div>
                           <p className="text-sm font-medium text-body">{item.title}</p>
                           <p className="text-xs text-caption">{item.desc}</p>
                           <p className="text-[10px] text-caption mt-1">{item.time}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <button className="mt-auto w-full py-2 text-sm font-medium text-link-def hover:text-link-hov border-t border-div-pri pt-4">
                   View All Activity
                 </button>
              </div>
            </div>

            {/* 4. Dense Data Table */}
            <div className="rounded-xl border border-div-pri bg-card-pri-def shadow-sm overflow-hidden">
               <div className="p-4 border-b border-div-pri flex flex-col sm:flex-row gap-4 justify-between items-center bg-page-sec/30">
                 <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-caption" />
                    <input 
                      type="text" 
                      placeholder="Search users..." 
                      className="pl-9 pr-4 py-2 w-full sm:w-64 text-sm rounded-lg border border-input-def bg-input-def text-body focus:outline-none focus:ring-2 focus:ring-focus-ring"
                    />
                 </div>
                 <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-action-def bg-card-pri-def text-body hover:bg-page-sec">
                      <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-action-pri-def text-action-def hover:bg-action-pri-hov">
                      <Plus className="w-4 h-4" /> Add User
                    </button>
                 </div>
               </div>
               
               <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                    <thead className="text-xs text-caption uppercase bg-page-sec font-semibold">
                       <tr>
                         <th className="px-6 py-3">User</th>
                         <th className="px-6 py-3">Role</th>
                         <th className="px-6 py-3">Status</th>
                         <th className="px-6 py-3">Last Login</th>
                         <th className="px-6 py-3 text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-div-sec">
                       {[1, 2, 3, 4, 5].map((_, i) => (
                         <tr key={i} className="hover:bg-page-sec/50 transition-colors group">
                           <td className="px-6 py-4 flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-page-sec flex items-center justify-center text-xs font-bold text-caption">
                                U{i}
                              </div>
                              <div>
                                <div className="font-medium text-heading">User Name {i+1}</div>
                                <div className="text-xs text-caption">user{i+1}@example.com</div>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-body">Administrator</td>
                           <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-success-soft-def text-success-def border border-success-subtle">
                                <span className="w-1.5 h-1.5 rounded-full bg-success-def"></span>
                                Active
                              </span>
                           </td>
                           <td className="px-6 py-4 text-caption">Nov 26, 2025</td>
                           <td className="px-6 py-4 text-right">
                              <button className="p-1 rounded hover:bg-page-sec text-caption hover:text-body">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                           </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
            </div>

          </div>
        )}


        {/* =========================================================================
            TAB 2: COMPONENT LIBRARY
            A strict inventory of all UI elements in all states.
           ========================================================================= */}
        {activeTab === 'library' && (
          <div className="space-y-12 animate-in slide-in-from-bottom-2 duration-300">
             
             {/* 1. Buttons */}
             <section className="space-y-6">
                <div className="border-b border-div-pri pb-2">
                   <h2 className="text-xl font-bold text-heading">Buttons</h2>
                   <p className="text-caption">Interactable elements for primary, secondary, and tertiary actions.</p>
                </div>
                
                <div className="p-8 rounded-xl border border-div-pri bg-card-pri-def grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   <div className="space-y-4">
                      <p className="text-xs font-bold text-caption uppercase">Primary</p>
                      <button className="w-full px-4 py-2 rounded-lg bg-action-pri-def text-action-def hover:bg-action-pri-hov active:bg-action-pri-act transition-colors">Default</button>
                      <button className="w-full px-4 py-2 rounded-lg bg-action-pri-def text-action-def opacity-90 cursor-not-allowed">Hover (Simulated)</button>
                      <button className="w-full px-4 py-2 rounded-lg bg-action-pri-dis text-action-dis cursor-not-allowed">Disabled</button>
                   </div>
                   
                   <div className="space-y-4">
                      <p className="text-xs font-bold text-caption uppercase">Secondary</p>
                      <button className="w-full px-4 py-2 rounded-lg bg-action-sec-def text-body border border-div-sec hover:bg-action-sec-hov active:bg-action-sec-act transition-colors">Default</button>
                      <button className="w-full px-4 py-2 rounded-lg bg-action-sec-hov text-body border border-div-sec">Hover (Simulated)</button>
                      <button className="w-full px-4 py-2 rounded-lg bg-action-sec-dis text-action-dis border border-div-sec opacity-50 cursor-not-allowed">Disabled</button>
                   </div>

                   <div className="space-y-4">
                      <p className="text-xs font-bold text-caption uppercase">Ghost / Text</p>
                      <button className="w-full px-4 py-2 rounded-lg bg-action-sub-def text-body hover:bg-action-sub-hov active:bg-action-sub-act transition-colors">Default</button>
                      <button className="w-full px-4 py-2 rounded-lg bg-action-sub-hov text-body">Hover (Simulated)</button>
                      <button className="w-full px-4 py-2 rounded-lg text-action-dis cursor-not-allowed">Disabled</button>
                   </div>

                   <div className="space-y-4">
                      <p className="text-xs font-bold text-caption uppercase">Destructive (Error)</p>
                      <button className="w-full px-4 py-2 rounded-lg bg-error-solid-def text-action-def hover:bg-error-solid-hov transition-colors">Delete</button>
                      <button className="w-full px-4 py-2 rounded-lg bg-error-soft-def text-error-def hover:bg-error-soft-hov transition-colors">Cancel</button>
                   </div>
                </div>
             </section>

             {/* 2. Inputs & Forms */}
             <section className="space-y-6">
                <div className="border-b border-div-pri pb-2">
                   <h2 className="text-xl font-bold text-heading">Inputs</h2>
                   <p className="text-caption">Text fields, checkboxes, and form elements.</p>
                </div>

                <div className="p-8 rounded-xl border border-div-pri bg-card-pri-def grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-body">Default Input</label>
                        <input type="text" placeholder="Placeholder text" className="mt-1 w-full px-3 py-2 rounded-lg border border-input-def bg-input-def text-body focus:ring-2 focus:ring-focus-ring focus:border-input-focus outline-none transition-all" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-body">Active / Focus</label>
                        <input type="text" defaultValue="Focused value" className="mt-1 w-full px-3 py-2 rounded-lg border border-input-focus bg-input-def text-body ring-2 ring-focus-ring outline-none" />
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-error-def">Error State</label>
                        <div className="relative mt-1">
                           <input type="text" defaultValue="Invalid Input" className="w-full px-3 py-2 rounded-lg border border-error-def bg-input-def text-body focus:ring-2 focus:ring-error-focus outline-none pr-10" />
                           <AlertTriangle className="absolute right-3 top-2.5 w-5 h-5 text-error-def" />
                        </div>
                        <p className="text-xs text-error-def mt-1">This field is required.</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-caption">Disabled State</label>
                        <input type="text" disabled defaultValue="Cannot edit this" className="mt-1 w-full px-3 py-2 rounded-lg border border-input-dis bg-input-dis text-action-dis cursor-not-allowed" />
                      </div>
                   </div>
                </div>
             </section>

             {/* 3. Feedback: Toasts & Badges */}
             <section className="space-y-6">
                <div className="border-b border-div-pri pb-2">
                   <h2 className="text-xl font-bold text-heading">Feedback</h2>
                   <p className="text-caption">Toasts, alerts, and badge indicators.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {/* Toasts / Banners */}
                   <div className="space-y-4">
                      <h3 className="text-sm font-bold text-caption uppercase">Toast Notifications</h3>
                      
                      <div className="p-4 rounded-lg bg-success-soft-def border border-success-subtle flex gap-3 shadow-sm">
                         <CheckCircle2 className="w-5 h-5 text-success-def shrink-0" />
                         <div>
                            <p className="text-sm font-bold text-success-def">Success</p>
                            <p className="text-xs text-success-def/90">Action completed successfully.</p>
                         </div>
                      </div>

                      <div className="p-4 rounded-lg bg-error-soft-def border border-error-subtle flex gap-3 shadow-sm">
                         <XCircle className="w-5 h-5 text-error-def shrink-0" />
                         <div>
                            <p className="text-sm font-bold text-error-def">Error</p>
                            <p className="text-xs text-error-def/90">Something went wrong.</p>
                         </div>
                      </div>

                      <div className="p-4 rounded-lg bg-warning-soft-def border border-warning-subtle flex gap-3 shadow-sm">
                         <AlertTriangle className="w-5 h-5 text-warning-def shrink-0" />
                         <div>
                            <p className="text-sm font-bold text-warning-def">Warning</p>
                            <p className="text-xs text-warning-def/90">Check your connection.</p>
                         </div>
                      </div>

                      <div className="p-4 rounded-lg bg-info-soft-def border border-info-subtle flex gap-3 shadow-sm">
                         <Info className="w-5 h-5 text-info-def shrink-0" />
                         <div>
                            <p className="text-sm font-bold text-info-def">Information</p>
                            <p className="text-xs text-info-def/90">System update available.</p>
                         </div>
                      </div>
                   </div>

                   {/* Badges */}
                   <div className="space-y-4">
                      <h3 className="text-sm font-bold text-caption uppercase">Status Badges</h3>
                      <div className="p-8 rounded-xl border border-div-pri bg-card-pri-def flex flex-wrap gap-4 items-center">
                         <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-page-sec border border-div-sec text-body">Neutral</span>
                         <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-selected text-text-selected">Brand</span>
                         <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-soft-def text-success-def border border-success-subtle">Success</span>
                         <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-soft-def text-error-def border border-error-subtle">Error</span>
                         <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-soft-def text-warning-def border border-warning-subtle">Warning</span>
                         <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-info-soft-def text-info-def border border-info-subtle">Info</span>
                      </div>

                      <h3 className="text-sm font-bold text-caption uppercase mt-6">Surface Cards</h3>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 rounded-lg bg-card-pri-def border border-div-pri shadow-sm">
                            <p className="text-sm font-bold text-heading">Primary Card</p>
                            <p className="text-xs text-caption">White/Base background</p>
                         </div>
                         <div className="p-4 rounded-lg bg-page-sec border border-div-sec">
                            <p className="text-sm font-bold text-heading">Secondary Card</p>
                            <p className="text-xs text-caption">Subtle background</p>
                         </div>
                      </div>
                   </div>
                </div>
             </section>
          </div>
        )}


        {/* =========================================================================
            TAB 3: EXPORT (Dedicated Code View)
            Full screen code viewer.
           ========================================================================= */}
        {activeTab === 'export' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in zoom-in-95 duration-300">
             
             <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-heading">Export Design System</h2>
                <p className="text-body max-w-lg mx-auto">
                   Copy the CSS Variables below and paste them into your global CSS file. 
                   This will instantly apply the <span className="font-bold capitalize">{selectedBrand}</span> theme to your project.
                </p>
             </div>

             <div className="relative group rounded-xl overflow-hidden border border-div-pri bg-base-black shadow-2xl">
                {/* Window Controls Mock */}
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                   <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-error-solid-def"></div>
                      <div className="w-3 h-3 rounded-full bg-warning-solid-def"></div>
                      <div className="w-3 h-3 rounded-full bg-success-solid-def"></div>
                   </div>
                   <div className="text-xs font-mono text-white/50">globals.css</div>
                   <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed max-h-[600px] custom-scrollbar text-code">
                  <code>
{`:root {
  /* * Relaysis Token Forge 
   * Brand: ${selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}
   * Variables: 148
   */

${Object.entries(tokens).map(([key, val]) => `  ${key}: ${val};`).join('\n')}
}`}
                  </code>
                </pre>
             </div>
             
             <div className="flex justify-center gap-4">
                <button 
                  onClick={handleCopy}
                  className="px-6 py-3 rounded-xl bg-action-pri-def text-action-def font-medium hover:bg-action-pri-hov shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <Copy className="w-5 h-5" />
                  Copy to Clipboard
                </button>
                <button className="px-6 py-3 rounded-xl border border-div-pri bg-card-pri-def text-body font-medium hover:bg-page-sec shadow-sm transition-all flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download .css
                </button>
             </div>

          </div>
        )}

      </main>
    </div>
  );
}