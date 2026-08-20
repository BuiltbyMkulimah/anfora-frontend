'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default async function ApproachPage() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return (
    <main className="min-h-screen bg-[#F4F4F0] text-black font-sans selection:bg-black selection:text-white">
      
      <Navbar activeTab="OUR APPROACH" />

      
      <section className="px-4 py-16 md:py-24 border-b border-black relative">
        <div className="absolute top-2 left-2 text-xs">┌</div>
        <div className="absolute top-2 right-2 text-xs">┐</div>
        
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-black pb-12 mb-12">
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95] max-w-5xl">
              We Don't Do Software Templates. We Engineer Custom Tour Operations.
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="space-y-4 lg:border-r lg:border-black lg:pr-8">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">OUR AUDIT</span>
              <h3 className="text-sm font-bold uppercase tracking-tight">The Spreadsheet Extraction</h3>
              <p className="text-xs leading-relaxed text-zinc-800">
                Most agencies are drowning in unstructured Excel files, chaotic WhatsApp threads, and unverified supplier rates. We audit your exact operational bottlenecks before writing a single line of code.
              </p>
            </div>

            <div className="space-y-4 lg:border-r lg:border-black lg:pr-8">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">THE MIGRATION</span>
              <h3 className="text-sm font-bold uppercase tracking-tight">Seamless Data Transition</h3>
              <p className="text-xs leading-relaxed text-zinc-800">
                We configure your precise costing matrices, automated itinerary generators, and professional invoicing templates tailored explicitly to East African safari logistics.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">THE DEPLOYMENT</span>
              <h3 className="text-sm font-bold uppercase tracking-tight">Zero-Loss Migration</h3>
              <p className="text-xs leading-relaxed text-zinc-800">
                Your historical booking data is securely migrated into a unified database structure. Your team gets trained on a live pipeline built to eliminate revenue bleed instantly.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Editorial Quote / Callout Section */}
      <section className="px-4 py-16 border-b border-black bg-[#EBEBE6]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">■ THE ANFORA STANDARD</span>
          <blockquote className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight">
            "If your software doesn't protect your profits, handle lodge allocations, and generate flawless documents automatically, it's just expensive paperwork."
          </blockquote>
          <div className="pt-4">
            <Link 
              href="/signup" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider border-b border-black pb-1 hover:opacity-60 transition-opacity"
            >
              Start Migration <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </main>
  );
}