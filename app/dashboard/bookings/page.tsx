'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, ArrowLeft, Sliders, CalendarCheck, CheckCircle2, History, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BookingParticipant {
  full_name: string;
  passport_or_id: string;
  nationality: string;
}

interface BookingRecord {
  booking_ref: string;
  package_name: string;
  client_name: string;
  client_phone: string;
  client_email: string;
  start_date: string;
  end_date: string;
  total_pax: number;
  participants?: BookingParticipant[];
}

export default function BookingPage() {
  const pathname = usePathname();

  // RGB Theme State
  const [rgbColor, setRgbColor] = useState({ r: 0, g: 0, b: 0 });
  const customHex = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;

  const [bookingReference, setBookingReference] = useState('');
  const [packageName, setPackageName] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [participants, setParticipants] = useState<BookingParticipant[]>([
    { full_name: '', passport_or_id: '', nationality: '' }
  ]);

  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [responseResult, setResponseResult] = useState<any>(null);

  useEffect(() => {
    const fetchLatestBookingData = async () => {
      setFetchingData(true);
      try {
        const res = await fetch('http://localhost:5000/bookings/latest');
        if (!res.ok) throw new Error('Failed to fetch backend data');
        const data: BookingRecord = await res.json();
        
        // Populate form states with received backend data
        if (data.booking_ref) setBookingReference(data.booking_ref);
        if (data.package_name) setPackageName(data.package_name);
        if (data.client_name) setClientName(data.client_name);
        if (data.client_phone) setClientPhone(data.client_phone);
        if (data.client_email) setClientEmail(data.client_email);
        if (data.start_date) setStartDate(data.start_date);
        if (data.end_date) setEndDate(data.end_date);
        if (data.participants && data.participants.length > 0) {
          setParticipants(data.participants);
        }
      } catch (err) {
        console.error('Error connecting to backend API, keeping default states:', err);
      } finally {
        setFetchingData(false);
      }
    };

    fetchLatestBookingData();
  }, []);

  const handleParticipantChange = (index: number, field: keyof BookingParticipant, value: any) => {
    const newParticipants = [...participants];
    newParticipants[index] = { ...newParticipants[index], [field]: value };
    setParticipants(newParticipants);
  };

  const addParticipant = () => {
    setParticipants([...participants, { full_name: '', passport_or_id: '', nationality: '' }]);
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseResult(null);

    const payload = {
      booking_reference: bookingReference,
      package_name: packageName,
      client_name: clientName,
      client_phone: clientPhone,
      client_email: clientEmail,
      start_date: startDate,
      end_date: endDate,
      total_pax: participants.length,
      participants
    };

    try {
      const res = await fetch('http://localhost:5000/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (res.ok) {
        setResponseResult(data);
      } else {
        alert('Error: ' + (data.error || 'Failed to save booking'));
      }
    } catch (err) {
      console.error('Network error during submission:', err);
      // Fallback simulation for offline development
      setResponseResult({
        message: 'Booking confirmed and scheduled successfully (Simulated)',
        booking_ref: bookingReference,
        total_pax: participants.length
      });
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
              href="/bookings/history"
              className={`px-3 py-1.5 border border-black font-bold transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-flex items-center ${
                pathname === '/bookings/history' ? 'bg-black text-white' : 'bg-[#F4F4F0] text-black hover:bg-zinc-200'
              }`}
            >
              <History className="h-3 w-3 inline mr-1" />
              <span>Booking History</span>
            </Link>
          </div>
        </div>
        
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        
        {/* Booking Metadata Card */}
        <div className="bg-white border border-black p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-6 relative">
          {fetchingData && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex items-center justify-center z-10 gap-2 font-bold">
              <Loader2 className="h-5 w-5 animate-spin" style={{ color: customHex }} />
              <span>Syncing with Backend API...</span>
            </div>
          )}

          <h2 className="font-bold border-b border-black pb-3 flex items-center gap-2 text-zinc-800 text-sm">
            <CalendarCheck className="h-4 w-4" style={{ color: customHex }} />
            <span>[Booking Details]</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Booking Reference</label>
              <input 
                type="text" 
                value={bookingReference} 
                onChange={(e) => setBookingReference(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Package Name</label>
              <input 
                type="text" 
                value={packageName} 
                onChange={(e) => setPackageName(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Lead Client Name</label>
              <input 
                type="text" 
                value={clientName} 
                onChange={(e) => setClientName(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Lead Client Phone number</label>
              <input 
                type="text" 
                value={clientPhone} 
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Lead Client Email</label>
              <input 
                type="email" 
                value={clientEmail} 
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Start Date</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">End Date</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>
          </div>
        </div>

        {/* Participants / Pax List Card */}
        <div className="bg-white border border-black p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex items-center justify-between border-b border-black pb-3">
            <h3 className="font-bold text-zinc-500">[Booking Participants ({participants?.length || 0})]</h3>
            <button 
              type="button" 
              onClick={addParticipant}
              className="border border-black px-3 py-1.5 bg-[#F4F4F0] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              <span>Add Participant</span>
            </button>
          </div>

          <div className="space-y-3">
            {participants?.map((pax, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-[#F4F4F0] p-3 border border-black">
                <div className="sm:col-span-5">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={pax.full_name} 
                    onChange={(e) => handleParticipantChange(index, 'full_name', e.target.value)}
                    className="w-full border border-black p-2 bg-white font-bold text-xs"
                    required
                  />
                </div>
                <div className="sm:col-span-3">
                  <input 
                    type="text" 
                    placeholder="Passport / ID No." 
                    value={pax.passport_or_id} 
                    onChange={(e) => handleParticipantChange(index, 'passport_or_id', e.target.value)}
                    className="w-full border border-black p-2 bg-white font-bold text-xs"
                    required
                  />
                </div>
                <div className="sm:col-span-3">
                  <input 
                    type="text" 
                    placeholder="Nationality" 
                    value={pax.nationality} 
                    onChange={(e) => handleParticipantChange(index, 'nationality', e.target.value)}
                    className="w-full border border-black p-2 bg-white font-bold text-xs"
                  />
                </div>
                <div className="sm:col-span-1 flex justify-center">
                  <button 
                    type="button" 
                    onClick={() => removeParticipant(index)}
                    disabled={participants.length === 1}
                    className="p-2 border border-black bg-white hover:bg-red-50 text-red-600 disabled:opacity-30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
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
            <span>{loading ? 'PROCESSING & SAVING BOOKING...' : 'CREATE & SAVE BOOKING (POST)'}</span>
          </button>
        </div>

      </form>

      {responseResult && (
        <div className="max-w-4xl mx-auto mt-6 bg-white border border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex items-center gap-2 font-bold text-xs text-black border-b border-black pb-3">
            <CheckCircle2 className="h-4 w-4" style={{ color: customHex }} />
            <span>{responseResult.message || 'Booking confirmed and scheduled successfully'}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 bg-[#F4F4F0] p-4 border border-black">
            <div><span className="text-[10px] text-zinc-500 block font-bold">Booking Ref</span> <span className="font-bold text-black">{responseResult.booking_ref}</span></div>
            <div><span className="text-[10px] text-zinc-500 block font-bold">Total Pax Confirmed</span> <span className="font-bold" style={{ color: customHex }}>{responseResult.total_pax} Travelers</span></div>
          </div>
        </div>
      )}

    </div>
  );
}