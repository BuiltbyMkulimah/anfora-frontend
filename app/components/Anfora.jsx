'react';
import { Globe, ArrowUpRight } from 'lucide-react';

export default function OperationalRigor() {
  return (
    <section id="migration" className="border-b border-black py-16 px-4 bg-[#F4F4F0]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Visual Coordinate Box */}
        <div className="lg:col-span-7 border border-black p-8 bg-[#EBEBE6] relative">
          <div className="text-center py-12">
            <Globe className="w-16 h-16 mx-auto mb-4 stroke-[1]" />
            <h3 className="text-xl font-black uppercase tracking-tight mb-2">Engineered For Tour Operators</h3>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">Built from the ground up to handle regional park logistics, multi-day excursions, and complex supplier payouts without spreadsheet friction.</p>
          </div>
          <div className="absolute bottom-4 left-4 text-[10px] space-y-1 font-mono text-zinc-600">
            <p>REGION: NAIROBI / EAST AFRICA</p>
          </div>
        </div>

        {/* Right Content Column */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">■ Where we come in</h2>
          <p className="text-sm leading-relaxed text-zinc-900 font-medium">
            Generic software fails tour companies because it ignores seasonal pricing, lodge allocations, and driver schedules. Anfora unifies your client communication, costing matrices, and backend execution into one seamless interface.
          </p>
          <div className="pt-4 border-t border-black flex items-center justify-between text-xs font-mono">
            <span>SUPPORT: 24/7</span>
            <span>RISK: 0%</span>
          </div>
        </div>

      </div>
    </section>
  );
}