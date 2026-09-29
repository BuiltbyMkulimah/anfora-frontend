'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus, Bell, HelpCircle, ChevronDown, LogOut, Settings, ShieldUser } from 'lucide-react';
import { useState } from 'react';

interface AdminNavbarProps {
  activeTab?: string;
}

export default function AdminNavbar({ activeTab }: AdminNavbarProps) {
  const pathname = usePathname();
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <nav className="border-b border-black px-4 py-3 flex items-center justify-between text-xs tracking-wider uppercase bg-[#F4F4F0] sticky top-0 z-50">
      
      {/* Brand Identity Element */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="font-bold hover:opacity-60 transition-opacity flex items-center gap-2">
          ANFORA
        </Link>
        <span className="hidden lg:inline text-zinc-500">| PRODUCT OF YOLO CONNECT KE</span>
      </div>

      
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-6 text-[11px]">
          <NavLink href="/dashboard" label="DASHBOARD" isActive={activeTab === "DASHBOARD" || pathname === "/dashboard"} />
          <NavLink href="/dashboard/itineraries" label="ITINERARY" isActive={activeTab === "ITINERARY" || pathname?.startsWith("/dashboard/itineraries")} />
          <NavLink href="/dashboard/bookings" label="BOOKINGS" isActive={activeTab === "BOOKINGS" || pathname?.startsWith("/dashboard/bookings")} />
          <NavLink href="/dashboard/clients" label="CLIENTS" isActive={activeTab === "CLIENTS" || pathname?.startsWith("/dashboard/clients")} />
          <NavLink href="/dashboard/suppliers" label="SUPPLIERS" isActive={activeTab === "SUPPLIERS" || pathname?.startsWith("/dashboard/suppliers")} />
        </div>

        <div className="flex items-center gap-3">
          
          
          <div className="relative">
            <button
              onClick={() => setQuickAddOpen(!quickAddOpen)}
              className="border border-black px-3 py-1 bg-black text-white font-bold text-[10px] hover:bg-transparent hover:text-black transition-colors flex items-center gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>NEW ACTION</span>
            </button>

            {quickAddOpen && (
              <div className="absolute right-0 mt-2 w-48 border border-black bg-[#F4F4F0] p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50">
                <Link 
                  href="/dashboard/bookings/new" 
                  onClick={() => setQuickAddOpen(false)}
                  className="block px-3 py-2 text-[11px] text-zinc-800 hover:bg-black hover:text-white transition-colors"
                >
                  + New Booking
                </Link>
                <Link 
                  href="/dashboard/itineraries/new" 
                  onClick={() => setQuickAddOpen(false)}
                  className="block px-3 py-2 text-[11px] text-zinc-800 hover:bg-black hover:text-white transition-colors"
                >
                  + Create Itinerary
                </Link>
                <Link 
                  href="/dashboard/clients/new" 
                  onClick={() => setQuickAddOpen(false)}
                  className="block px-3 py-2 text-[11px] text-zinc-800 hover:bg-black hover:text-white transition-colors"
                >
                  + Add Traveler
                </Link>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <button 
            aria-label="View notifications"
            className="relative p-1.5 border border-black hover:bg-black hover:text-white transition-colors text-black"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-black border border-white" />
          </button>

          {/* Help Documentation */}
          <Link 
            href="/docs" 
            aria-label="Help and Documentation"
            className="hidden sm:block p-1.5 border border-black hover:bg-black hover:text-white transition-colors text-black"
          >
            <HelpCircle className="h-4 w-4" />
          </Link>

          {/* Workspace / Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 border border-black px-2 py-1 bg-white hover:bg-zinc-100 transition-colors"
            >
              <div className="flex h-5 w-5 items-center justify-center bg-black text-white font-bold text-[9px]">
                MW
              </div>
              <ChevronDown className="h-3 w-3 text-black" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 border border-black bg-[#F4F4F0] p-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50">
                <div className="px-3 py-2 border-b border-black mb-1">
                  <p className="font-bold text-black text-[11px]">Maitai Safaris</p>
                  <p className="text-[10px] text-zinc-500 lowercase">mwangi@maitaisafaris.com</p>
                </div>
                <Link 
                  href="/dashboard/settings" 
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-[11px] text-zinc-800 hover:bg-black hover:text-white transition-colors"
                >
                  <Settings className="h-3.5 w-3.5" />
                  Agency Settings
                </Link>
                <Link 
                  href="/dashboard/team" 
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-[11px] text-zinc-800 hover:bg-black hover:text-white transition-colors"
                >
                  <ShieldUser className="h-3.5 w-3.5" />
                  Team Permissions
                </Link>
                <div className="my-1 border-t border-black" />
                <button
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-[11px] text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Log out
                </button>
              </div>
            )}
          </div>

        </div>
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