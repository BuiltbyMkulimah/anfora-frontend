'react';
import { Layers, ArrowUpRight } from 'lucide-react';

export default function Workflows() {
  return (
    <section id="workflows" className="border-b border-black bg-[#F4F4F0]">
      {/* Section Header Bar */}
      <div className="px-4 py-4 border-b border-black flex justify-between items-center text-xs font-bold uppercase tracking-wider">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-black inline-block" />
          ■ Our Workflows & Modules
        </span>
        <span className="hover:underline cursor-pointer">Explore Architecture ↗</span>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black">
        
        <div className="p-6 flex flex-col justify-between group cursor-pointer hover:bg-zinc-200/50 transition-colors">
          <div className="aspect-[4/3] bg-zinc-300 border border-black mb-4 relative overflow-hidden flex items-center justify-center p-6">
            <div className="text-center">
              <span className="text-[10px] font-mono uppercase text-zinc-600 block mb-1">[MODULE 01 & 02]</span>
              <h4 className="text-xs font-bold uppercase tracking-tight">Itinerary & Quotation Builder</h4>
            </div>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-bold block mb-1">AUTOMATED DISPATCH</span>
            <h3 className="text-sm font-bold uppercase tracking-tight mb-2">Eliminate Manual Layout Errors</h3>
            <p className="text-xs text-zinc-700">Generate stunning, branded safari itineraries and fast quotation sheets without touching a spreadsheet.</p>
          </div>
        </div>

        
        <div className="p-6 flex flex-col justify-between group cursor-pointer hover:bg-zinc-200/50 transition-colors">
          <div className="aspect-[4/3] bg-zinc-300 border border-black mb-4 relative overflow-hidden flex items-center justify-center p-6">
            <div className="text-center">
              <span className="text-[10px] font-mono uppercase text-zinc-600 block mb-1">[MODULE 03 & 04]</span>
              <h4 className="text-xs font-bold uppercase tracking-tight">Costing Manager & Invoice Generator</h4>
            </div>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-bold block mb-1">PROTECT YOUR PROFITS</span>
            <h3 className="text-sm font-bold uppercase tracking-tight mb-2">Flawless Financial Control</h3>
            <p className="text-xs text-zinc-700">Lock down your costing  and issue professional invoices that eliminate revenue leakage before trips begin.</p>
          </div>
        </div>

        
        <div className="p-6 flex flex-col justify-between group cursor-pointer hover:bg-zinc-200/50 transition-colors">
          <div className="aspect-[4/3] bg-zinc-300 border border-black mb-4 relative overflow-hidden flex items-center justify-center p-6">
            <div className="text-center">
              <span className="text-[10px] font-mono uppercase text-zinc-600 block mb-1">[MODULE 05 & 06]</span>
              <h4 className="text-xs font-bold uppercase tracking-tight">Booking Manager & Service Vouchers</h4>
            </div>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-bold block mb-1">LOGISTICS MANAGEMENT</span>
            <h3 className="text-sm font-bold uppercase tracking-tight mb-2">Zero Double Bookings</h3>
            <p className="text-xs text-zinc-700">Manage client bookings, transfer schedules, and supplier service vouchers seamlessly in one central pipeline.</p>
          </div>
        </div>

      </div>
    </section>
  );
}