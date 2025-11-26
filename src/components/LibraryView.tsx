import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, Check } from 'lucide-react';

export function LibraryView() {
  const [toggleState, setToggleState] = useState(false);

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-2 duration-300">
       
       {/* 1. BUTTONS */}
       <section className="space-y-6">
          <div className="border-b border-div-pri pb-2">
             <h2 className="text-xl font-bold text-heading">Buttons</h2>
          </div>
          <div className="p-8 rounded-xl border border-div-pri bg-card-pri-def grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <div className="space-y-4">
                <p className="text-xs font-bold text-caption uppercase">Primary</p>
                <button className="w-full px-4 py-2 rounded-lg bg-action-pri-def text-action-def hover:bg-action-pri-hov active:bg-action-pri-act transition-colors">Default</button>
                <button className="w-full px-4 py-2 rounded-lg bg-action-pri-def text-action-def opacity-90 cursor-not-allowed">Hover</button>
                <button className="w-full px-4 py-2 rounded-lg bg-action-pri-dis text-action-dis cursor-not-allowed">Disabled</button>
             </div>
             <div className="space-y-4">
                <p className="text-xs font-bold text-caption uppercase">Secondary</p>
                <button className="w-full px-4 py-2 rounded-lg bg-action-sec-def text-body border border-div-sec hover:bg-action-sec-hov active:bg-action-sec-act transition-colors">Default</button>
                <button className="w-full px-4 py-2 rounded-lg bg-action-sec-hov text-body border border-div-sec">Hover</button>
             </div>
             <div className="space-y-4">
                <p className="text-xs font-bold text-caption uppercase">Ghost</p>
                <button className="w-full px-4 py-2 rounded-lg bg-action-sub-def text-body hover:bg-action-sub-hov active:bg-action-sub-act transition-colors">Default</button>
             </div>
             <div className="space-y-4">
                <p className="text-xs font-bold text-caption uppercase">Destructive</p>
                <button className="w-full px-4 py-2 rounded-lg bg-error-solid-def text-action-def hover:bg-error-solid-hov transition-colors">Delete</button>
             </div>
          </div>
       </section>

       {/* 2. INPUTS & TOGGLES */}
       <section className="space-y-6">
          <div className="border-b border-div-pri pb-2">
             <h2 className="text-xl font-bold text-heading">Inputs & Controls</h2>
          </div>
          <div className="p-8 rounded-xl border border-div-pri bg-card-pri-def grid grid-cols-1 lg:grid-cols-2 gap-12">
             
             <div className="space-y-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-body">Default Input</label>
                  <input type="text" placeholder="name@example.com" className="w-full px-3 py-2 rounded-lg border border-input-def bg-input-def text-body focus:ring-2 focus:ring-focus-ring focus:border-input-focus outline-none transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-error-def">Error State</label>
                  <div className="relative">
                     <input type="text" defaultValue="Invalid Value" className="w-full px-3 py-2 rounded-lg border border-error-def bg-input-def text-body focus:ring-2 focus:ring-error-focus outline-none pr-10" />
                     <AlertTriangle className="absolute right-3 top-2.5 w-5 h-5 text-error-def" />
                  </div>
                </div>
             </div>

             <div className="space-y-6">
                {/* Single Refined Toggle */}
                <div className="space-y-4 pt-2">
                   <p className="text-xs font-bold text-caption uppercase">Interactive Toggle</p>
                   <div 
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => setToggleState(!toggleState)}
                   >
                      <button 
                        type="button"
                        className={`
                          relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-focus-ring
                          ${toggleState ? 'bg-action-pri-def' : 'bg-input-def border-input-dis'}
                        `}
                      >
                        <span
                          className={`
                            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-base-white shadow ring-0 transition duration-200 ease-in-out
                            ${toggleState ? 'translate-x-5' : 'translate-x-0'}
                          `}
                        />
                      </button>
                      <span className="text-sm font-medium text-heading">
                         {toggleState ? 'Enabled' : 'Disabled'}
                      </span>
                   </div>
                </div>
             </div>
          </div>
       </section>

       {/* 3. FEEDBACK & BADGES */}
       <section className="space-y-6">
          <div className="border-b border-div-pri pb-2">
             <h2 className="text-xl font-bold text-heading">Feedback</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             
             {/* Alerts */}
             <div className="space-y-4">
                <div className="p-4 rounded-lg bg-success-soft-def border border-success-subtle flex gap-3 shadow-sm">
                   <CheckCircle2 className="w-5 h-5 text-success-def shrink-0" />
                   <div>
                      <p className="text-sm font-bold text-success-def">Success</p>
                      <p className="text-xs text-success-def/90">Action completed.</p>
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
                      <p className="text-xs text-warning-def/90">Review required.</p>
                   </div>
                </div>
                <div className="p-4 rounded-lg bg-info-soft-def border border-info-subtle flex gap-3 shadow-sm">
                   <Info className="w-5 h-5 text-info-def shrink-0" />
                   <div>
                      <p className="text-sm font-bold text-info-def">Information</p>
                      <p className="text-xs text-info-def/90">Update available.</p>
                   </div>
                </div>
             </div>
             
             {/* Badges */}
             <div className="p-8 rounded-xl border border-div-pri bg-card-pri-def space-y-8">
                <div>
                   <h3 className="text-sm font-bold text-caption uppercase mb-3">Badges</h3>
                   <div className="flex flex-wrap gap-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-page-sec border border-div-sec text-body">Neutral</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-selected text-text-selected">Brand</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-soft-def text-success-def border border-success-subtle">Success</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-soft-def text-error-def border border-error-subtle">Error</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-soft-def text-warning-def border border-warning-subtle">Warning</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-info-soft-def text-info-def border border-info-subtle">Info</span>
                   </div>
                </div>
             </div>
          </div>
       </section>
    </div>
  );
}