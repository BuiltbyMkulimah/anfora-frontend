'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white px-4 py-12 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-zinc-800 pb-12 mb-8">
        
        
        <div className="space-y-3">
          <span className="font-bold tracking-wider text-zinc-400 block">[Product]</span>
          <ul className="space-y-2 text-zinc-300">
            <li><Link href="#itinerary" className="hover:underline">Itinerary Builder</Link></li>
            <li><Link href="#quotation" className="hover:underline">Quotation Builder</Link></li>
            <li><Link href="#invoice" className="hover:underline">Invoice Generator</Link></li>
            <li><Link href="#costing" className="hover:underline">Costing Sheet</Link></li>
            <li><Link href="#booking" className="hover:underline">Booking Manager</Link></li>
            <li><Link href="#service" className="hover:underline">Service Voucher</Link></li>
            <li><Link href="#transfer" className="hover:underline">Transfer Management</Link></li>
            <li><Link href="#letter" className="hover:underline">Letter</Link></li>
          </ul>
        </div>

        
        <div className="space-y-3">
          <span className="font-bold tracking-wider text-zinc-400 block">[Company]</span>
          <ul className="space-y-2 text-zinc-300">
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/partners" className="hover:underline">Partners</Link></li>
          </ul>
        </div>

       
        <div className="space-y-3">
          <span className="font-bold tracking-wider text-zinc-400 block">[Support]</span>
          <ul className="space-y-2 text-zinc-300">
            <li><Link href="/docs" className="hover:underline">Documentation</Link></li>
            <li><Link href="/migration-guide" className="hover:underline">Migration Guide</Link></li>
            <li><Link href="/security" className="hover:underline">Terms & Security</Link></li>
          </ul>
        </div>

        {/* Contact Information Column */}
        <div className="space-y-3">
          <span className="font-bold tracking-wider text-zinc-400 block">[Contact]</span>
          <ul className="space-y-2 text-zinc-300">
            <li className="select-all">yoloconnectke@gmail.com</li>
            <li className="select-all">bytevision@gmail.com</li>
            <li className="select-all">itsjustmaitai@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright & Credits Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-zinc-500 text-[10px]">
        <p>© ANFORA® 2026</p>
        <span className="mt-2 md:mt-0 underline cursor-pointer hover:text-white transition-colors">
          PRODUCT OF YOLO CONNECT KE
        </span>
      </div>
    </footer>
  );
}