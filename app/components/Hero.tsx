'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="px-4 py-16 md:py-24 border-b border-black relative bg-[#F4F4F0]">
      {/* Corner alignment markers */}
      <div className="absolute top-2 left-2 text-xs">┌</div>
      <div className="absolute top-2 right-2 text-xs">┐</div>
      
      <div className="max-w-7xl mx-auto">
        
        {/* Main Headline */}
        <div className="border-b border-black pb-12 mb-12">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95] max-w-5xl">
            If Your Tour Agency Still Uses Spreadsheets, Your Operations Suck!!
          </h1>
        </div>

        {/* Newspaper Multi-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Statement Column */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:pr-12 lg:border-r border-black">
            
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">[YOUR PROBLEM]</p>
              <p className="text-base font-bold leading-snug text-zinc-900">
                You are losing profits to messy WhatsApp chats , losing clients to shitty invoices, bad itineraries, broken costing matrices, and poor operational planning that destroys your revenue before the trip even starts. 
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">[OUR SOLUTION]</p>
              <p className="text-sm leading-relaxed text-zinc-700">
                Anfora replaces guesswork with a bulletproof pipeline. Accurate pricing structures, flawless professional documents, and clean automated itineraries.
              </p>
              <div className="pt-2">
                <Link 
                  href="/signup" 
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider border-b border-black pb-1 hover:opacity-60 transition-opacity"
                >
                  Claim  Migration <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* Right Meta Column */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-between h-full">
            <div className="border border-black p-6 bg-[#EBEBE6]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-2">■ Zero Risk Guarantee</span>
              <p className="text-xs font-bold uppercase tracking-tight mb-4">We configure your costing sheets, automated itineraries, and invoice generators from your existing data—risk-free.</p>
              
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}