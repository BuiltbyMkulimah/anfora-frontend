'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default async function AboutPage() {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  return (
    <main className="min-h-screen bg-[#F4F4F0] text-black font-sans selection:bg-black selection:text-white">
      
      
      <Navbar activeTab="ABOUT" />

      
      <section className="px-4 py-16 md:py-24 border-b border-black relative">
        <div className="absolute top-2 left-2 text-xs">┌</div>
        <div className="absolute top-2 right-2 text-xs">┐</div>
        
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-black pb-12 mb-12">
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95] max-w-5xl">
              Built by tour operators, for tour operators—a community coming together in East Africa to transform how we work.
            </h1>
          </div>

          {/* Newspaper Multi-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-8 space-y-6">
              <p className="text-sm leading-relaxed text-zinc-900 font-medium">
                Anfora is built by YOLO Connect KE, operating out of Nairobi, Kenya. We witnessed firsthand how brilliant tour operators and safari outfitters were bleeding margins simply because they were forced to run multi-thousand dollar itineraries on messy WhatsApp threads, broken spreadsheets, and poorly formatted invoicing templates.
              </p>
              <p className="text-sm leading-relaxed text-zinc-700">
                Generic global CRMs fail African travel agencies because they don't understand seasonal park fee structures, complex lodge allocations, or regional transfer logistics. We set out to engineer a bulletproof pipeline that combines rigorous financial control with seamless automated documentation.
              </p>
            </div>

            <div className="lg:col-span-4 border border-black p-6 bg-[#EBEBE6] space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block">■ System Origin</span>
              <p className="text-xs font-bold uppercase tracking-tight">Proudly conceptualized and architected by YOLO Connect KE for East African and global tour enterprises.</p>
              <div className="pt-2 border-t border-black text-[11px] font-mono">
                <p>NAIROBI, KENYA</p>
              </div>
            </div>

          </div>
        </div>
      </section>


      <section className="border-b border-black bg-[#F4F4F0]">
        <div className="px-4 py-4 border-b border-black flex justify-between items-center text-xs font-bold uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-black inline-block" />
            ■ Our System Promise
          </span>
          <span>ZERO TOLERANCE FOR MARGIN BLEED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black">
          
          <div className="p-8 space-y-4">
            <span className="text-[10px] font-mono text-zinc-500 block">[Value over Perseption]</span>
            <h3 className="text-base font-bold uppercase tracking-tight">Precision Over Templates</h3>
            <p className="text-xs text-zinc-700 leading-relaxed">
              Every costing sheet, invoice generator, and itinerary builder is structured to eliminate human error and protect your bottom line before a trip launches.
            </p>
          </div>

          <div className="p-8 space-y-4">
            <span className="text-[10px] font-mono text-zinc-500 block">[Analyse for the Future]</span>
            <h3 className="text-base font-bold uppercase tracking-tight">Zero-Loss Data Migration</h3>
            <p className="text-xs text-zinc-700 leading-relaxed">
              We take your historical records out of chaotic Excel sheets and restructure them into a clean, working database environment without missing a single booking.
            </p>
          </div>

          <div className="p-8 space-y-4">
            <span className="text-[10px] font-mono text-zinc-500 block">[Seamless Tasks]</span>
            <h3 className="text-base font-bold uppercase tracking-tight">Frictionless Workflow</h3>
            <p className="text-xs text-zinc-700 leading-relaxed">
              Replacing messy chats with a unified system means your team spends less time arguing over spreadsheets and more time closing enterprise clients.
            </p>
          </div>

        </div>
      </section>

      
      <section className="px-4 py-16 border-b border-black bg-[#EBEBE6] text-center space-y-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">■ JOIN THE SYSTEM</span>
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight max-w-3xl mx-auto">
          Ready to Upgrade Your Tour Operations?
        </h2>
        <div className="pt-2">
          <Link 
            href="/signup" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider border-b border-black pb-1 hover:opacity-60 transition-opacity"
          >
            Setup Now !<ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      
      <Footer />

    </main>
  );
}