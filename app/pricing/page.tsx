'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default async function PricingPage() {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  return (
    <main className="min-h-screen bg-[#F4F4F0] text-black font-sans selection:bg-black selection:text-white">
      
      
      <Navbar activeTab="PRICING" />

      {/* Pricing Hero Section */}
      <section className="px-4 py-16 md:py-24 border-b border-black relative">
        <div className="absolute top-2 left-2 text-xs">┌</div>
        <div className="absolute top-2 right-2 text-xs">┐</div>
        
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-black pb-12 mb-12">
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95] max-w-5xl">
              Transparent Pricing. Zero Hidden Fees. Built to Protect Your Profits.
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <p className="text-sm leading-relaxed text-zinc-900 font-medium">
                Choose the tier that matches your agency . Every plan includes full access to our core modules—Itinerary Builder, Quotation Builder, Invoice Generator, and Costing Matrices—backed by our zero-loss data migration support.
              </p>
            </div>
            <div className="lg:col-span-4 border border-black p-6 bg-[#EBEBE6]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-2">■ Zero-Risk Setup</span>
              <p className="text-xs font-bold uppercase tracking-tight mb-2">We build your custom pipeline and migrate your historical spreadsheets for free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers Grid */}
      <section className="border-b border-black bg-[#F4F4F0]">
        <div className="px-4 py-4 border-b border-black flex justify-between items-center text-xs font-bold uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-black inline-block" />
            ■ Subscription Tiers
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-black">
          
          {/* Tier 1: Starter / Boutique */}
          <div className="p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              
              <h3 className="text-xl font-bold uppercase tracking-tight">Starter Pack</h3>
              <p className="text-xs text-zinc-700">For independent tour operators scaling out of spreadsheets and manual WhatsApp workflows.</p>
              
              <div className="py-4 border-y border-black">
                <span className="text-3xl font-black tracking-tighter">Ksh 999</span>
                <span className="text-xs text-zinc-500 font-mono"> / MONTH</span>
              </div>

              <ul className="space-y-2 text-xs text-zinc-800">
                <li>✓ Full Itinerary & Quotation Builder</li>
                <li>✓ Basic Invoice Generator</li>
                <li>✓ Standard Costing Matrix</li>
                <li>✓ Up to 3 Team Seats</li>
                <li>✓ Free Spreadsheet Migration</li>
              </ul>
            </div>

            <div className="pt-4">
              <Link 
                href="/signup?tier=starter" 
                className="w-full block text-center border border-black py-2 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-transparent hover:text-black transition-colors"
              >
                Select Pack ↗
              </Link>
            </div>
          </div>

         
          <div className="p-8 flex flex-col justify-between space-y-8 bg-[#EBEBE6]">
            <div className="space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-tight">Tour Deluxe</h3>
              <p className="text-xs text-zinc-800">For established travel companies managing high-volume bookings and complex multi-day safaris.</p>
              
              <div className="py-4 border-y border-black">
                <span className="text-3xl font-black tracking-tighter">Ksh 1,499</span>
                <span className="text-xs text-zinc-700 font-mono"> / MONTH</span>
              </div>

              <ul className="space-y-2 text-xs text-zinc-900 font-medium">
                <li>✓ Everything in Starter</li>
                <li>✓ Advanced Costing Sheet & Margin Locks</li>
                <li>✓ Booking Manager & Service Vouchers</li>
                <li>✓ Transfer & Fleet Management</li>
                <li>✓ Up to 10 Team Seats</li>
                <li>✓ Priority 24/7 Migration Support</li>
              </ul>
            </div>

            <div className="pt-4">
              <Link 
                href="/signup?tier=growth" 
                className="w-full block text-center border border-black py-2 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-transparent hover:text-black transition-colors"
              >
                Select Pack ↗
              </Link>
            </div>
          </div>

          {/* Tier 3: Enterprise */}
          <div className="p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-tight">Custom Pack</h3>
              <p className="text-xs text-zinc-700">For large tour firms requiring bespoke API integrations, custom document templates, and multi-branch setups.</p>
              
              <div className="py-4 border-y border-black">
                <span className="text-3xl font-black tracking-tighter">CUSTOM</span>
                <span className="text-xs text-zinc-500 font-mono"> / TAILORED</span>
              </div>

              <ul className="space-y-2 text-xs text-zinc-800">
                <li>✓ Unlimited Team Seats</li>
                <li>✓ Custom Multi-Tenant Authentication</li>
                <li>✓ Dedicated Database Architecture</li>
                <li>✓ Custom API & Accounting Webhooks</li>
                <li>✓ Dedicated Account Engineer</li>
              </ul>
            </div>

            <div className="pt-4">
              <Link 
                href="/contact" 
                className="w-full block text-center border border-black py-2 bg-transparent text-black text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                Contact Us ↗
              </Link>
            </div>
          </div>

        </div>
      </section>

      
      <Footer />

    </main>
  );
}