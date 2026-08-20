'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default async function ServicesPage() {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  return (
    <main className="min-h-screen bg-[#F4F4F0] text-black font-sans selection:bg-black selection:text-white">
      
      
      <Navbar activeTab="OUR SERVICES" />

      {/* Services Hero Section */}
      <section className="px-4 py-16 md:py-24 border-b border-black relative">
        <div className="absolute top-2 left-2 text-xs">┌</div>
        <div className="absolute top-2 right-2 text-xs">┐</div>
        
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-black pb-12 mb-12">
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95] max-w-5xl">
              The Complete CRM Built to Stop Margin Bleed.
            </h1>
          </div>

          {/* Intro Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <p className="text-sm leading-relaxed text-zinc-900 font-medium">
                Spreadsheets and manual WhatsApp messaging destroy profitability before a safari even starts. Anfora replaces disconnected tools with a unified pipeline engineered explicitly for East African tour operators, travel agencies, and safari outfitters.
              </p>
            </div>
            <div className="lg:col-span-4 border border-black p-6 bg-[#EBEBE6]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-2">■ OUR PROMISE</span>
              <p className="text-xs font-bold uppercase tracking-tight mb-2">Zero-loss historical data migration included with every setup.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Product Suite Grid */}
      <section className="border-b border-black bg-[#F4F4F0]">
        <div className="px-4 py-4 border-b border-black flex justify-between items-center text-xs font-bold uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-black inline-block" />
            ■ Feature Breakdown
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black">
          
          
          <div className="p-8 space-y-4 border-b border-black md:border-b-0">
            <span className="text-[10px] font-mono text-zinc-500 block">[ITINERARY]</span>
            <h3 className="text-base font-bold uppercase tracking-tight">Itinerary Builder</h3>
            <p className="text-xs text-zinc-700 leading-relaxed">
              Design stunning, media-rich day-by-day safari itineraries with automated lodge allocations, park routing, and professional formatting in minutes.
            </p>
          </div>

          
          <div className="p-8 space-y-4 border-b border-black md:border-b-0">
            <span className="text-[10px] font-mono text-zinc-500 block">[QUOTATION]</span>
            <h3 className="text-base font-bold uppercase tracking-tight">Quotation Builder</h3>
            <p className="text-xs text-zinc-700 leading-relaxed">
              Turn client inquiries into precise multi-option proposals instantly, factoring in seasonal park fees, vehicle counts, and custom markup tiers.
            </p>
          </div>

     
          <div className="p-8 space-y-4 border-b border-black">
            <span className="text-[10px] font-mono text-zinc-500 block">[INVOICE]</span>
            <h3 className="text-base font-bold uppercase tracking-tight">Invoice Generator</h3>
            <p className="text-xs text-zinc-700 leading-relaxed">
              Issue secure, professional payment documents tied directly to your booking pipeline to eliminate financial discrepancies and delayed payments.
            </p>
          </div>

          
          <div className="p-8 space-y-4 border-b border-black lg:border-b-0">
            <span className="text-[10px] font-mono text-zinc-500 block">[ COSTING]</span>
            <h3 className="text-base font-bold uppercase tracking-tight">Costing Sheet Matrix</h3>
            <p className="text-xs text-zinc-700 leading-relaxed">
              Never miscalculate a margin again. Lock down supplier rates, accommodation overheads, and operational expenses in a bulletproof pricing matrix.
            </p>
          </div>

          {/* Module 05 */}
          <div className="p-8 space-y-4 border-b border-black lg:border-b-0">
            <span className="text-[10px] font-mono text-zinc-500 block">[BOOKING]</span>
            <h3 className="text-base font-bold uppercase tracking-tight">Booking Manager</h3>
            <p className="text-xs text-zinc-700 leading-relaxed">
              Track reservation statuses, client details, payment schedules, and operational confirmations in one centralized, conflict-free dashboard.
            </p>
          </div>

          {/* Module 06 */}
          <div className="p-8 space-y-4">
            <span className="text-[10px] font-mono text-zinc-500 block">[ VOUCHERS & TRANSFERS]</span>
            <h3 className="text-base font-bold uppercase tracking-tight">Service Vouchers & Transfers</h3>
            <p className="text-xs text-zinc-700 leading-relaxed">
              Generate automated supplier service vouchers and coordinate complex fleet transfer logistics without messy manual dispatch errors.
            </p>
          </div>

        </div>
      </section>

     
      <section className="px-4 py-16 border-b border-black bg-[#EBEBE6] text-center space-y-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">■ SECURE YOUR PROFITS</span>
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight max-w-3xl mx-auto">
          Ready to Stop Losing Profita to Spreadsheets?
        </h2>
        <div className="pt-2">
          <Link 
            href="/signup" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider border-b border-black pb-1 hover:opacity-60 transition-opacity"
          >
            Start Your Migration <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

     
      <Footer />

    </main>
  );
}