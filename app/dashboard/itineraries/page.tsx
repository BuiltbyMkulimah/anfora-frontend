'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Printer, Send, Save, ArrowLeft, MapPin, Clock, Sliders, Calendar, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface ActivityItem {
  id: string;
  time: string;
  title: string;
  description: string;
}

interface ItineraryDay {
  id: string;
  dayNumber: number;
  title: string;
  destination: string;
  activities: ActivityItem[];
}

interface ItineraryRecord {
  itinerary_ref?: string;
  client_name: string;
  tour_title: string;
  start_date: string;
  end_date: string;
  agency_name: string;
  days: ItineraryDay[];
}

export default function NewItineraryPage() {
  // RGB Theme State
  const [rgbColor, setRgbColor] = useState({ r: 0, g: 0, b: 0 });
  const customHex = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;

  // Itinerary Metadata State
  const [clientName, setClientName] = useState('The Henderson Family');
  const [tourTitle, setTourTitle] = useState('7-Day Kenya Wildlife & Savanna Expedition');
  const [startDate, setStartDate] = useState('2026-10-10');
  const [endDate, setEndDate] = useState('2026-10-17');
  const [agencyName, setAgencyName] = useState('Maitai Safaris');
  const [itineraryRef, setItineraryRef] = useState('ITIN-2026-0042');
  
  // Days & Activities State
  const [days, setDays] = useState<ItineraryDay[]>([
    {
      id: 'day-1',
      dayNumber: 1,
      title: 'Arrival in Nairobi & Transfer to Amboseli',
      destination: 'Amboseli National Park',
      activities: [
        { id: 'act-1', time: '08:00 AM', title: 'Airport Pickup', description: 'Meet & greet with your professional guide at Jomo Kenyatta International Airport.' },
        { id: 'act-2', time: '10:30 AM', title: 'Drive to Amboseli', description: 'Scenic drive south past African savannah plains with views of Mount Kilimanjaro.' },
        { id: 'act-3', time: '03:30 PM', title: 'Evening Game Drive', description: 'First introductory game drive looking out for elephants and large herds.' }
      ]
    },
    {
      id: 'day-2',
      dayNumber: 2,
      title: 'Full Day Amboseli Exploration',
      destination: 'Amboseli National Park',
      activities: [
        { id: 'act-4', time: '06:30 AM', title: 'Early Morning Game Drive', description: 'Catch the crisp morning light over Kilimanjaro and active predators.' },
        { id: 'act-5', time: '02:00 PM', title: 'Marsh Observation', description: 'Visit Observation Hill for a panoramic vantage point over the swamps.' }
      ]
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchLatestItinerary = async () => {
      setFetchingData(true);
      try {
        const res = await fetch('http://localhost:5000/itineraries/latest');
        if (!res.ok) throw new Error('Failed to fetch backend itinerary data');
        const data: ItineraryRecord = await res.json();
        
        if (data.client_name) setClientName(data.client_name);
        if (data.tour_title) setTourTitle(data.tour_title);
        if (data.start_date) setStartDate(data.start_date);
        if (data.end_date) setEndDate(data.end_date);
        if (data.agency_name) setAgencyName(data.agency_name);
        if (data.itinerary_ref) setItineraryRef(data.itinerary_ref);
        if (data.days && data.days.length > 0) {
          setDays(data.days);
        }
      } catch (err) {
        console.error('Error connecting to backend API, keeping default states:', err);
      } finally {
        setFetchingData(false);
      }
    };

    fetchLatestItinerary();
  }, []);

  // Handlers for Days & Activities
  const addDay = () => {
    const nextDayNum = days.length + 1;
    setDays([
      ...days,
      {
        id: `day-${Date.now()}`,
        dayNumber: nextDayNum,
        title: `Day ${nextDayNum} Itinerary Title`,
        destination: 'Destination Name',
        activities: [
          { id: `act-${Date.now()}`, time: '09:00 AM', title: 'Morning Activity', description: 'Activity description details here.' }
        ]
      }
    ]);
  };

  const removeDay = (dayId: string) => {
    const filtered = days.filter(d => d.id !== dayId);
    setDays(filtered.map((d, index) => ({ ...d, dayNumber: index + 1 })));
  };

  const updateDay = (dayId: string, field: keyof ItineraryDay, value: any) => {
    setDays(days.map(d => d.id === dayId ? { ...d, [field]: value } : d));
  };

  const addActivity = (dayId: string) => {
    setDays(days.map(d => {
      if (d.id === dayId) {
        return {
          ...d,
          activities: [
            ...d.activities,
            { id: `act-${Date.now()}`, time: '12:00 PM', title: 'New Activity', description: 'Description' }
          ]
        };
      }
      return d;
    }));
  };

  const removeActivity = (dayId: string, actId: string) => {
    setDays(days.map(d => {
      if (d.id === dayId) {
        return {
          ...d,
          activities: d.activities.filter(a => a.id !== actId)
        };
      }
      return d;
    }));
  };

  const updateActivity = (dayId: string, actId: string, field: keyof ActivityItem, value: any) => {
    setDays(days.map(d => {
      if (d.id === dayId) {
        return {
          ...d,
          activities: d.activities.map(a => a.id === actId ? { ...a, [field]: value } : a)
        };
      }
      return d;
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      itinerary_reference: itineraryRef,
      client_name: clientName,
      tour_title: tourTitle,
      start_date: startDate,
      end_date: endDate,
      agency_name: agencyName,
      total_days: days.length,
      days
    };

    try {
      const res = await fetch('http://localhost:5000/itineraries/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        console.warn('Backend returned error status, proceeding with UI view toggle.');
      }
    } catch (err) {
      console.error('Network error during itinerary submission, simulating view:', err);
    } finally {
      setLoading(false);
      setIsSaved(true);
    }
  };

  // If saved/generated, render clean printable proposal layout matching styling
  if (isSaved) {
    return (
      <div className="min-h-screen bg-[#F4F4F0] text-black p-4 sm:p-12 font-mono uppercase text-xs print:bg-white print:p-0 selection:bg-black selection:text-white">
        
        {/* Top Control Bar */}
        <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between border border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] print:hidden">
          <button 
            onClick={() => setIsSaved(false)}
            className="flex items-center gap-1.5 font-bold hover:opacity-60 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>EDIT ITINERARY</span>
          </button>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.print()}
              className="border border-black px-3 py-1.5 bg-white hover:bg-black hover:text-white transition-colors flex items-center gap-1.5 text-[10px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>PRINT ITINERARY</span>
            </button>
            <button 
              onClick={() => alert(`Itinerary shared successfully to ${clientName}!`)}
              className="border border-black px-3 py-1.5 text-white hover:opacity-90 transition-opacity flex items-center gap-1.5 text-[10px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              style={{ backgroundColor: customHex }}
            >
              <Send className="h-3.5 w-3.5" />
              <span>SHARE TO CLIENT</span>
            </button>
          </div>
        </div>

        {/* The Formal Itinerary Document Card */}
        <div className="max-w-4xl mx-auto border border-black bg-white p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8 print:shadow-none print:border-none">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-black pb-6 gap-4">
            <div>
              <h1 className="text-xl font-bold tracking-widest">{agencyName}</h1>
              <p className="text-[10px] text-zinc-500 lowercase mt-0.5">Anfora CRM || Tour Itinerary</p>
            </div>
            <div className="text-right">
              <span className="border border-black px-3 py-1 text-white font-bold text-xs tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" style={{ backgroundColor: customHex }}>
                {itineraryRef}
              </span>
              <p className="text-[10px] text-zinc-500 mt-2">Duration: {days.length} Days</p>
              <p className="text-[10px] text-zinc-500">{startDate} to {endDate}</p>
            </div>
          </div>

          {/* Client & Tour Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-black pb-6">
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 block font-bold">[Traveler / Client]</span>
              <p className="text-sm font-bold">{clientName}</p>
              <p className="text-zinc-600 lowercase">Confirmed Booking Reference</p>
            </div>
            <div className="space-y-1 sm:text-right">
              <span className="text-[10px] text-zinc-500 block font-bold">[Tour Package]</span>
              <p className="text-sm font-bold">{tourTitle}</p>
              <p className="text-zinc-600 lowercase">{agencyName} Operations</p>
            </div>
          </div>

          {/* Day-by-Day Schedule List */}
          <div className="space-y-6">
            <h3 className="font-bold text-zinc-800">[Day-By-Day Schedule Breakdown]</h3>
            
            <div className="space-y-6">
              {days.map((day) => (
                <div key={day.id} className="border border-black p-6 bg-[#F4F4F0] space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-black pb-3 gap-2">
                    <div>
                      <span className="text-white px-2 py-0.5 font-bold text-[10px]" style={{ backgroundColor: customHex }}>DAY {day.dayNumber}</span>
                      <h4 className="font-bold text-sm mt-1">{day.title}</h4>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-zinc-600 font-bold">
                      <MapPin className="h-3 w-3" style={{ color: customHex }} />
                      <span>{day.destination}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pl-2 sm:pl-4 border-l-2" style={{ borderColor: customHex }}>
                    {day.activities.map((act) => (
                      <div key={act.id} className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold">
                          <Clock className="h-3 w-3" />
                          <span>{act.time}</span>
                          <span className="text-black font-bold">— {act.title}</span>
                        </div>
                        <p className="text-xs text-zinc-700 normal-case pl-5">{act.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Footer */}
          <div className="border-t border-black pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-500 gap-4">
            <p>ANFORA® TOUR OPERATOR CRM // ITINERARY MODULE</p>
            <p>WILDLIFE & EXPEDITION DIVISION</p>
          </div>

        </div>
      </div>
    );
  }

  // Otherwise, render Editor Form
  return (
    <div className="min-h-screen bg-[#F4F4F0] text-black p-4 sm:p-8 font-mono uppercase text-xs selection:bg-black selection:text-white">
      
      {/* Top Navigation & RGB Customizer Bar */}
      <div className="max-w-5xl mx-auto mb-6 bg-white border border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/dashboard" className="flex items-center gap-1.5 font-bold hover:opacity-60 transition-opacity">
          <ArrowLeft className="h-4 w-4" />
          <span>BACK TO DASHBOARD</span>
        </Link>

        {/* RGB Color Customizer Box */}
        <div className="flex items-center gap-4 bg-[#F4F4F0] border border-black px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-1.5 font-bold">
            <Sliders className="h-4 w-4" style={{ color: customHex }} />
            <span>Theme RGB:</span>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1 text-red-700 font-bold">
              R: <input type="number" min="0" max="255" value={rgbColor.r} onChange={(e) => setRgbColor({ ...rgbColor, r: Number(e.target.value) })} className="w-10 border border-black p-1 bg-white text-center font-bold text-black" />
            </label>
            <label className="flex items-center gap-1 text-emerald-800 font-bold">
              G: <input type="number" min="0" max="255" value={rgbColor.g} onChange={(e) => setRgbColor({ ...rgbColor, g: Number(e.target.value) })} className="w-10 border border-black p-1 bg-white text-center font-bold text-black" />
            </label>
            <label className="flex items-center gap-1 text-blue-800 font-bold">
              B: <input type="number" min="0" max="255" value={rgbColor.b} onChange={(e) => setRgbColor({ ...rgbColor, b: Number(e.target.value) })} className="w-10 border border-black p-1 bg-white text-center font-bold text-black" />
            </label>
            <div className="w-4 h-4 border border-black ml-1 shadow-sm" style={{ backgroundColor: customHex }} />
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="max-w-5xl mx-auto space-y-6 relative">
        
        {fetchingData && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex items-center justify-center z-10 gap-2 font-bold">
            <Loader2 className="h-5 w-5 animate-spin" style={{ color: customHex }} />
            <span>Syncing Itinerary with Backend API...</span>
          </div>
        )}

        {/* Metadata Card */}
        <div className="border border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <h2 className="font-bold border-b border-black pb-2 text-zinc-800 flex items-center gap-2">
            <Calendar className="h-4 w-4" style={{ color: customHex }} />
            <span>[Itinerary Overview & Details]</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] text-zinc-500 mb-1">Itinerary Reference</label>
              <input 
                type="text" 
                value={itineraryRef} 
                onChange={(e) => setItineraryRef(e.target.value)}
                className="w-full border border-black p-2 text-xs bg-[#F4F4F0] focus:outline-none font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1">Agency Name</label>
              <input 
                type="text" 
                value={agencyName} 
                onChange={(e) => setAgencyName(e.target.value)}
                className="w-full border border-black p-2 text-xs bg-[#F4F4F0] focus:outline-none font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1">Client Name</label>
              <input 
                type="text" 
                value={clientName} 
                onChange={(e) => setClientName(e.target.value)}
                className="w-full border border-black p-2 text-xs bg-[#F4F4F0] focus:outline-none font-bold"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-[10px] text-zinc-500 mb-1">Package Name</label>
              <input 
                type="text" 
                value={tourTitle} 
                onChange={(e) => setTourTitle(e.target.value)}
                className="w-full border border-black p-2 text-xs bg-[#F4F4F0] focus:outline-none font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1">Start Date</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-black p-2 text-xs bg-[#F4F4F0] focus:outline-none font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1">End Date</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-black p-2 text-xs bg-[#F4F4F0] focus:outline-none font-bold"
                required
              />
            </div>
          </div>
        </div>

        {/* Days & Activities Builder */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-bold text-zinc-800">[ Day-by-Day Schedule ]</h2>
            <button 
              type="button"
              onClick={addDay}
              className="border border-black px-3 py-1.5 text-white transition-colors text-[10px] flex items-center gap-1 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:opacity-90"
              style={{ backgroundColor: customHex }}
            >
              <Plus className="h-3.5 w-3.5" /> ADD NEW DAY
            </button>
          </div>

          <div className="space-y-6">
            {days.map((day) => (
              <div key={day.id} className="border border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
                
                {/* Day Header Inputs */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-black pb-4 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="border border-black text-white px-2 py-1 font-bold text-xs" style={{ backgroundColor: customHex }}>
                      DAY {day.dayNumber}
                    </span>
                    <input 
                      type="text"
                      value={day.title}
                      onChange={(e) => updateDay(day.id, 'title', e.target.value)}
                      className="border border-black p-1.5 bg-[#F4F4F0] text-xs font-bold w-64 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="flex items-center gap-1 flex-1 sm:flex-none">
                      <MapPin className="h-3.5 w-3.5" style={{ color: customHex }} />
                      <input 
                        type="text"
                        value={day.destination}
                        onChange={(e) => updateDay(day.id, 'destination', e.target.value)}
                        className="border border-black p-1.5 bg-[#F4F4F0] text-xs focus:outline-none font-bold"
                        placeholder="Destination"
                        required
                      />
                    </div>
                    {days.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeDay(day.id)}
                        className="border border-black p-1.5 hover:bg-red-100 hover:text-red-600 transition-colors"
                        title="Remove Day"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Activities Sub-list */}
                <div className="space-y-3 pl-0 sm:pl-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-500 font-bold">[Day Activities & Timelines]</span>
                    <button 
                      type="button"
                      onClick={() => addActivity(day.id)}
                      className="border border-black px-2 py-0.5 bg-[#F4F4F0] hover:bg-black hover:text-white transition-colors text-[9px] font-bold flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" /> ADD ACTIVITY
                    </button>
                  </div>

                  <div className="space-y-3">
                    {day.activities.map((act) => (
                      <div key={act.id} className="border border-black p-3 bg-[#F4F4F0] space-y-2">
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                          <div className="sm:col-span-3">
                            <label className="block text-[9px] text-zinc-500 mb-0.5 font-bold">Time</label>
                            <input 
                              type="text"
                              value={act.time}
                              onChange={(e) => updateActivity(day.id, act.id, 'time', e.target.value)}
                              className="w-full border border-black p-1 bg-white text-xs focus:outline-none font-bold"
                              required
                            />
                          </div>

                          <div className="sm:col-span-8">
                            <label className="block text-[9px] text-zinc-500 mb-0.5 font-bold">Activity Title</label>
                            <input 
                              type="text"
                              value={act.title}
                              onChange={(e) => updateActivity(day.id, act.id, 'title', e.target.value)}
                              className="w-full border border-black p-1 bg-white text-xs focus:outline-none font-bold"
                              required
                            />
                          </div>

                          <div className="sm:col-span-1 flex justify-end pt-4">
                            {day.activities.length > 1 && (
                              <button 
                                type="button"
                                onClick={() => removeActivity(day.id, act.id)}
                                className="text-zinc-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] text-zinc-500 mb-0.5 font-bold">Description</label>
                          <textarea 
                            rows={2}
                            value={act.description}
                            onChange={(e) => updateActivity(day.id, act.id, 'description', e.target.value)}
                            className="w-full border border-black p-1.5 bg-white text-xs focus:outline-none normal-case font-medium"
                            required
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="border border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex gap-4">
          <button 
            type="submit"
            disabled={loading}
            className="flex-1 border border-black p-4 text-white hover:opacity-90 transition-all font-bold text-xs tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ backgroundColor: customHex }}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>{loading ? 'GENERATING ITINERARY...' : 'SAVE & GENERATE ITINERARY (POST)'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}