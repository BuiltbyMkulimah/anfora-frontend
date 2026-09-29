'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, ArrowLeft, Sliders, Users, UserCheck, CheckCircle2, History, Building, Mail, Phone, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ClientRecord {
  client_id: string;
  client_name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  status: string;
  assigned_package: string;
  created_at: string;
}

export default function ClientsPage() {
  const pathname = usePathname();

  // RGB Theme State
  const [rgbColor, setRgbColor] = useState({ r: 0, g: 0, b: 0 });
  const customHex = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;

  // Client Form State
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('PROSPECT');
  const [assignedPackage, setAssignedPackage] = useState('');

  const [loading, setLoading] = useState(false);
  const [responseResult, setResponseResult] = useState<any>(null);

  // Backend Data States for Client Directory
  const [clientsList, setClientsList] = useState<ClientRecord[]>([]);
  const [fetchingData, setFetchingData] = useState(false);

  // Fetch initial clients from backend on mount
  useEffect(() => {
    const fetchClients = async () => {
      setFetchingData(true);
      try {
        const res = await fetch('http://localhost:5000/clients');
        if (!res.ok) throw new Error('Failed to fetch clients');
        const data = await res.json();
        setClientsList(data);
      } catch (err) {
        console.error('Error loading clients from backend:', err);
        setClientsList([]);
      } finally {
        setFetchingData(false);
      }
    };

    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseResult(null);

    const payload = {
      client_name: clientName,
      email,
      phone,
      company,
      location,
      status,
      assigned_package: assignedPackage
    };

    try {
      const res = await fetch('http://localhost:5000/clients/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (res.ok) {
        setResponseResult(data);
        // Refresh local list or append new record
        setClientsList(prev => [data, ...prev]);
      } else {
        alert('Error: ' + (data.error || 'Failed to save client profile'));
      }
    } catch (err) {
      console.error('Network error during submission:', err);
      // Simulated fallback for immediate development testing
      const simulatedRecord = {
        client_id: 'CLI-88401',
        client_name: clientName,
        email,
        phone,
        company,
        location,
        status,
        assigned_package: assignedPackage || 'Custom Itinerary',
        created_at: new Date().toISOString()
      };
      setResponseResult({
        message: 'Client registered successfully (Simulated Backend)',
        ...simulatedRecord
      });
      setClientsList(prev => [simulatedRecord, ...prev]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-black p-4 sm:p-8 font-mono uppercase text-xs selection:bg-black selection:text-white">
      
      {/* Top Header, Navigation Switcher & RGB Customizer Bar */}
      <div className="max-w-4xl mx-auto mb-6 bg-white border border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold hover:opacity-60 transition-opacity">
            <ArrowLeft className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 border-l border-black pl-4">
            
            <Link
              href="/clients/history"
              className={`px-3 py-1.5 border border-black font-bold transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-flex items-center ${
                pathname === '/clients/history' ? 'bg-black text-white' : 'bg-[#F4F4F0] text-black hover:bg-zinc-200'
              }`}
            >
              <History className="h-3 w-3 inline mr-1" />
              <span>Client History</span>
            </Link>
          </div>
        </div>

        
      </div>

      {/* Register Client Form View */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        
        {/* Client Profile Card */}
        <div className="bg-white border border-black p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <h2 className="font-bold border-b border-black pb-3 flex items-center gap-2 text-zinc-800 text-sm">
            <UserCheck className="h-4 w-4" style={{ color: customHex }} />
            <span>[Client Profile Information]</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Full Name / Contact Person</label>
              <input 
                type="text" 
                value={clientName} 
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@example.com"
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Phone Number</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254 712 345 678"
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Company / Organization</label>
              <input 
                type="text" 
                value={company} 
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Optional / Private Group"
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Location / Origin</label>
              <input 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Nairobi, Kenya"
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">CRM Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs cursor-pointer"
              >
                <option value="PROSPECT">INQUIRY</option>
                <option value="QUOTATION_SENT">QUOTATION SENT</option>
                <option value="CONFIRMED_BOOKING">CONFIRMED BOOKING</option>
                <option value="COMPLETED">COMPLETED TRIP</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Assigned Package / Itinerary Reference</label>
              <input 
                type="text" 
                value={assignedPackage} 
                onChange={(e) => setAssignedPackage(e.target.value)}
                placeholder="e.g. Standard Mara Migration Safari (4 Days)"
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="bg-white border border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <button 
            type="submit"
            disabled={loading}
            className="w-full border border-black p-4 text-white font-bold text-xs tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ backgroundColor: customHex }}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>{loading ? 'REGISTERING & SAVING CLIENT...' : 'CREATE & SAVE CLIENT PROFILE (POST)'}</span>
          </button>
        </div>

      </form>

      {/* API Response Success Modal / Card */}
      {responseResult && (
        <div className="max-w-4xl mx-auto mt-6 bg-white border border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex items-center gap-2 font-bold text-xs text-black border-b border-black pb-3">
            <CheckCircle2 className="h-4 w-4" style={{ color: customHex }} />
            <span>{responseResult.message || 'Client registered successfully!'}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#F4F4F0] p-4 border border-black text-[11px]">
            <div><span className="text-[10px] text-zinc-500 block font-bold">Client ID</span> <span className="font-bold text-black">{responseResult.client_id}</span></div>
            <div><span className="text-[10px] text-zinc-500 block font-bold">Client Name</span> <span className="font-bold" style={{ color: customHex }}>{responseResult.client_name}</span></div>
            <div><span className="text-[10px] text-zinc-500 block font-bold">Pipeline Status</span> <span className="font-bold">{responseResult.status}</span></div>
            <div><span className="text-[10px] text-zinc-500 block font-bold">Package</span> <span className="font-bold">{responseResult.assigned_package || 'None'}</span></div>
          </div>
        </div>
      )}

    </div>
  );
}