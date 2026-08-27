'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { ArrowUpRight, Plus, FileText, Calculator, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#F4F4F0] text-black font-sans selection:bg-black selection:text-white">
      
      {/* Top System Bar */}
      <div className="border-b border-black bg-black text-white px-4 py-2 flex justify-between items-center text-xs font-mono uppercase tracking-widest">
        <span>CLIENT TERMINAL // AUTHORIZED ACCESS</span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          SYSTEM SECURE
        </span>
      </div>

      {/* Standard Site Navigation */}
      <Navbar activeTab="DASHBOARD" />

      {/* Dashboard Header Section */}
      <section className="px-4 py-12 border-b border-black relative bg-[#F5F2EB]">
        <div className="absolute top-2 left-2 text-xs">┌</div>
        <div className="absolute top-2 right-2 text-xs">┐</div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">[OPERATIONAL CONTROL // 05]</p>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
              Welcome back, Operator.
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard/quotations/new" 
              className="border border-black bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-transparent hover:text-black transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New Quotation
            </Link>
            <Link 
              href="/dashboard/itineraries/new" 
              className="border border-black bg-[#EBE7DF] px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" /> Build Itinerary
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Metrics Grid */}
      <section className="border-b border-black grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-black bg-[#F4F4F0]">
        
        <div className="p-6 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">■ Active Pipelines</span>
          <div className="text-3xl font-black tracking-tight">14</div>
          <p className="text-xs text-zinc-600">Safaris currently in quotation stage</p>
        </div>

        <div className="p-6 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">■ Confirmed Bookings</span>
          <div className="text-3xl font-black tracking-tight">08</div>
          <p className="text-xs text-zinc-600">Departing this quarter</p>
        </div>

        <div className="p-6 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">■ Protected Margin</span>
          <div className="text-3xl font-black tracking-tight">24.5%</div>
          <p className="text-xs text-zinc-600">Average agency markup locked</p>
        </div>

        <div className="p-6 space-y-2 bg-[#EBE7DF]">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">■ System Status</span>
          <div className="text-sm font-bold uppercase tracking-tight pt-1">All Modules Operational</div>
          <p className="text-xs text-zinc-600">Database sync completed</p>
        </div>

      </section>

      {/* Main Terminal Activity Grid */}
      <section className="border-b border-black grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-black">
        
        {/* Left Column: Recent Bookings & Quotations Table (8 Spans) */}
        <div className="lg:col-span-8 p-6 md:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-black pb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" />
              Recent Client Quotations & Itineraries
            </h3>
            <Link href="/dashboard/quotations" className="text-xs font-mono underline uppercase hover:opacity-60">
              View All ↗
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-black text-zinc-500 uppercase">
                  <th className="pb-3 font-bold">Client / Ref</th>
                  <th className="pb-3 font-bold">Route / Destination</th>
                  <th className="pb-3 font-bold">Status</th>
                  <th className="pb-3 font-bold text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-300">
                <tr>
                  <td className="py-4 font-bold text-black">#ANF-9021 // Miller Group</td>
                  <td>Maasai Mara / Serengeti</td>
                  <td><span className="bg-green-100 text-green-900 px-2 py-0.5 text-[10px] uppercase font-bold border border-green-400">Confirmed</span></td>
                  <td className="text-right font-bold">$12,450</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-black">#ANF-9022 // Van Der Berg</td>
                  <td>Amboseli / Tsavo West</td>
                  <td><span className="bg-yellow-100 text-yellow-900 px-2 py-0.5 text-[10px] uppercase font-bold border border-yellow-400">Pending Review</span></td>
                  <td className="text-right font-bold">$8,200</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-black">#ANF-9023 // Thorne Family</td>
                  <td>Bwindi Gorillas / Queen Elizabeth</td>
                  <td><span className="bg-zinc-200 text-zinc-800 px-2 py-0.5 text-[10px] uppercase font-bold border border-black">Drafting</span></td>
                  <td className="text-right font-bold">$15,900</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Quick Tools & Supplier Costing (4 Spans) */}
        <div className="lg:col-span-4 p-6 md:p-8 space-y-6 bg-[#F5F2EB]">
          <h3 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-black inline-block" />
            ■ Quick Tool Access
          </h3>

          <div className="space-y-4">
            
            <Link href="/dashboard/costing" className="block border border-black p-4 bg-[#F4F4F0] hover:bg-black hover:text-white transition-colors group">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold uppercase tracking-tight group-hover:text-white">Costing Sheet Matrix</span>
                <Calculator className="w-4 h-4" />
              </div>
              <p className="text-[11px] text-zinc-600 group-hover:text-zinc-300">Update seasonal park fees & hotel bed-night rates.</p>
            </Link>

            <Link href="/dashboard/invoices" className="block border border-black p-4 bg-[#F4F4F0] hover:bg-black hover:text-white transition-colors group">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold uppercase tracking-tight group-hover:text-white">Invoice Generator</span>
                <FileText className="w-4 h-4" />
              </div>
              <p className="text-[11px] text-zinc-600 group-hover:text-zinc-300">Issue secure payment links tied to active bookings.</p>
            </Link>

            <Link href="/dashboard/vouchers" className="block border border-black p-4 bg-[#F4F4F0] hover:bg-black hover:text-white transition-colors group">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold uppercase tracking-tight group-hover:text-white">Supplier Vouchers</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-[11px] text-zinc-600 group-hover:text-zinc-300">Dispatch logistics and accommodation confirmation notes.</p>
            </Link>

          </div>
        </div>

      </section>

      {/* Footer */}
      <Footer />

    </main>
  );
}