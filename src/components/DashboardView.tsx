import React from 'react';
import { 
  Mail, CreditCard, AlertTriangle, User, 
  MoreVertical, Search, Filter, Plus 
} from 'lucide-react';

export function DashboardView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. Stats Row */}
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
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2. Chart Area */}
        <div className="lg:col-span-2 p-6 rounded-xl border border-div-pri bg-card-pri-def shadow-sm flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-heading">Revenue Overview</h3>
              <p className="text-sm text-caption">Monthly Recurring Revenue</p>
            </div>
            <div className="flex gap-2">
               <button className="px-3 py-1 text-xs font-medium rounded-md bg-page-sec text-body border border-div-sec hover:bg-page-pri">Daily</button>
               <button className="px-3 py-1 text-xs font-medium rounded-md bg-selected text-text-selected">Monthly</button>
            </div>
          </div>
          <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2 border-b border-div-pri">
             {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
               <div key={i} className="w-full bg-action-pri-def/10 rounded-t-sm relative group">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-action-pri-def rounded-t-sm transition-all duration-500 group-hover:bg-action-pri-hov" 
                    style={{ height: `${h}%` }}
                  ></div>
               </div>
             ))}
          </div>
        </div>

        {/* 3. Sidebar Activity */}
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
        </div>
      </div>

      {/* 4. NEW TABLE */}
      <div className="rounded-xl border border-div-pri bg-card-pri-def shadow-sm overflow-hidden">
         <div className="p-4 border-b border-div-pri flex flex-col sm:flex-row gap-4 justify-between items-center bg-page-sec/30">
           <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-caption" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-9 pr-4 py-2 w-full sm:w-64 text-sm rounded-lg border border-input-def bg-input-def text-body focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-input-focus"
              />
           </div>
           <div className="flex gap-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-action-def bg-card-pri-def text-body hover:bg-page-sec">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-action-pri-def text-action-def hover:bg-action-pri-hov">
                <Plus className="w-4 h-4" /> Add Project
              </button>
           </div>
         </div>
         
         <div className="overflow-x-auto">
           <table className="w-full text-sm text-left">
              <thead className="text-xs text-caption uppercase bg-page-sec font-semibold">
                 <tr>
                   <th className="px-6 py-3">Project Name</th>
                   <th className="px-6 py-3">Team Lead</th>
                   <th className="px-6 py-3">Status</th>
                   <th className="px-6 py-3 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-div-sec">
                 {[
                   { name: 'Rucha Engineers Domain', lead: 'Imran M.', status: 'active' },
                   { name: 'HRMS Platform', lead: 'Sarah C.', status: 'pending' },
                   { name: 'ATS System', lead: 'Mike R.', status: 'completed' },
                   { name: 'Design System Gen', lead: 'Alex T.', status: 'active' },
                 ].map((row, i) => (
                   <tr key={i} className="hover:bg-page-sec/50 transition-colors group">
                     <td className="px-6 py-4 font-medium text-heading">{row.name}</td>
                     <td className="px-6 py-4 text-body">{row.lead}</td>
                     <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                          ${row.status === 'active' ? 'bg-success-soft-def text-success-def border-success-subtle' : ''}
                          ${row.status === 'pending' ? 'bg-warning-soft-def text-warning-def border-warning-subtle' : ''}
                          ${row.status === 'completed' ? 'bg-page-sec text-caption border-div-sec' : ''}
                        `}>
                          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                        </span>
                     </td>
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
  );
}