'react';
import Link from 'next/link';

interface NavbarProps {
  activeTab?: string;
}

export default function Navbar({ activeTab }: NavbarProps) {
  return (
    <nav className="border-b border-black px-4 py-3 flex items-center justify-between text-xs tracking-wider uppercase bg-[#F4F4F0] sticky top-0 z-50">
      
      {/* Brand Identity Element */}
      <div className="flex items-center gap-4">
        <Link href="/" className="font-bold hover:opacity-60 transition-opacity">
          ANFORA
        </Link>
        <span className="hidden md:inline text-zinc-500">| CRM FOR TOUR AND TRAVEL AGENCIES</span>
        <span className="hidden md:inline text-zinc-500">| PRODUCT OF YOLO CONNECT KE</span>
      </div>

      {/* Navigation Links with Active / Hover Bottom Line */}
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-6 text-[11px]">
          
          <NavLink href="/approach" label="OUR APPROACH" isActive={activeTab === "OUR APPROACH"} />
          <NavLink href="/service" label="OUR SERVICES" isActive={activeTab === "OUR SERVICES"} />
          <NavLink href="/pricing" label="PRICING" isActive={activeTab === "PRICING"} />
          <NavLink href="/about" label="ABOUT" isActive={activeTab === "ABOUT"} />

        </div>

        {/* Call to Action Button Element */}
        <Link 
          href="/signup" 
          className="border border-black px-3 py-1 bg-black text-white font-bold text-[10px] hover:bg-transparent hover:text-black transition-colors"
        >
          START NOW ↗
        </Link>
      </div>

    </nav>
  );
}

function NavLink({ href, label, isActive }: { href: string; label: string; isActive?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`relative py-1 transition-colors hover:text-black ${
        isActive ? 'text-black font-bold' : 'text-zinc-600'
      } group`}
    >
      {label}
      {/* The active/hover bottom black line indicator */}
      <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-black transition-all duration-200 ${
        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`} />
    </Link>
  );
}