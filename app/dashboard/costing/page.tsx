'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Printer, Send, Save, ArrowLeft, Sliders, Calculator, CheckCircle2, FileText, LayoutDashboard, Settings } from 'lucide-react';
import Link from 'next/link';

export default function CostingSheetPage() {
  // RGB Color Customizer State
  const [rgbColor, setRgbColor] = useState({ r: 0, g: 0, b: 0 }); // Pure paper-black default
  const customHex = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;
  const customBgLight = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.05)`;

  // Form State aligned with the Python calculation logic
  const [projectName, setProjectName] = useState('7-Day Kenya Wildlife & Savanna Expedition');
  const [clientId, setClientId] = useState('client-uuid-001');
  const [days, setDays] = useState(7);
  const [totalPeople, setTotalPeople] = useState(4);
  
  const [accommodation, setAccommodation] = useState(15000); 
  const [parkFees, setParkFees] = useState(12000); 
  const [vehicleDriver, setVehicleDriver] = useState(8000); 
  const [others, setOthers] = useState(5000); 
  const [profitMarkup, setProfitMarkup] = useState(1.2); 

  const [loading, setLoading] = useState(false);
  const [responseResult, setResponseResult] = useState<any>(null);

  // Live Front-End Calculations to mirror backend logic
  const safeDays = days > 0 ? days : 1;
  const safePeople = totalPeople > 0 ? totalPeople : 1;

  const totalAccommodation = safeDays * safePeople * accommodation;
  const extraCosts = others * safePeople;
  const totalVehicleCost = safeDays * vehicleDriver;

  const pricePerPerson = (
    totalAccommodation +
    parkFees +
    extraCosts +
    (totalVehicleCost / safePeople)
  );

  const finalTotalPerPerson = pricePerPerson * profitMarkup;
  const totalCostPrice = pricePerPerson * safePeople;
  const suggestedSellingPrice = finalTotalPerPerson * safePeople;
  const targetProfit = suggestedSellingPrice - totalCostPrice;
  const markupPercentage = (profitMarkup - 1) * 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      project_name: projectName,
      client_id: clientId,
      days: safeDays,
      total_people: safePeople,
      accommodation,
      park_fees: parkFees,
      vehicle_driver: vehicleDriver,
      others,
      profit_markup: profitMarkup
    };

    try {
      const res = await fetch('http://localhost:5000/costing-sheet/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setResponseResult(data);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      setResponseResult({
        message: 'Cost sheet created successfully (Simulated)',
        cost_sheet_id: 'CS-99482',
        project_name: projectName,
        total_cost_price: totalCostPrice,
        suggested_selling_price: suggestedSellingPrice,
        target_profit: targetProfit,
        markup_percentage: markupPercentage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-black p-4 sm:p-8 font-mono uppercase text-xs selection:bg-black selection:text-white">
      
      {/* Top Header & Paper Editorial RGB Customizer Bar */}
      <div className="max-w-4xl mx-auto mb-6 bg-white border border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold hover:opacity-60 transition-opacity">
          <ArrowLeft className="h-4 w-4" />
          <span> Back to Dashboard</span>
          <span className="text-[10px] text-zinc-500">ANFORA || COSTING SHEET</span>
        </Link>


       
        
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        
        {/* Project Metadata & Parameters Card */}
        <div className="bg-white border border-black p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <h2 className="font-bold border-b border-black pb-3 flex items-center gap-2 text-zinc-800 text-sm">
            <Calculator className="h-4 w-4" style={{ color: customHex }} />
            <span>[Costing & Logistics ]</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Project / Package Name</label>
              <input 
                type="text" 
                value={projectName} 
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Duration (Days)</label>
              <input 
                type="number" 
                min="1"
                value={days} 
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Total People (Pax)</label>
              <input 
                type="number" 
                min="1"
                value={totalPeople} 
                onChange={(e) => setTotalPeople(Number(e.target.value))}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Accommodation Cost (Per Person / Night)</label>
              <input 
                type="number" 
                value={accommodation} 
                onChange={(e) => setAccommodation(Number(e.target.value))}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Park / Conservation Fees (Flat per Person)</label>
              <input 
                type="number" 
                value={parkFees} 
                onChange={(e) => setParkFees(Number(e.target.value))}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Vehicle & Driver Hire (Per Day)</label>
              <input 
                type="number" 
                value={vehicleDriver} 
                onChange={(e) => setVehicleDriver(Number(e.target.value))}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Other / [Food , Drinks ,Activities...etc] (Per Person)</label>
              <input 
                type="number" 
                value={others} 
                onChange={(e) => setOthers(Number(e.target.value))}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Profit Markup Multiplier (e.g., 1.2 = 20% Markup)</label>
              <input 
                type="number" 
                step="0.05"
                min="1.0"
                value={profitMarkup} 
                onChange={(e) => setProfitMarkup(Number(e.target.value))}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>
          </div>
        </div>

        {/* Live Calculation Preview Summary Card */}
        <div className="bg-white border border-black p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <h3 className="font-bold text-zinc-500 border-b border-black pb-3">[Real-Time Calculations]</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#F4F4F0] p-4 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-[10px] text-zinc-500 block mb-1 font-bold">Total Cost Price</span>
              <span className="font-bold text-sm text-black">Ksh {totalCostPrice.toLocaleString()}</span>
            </div>
            <div className="bg-[#F4F4F0] p-4 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-[10px] text-zinc-500 block mb-1 font-bold">Expected Selling Price</span>
              <span className="font-bold text-sm" style={{ color: customHex }}>Ksh {suggestedSellingPrice.toLocaleString()}</span>
            </div>
            <div className="bg-[#F4F4F0] p-4 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-[10px] text-zinc-500 block mb-1 font-bold">Target Profit</span>
              <span className="font-bold text-sm text-black">Ksh {targetProfit.toLocaleString()}</span>
            </div>
            <div className="bg-[#F4F4F0] p-4 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-[10px] text-zinc-500 block mb-1 font-bold">Markup %</span>
              <span className="font-bold text-sm text-black">{markupPercentage.toFixed(1)}%</span>
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
            <Save className="h-4 w-4" />
            <span>{loading ? 'SAVING COST SHEET TO DATABASE...' : 'CREATE & SAVE COST SHEET (POST)'}</span>
          </button>
        </div>

      </form>


      {responseResult && (
        <div className="max-w-4xl mx-auto mt-6 bg-white border border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex items-center gap-2 font-bold text-xs text-black border-b border-black pb-3">
            <CheckCircle2 className="h-4 w-4" style={{ color: customHex }} />
            <span>{responseResult.message}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#F4F4F0] p-4 border border-black">
            <div><span className="text-[10px] text-zinc-500 block font-bold">Cost Sheet ID</span> <span className="font-bold text-black">{responseResult.cost_sheet_id}</span></div>
            <div><span className="text-[10px] text-zinc-500 block font-bold">Total Cost</span> <span className="font-bold text-black">Ksh {responseResult.total_cost_price?.toLocaleString()}</span></div>
            <div><span className="text-[10px] text-zinc-500 block font-bold">Suggested Selling</span> <span className="font-bold" style={{ color: customHex }}>Ksh {responseResult.suggested_selling_price?.toLocaleString()}</span></div>
            <div><span className="text-[10px] text-zinc-500 block font-bold">Target Profit</span> <span className="font-bold text-black">Ksh {responseResult.target_profit?.toLocaleString()}</span></div>
          </div>
        </div>
      )}

    </div>
  );
}