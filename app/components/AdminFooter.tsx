'react';
import Link from 'next/link';

interface AdminFooterProps {
  activeTab?: string;
}

export default function AdminFooter({ activeTab }: AdminFooterProps) {
  return (
    <footer className="bg-black text-white px-4 py-12 text-xs border-t border-black">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-zinc-800 pb-12 mb-8">
        
        {/* Product / Operations Column */}
        <div className="space-y-3">
          <span className="font-bold tracking-wider text-zinc-400 block uppercase">[Workspace]</span>
          <ul className="space-y-2 text-zinc-300">
            <li><Link href="/dashboard" className="hover:underline">Dashboard Overview</Link></li>
            <li><Link href="/dashboard/itineraries" className="hover:underline">Itinerary Builder</Link></li>
            <li><Link href="/dashboard/bookings" className="hover:underline">Bookings & Pipeline</Link></li>
            <li><Link href="/dashboard/clients" className="hover:underline">Traveler CRM</Link></li>
            <li><Link href="/dashboard/suppliers" className="hover:underline">Supplier Directory</Link></li>
            <li><Link href="/dashboard/finances" className="hover:underline">Finances & Invoices</Link></li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="space-y-3">
          <span className="font-bold tracking-wider text-zinc-400 block uppercase">[Company]</span>
          <ul className="space-y-2 text-zinc-300">
            <li><Link href="/about" className="hover:underline">About Anfora</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact Support</Link></li>
            <li><Link href="/partners" className="hover:underline">Tour Operator Partners</Link></li>
          </ul>
        </div>

        {/* Support Column */}
        <div className="space-y-3">
          <span className="font-bold tracking-wider text-zinc-400 block uppercase">[Support]</span>
          <ul className="space-y-2 text-zinc-300">
            <li><Link href="/docs" className="hover:underline">Documentation</Link></li>
            <li><Link href="/dashboard/team" className="hover:underline">Team Permissions</Link></li>
            <li><Link href="/security" className="hover:underline">Terms & Security</Link></li>
          </ul>
        </div>

        {/* Contact Information Column */}
        <div className="space-y-3">
          <span className="font-bold tracking-wider text-zinc-400 block uppercase">[Contact]</span>
          <ul className="space-y-2 text-zinc-300">
            <li className="select-all">yoloconnectke@gmail.com</li>
            <li className="select-all">bytevision@gmail.com</li>
            <li className="select-all">itsjustmaitai@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright & Credits Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-zinc-500 text-[10px] tracking-wider uppercase">
        <p>© ANFORA® PRO 2026</p>
        <span className="mt-2 md:mt-0 underline cursor-pointer hover:text-white transition-colors">
          PRODUCT OF YOLO CONNECT KE
        </span>
      </div>
    </footer>
  );
}