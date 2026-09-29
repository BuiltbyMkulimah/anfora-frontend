'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Save, ArrowLeft, Sliders, Receipt, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface VoucherItem {
  description: string;
  quantity: number;
  unit_cost: number;
}

export default function SupplierVoucherPage() {
  // RGB Color Customizer State
  const [rgbColor, setRgbColor] = useState({ r: 0, g: 0, b: 0 }); // Pure paper-black default
  const customHex = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;

  // Supplier Voucher Form State
  const [voucherNumber, setVoucherNumber] = useState('SV-2026-001');
  const [supplierName, setSupplierName] = useState('Mara Serena Safari Lodge');
  const [supplierCategory, setSupplierCategory] = useState('Accommodation & Catering');
  const [paymentTerms, setPaymentTerms] = useState('Net 30');
  const [dueDate, setDueDate] = useState('2026-10-15');

  // Line items state
  const [items, setItems] = useState<VoucherItem[]>([
    { description: 'Full-Board Accommodation (4 Pax x 3 Nights)', quantity: 12, unit_cost: 15000 },
    { description: 'Guide & Driver Meal Allowances', quantity: 3, unit_cost: 2500 }
  ]);

  const [loading, setLoading] = useState(false);
  const [responseResult, setResponseResult] = useState<any>(null);

  const handleItemChange = (index: number, field: keyof VoucherItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unit_cost: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Live Calculations
  const totalAmount = items.reduce((acc, item) => acc + (Number(item.quantity) || 0) * (Number(item.unit_cost) || 0), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      voucher_number: voucherNumber,
      supplier_name: supplierName,
      supplier_category: supplierCategory,
      payment_terms: paymentTerms,
      due_date: dueDate,
      items,
      total_amount: totalAmount
    };

    try {
      const res = await fetch('http://localhost:5000/supplier-vouchers/create', {
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
      // Fallback simulation
      setResponseResult({
        message: 'Supplier voucher created successfully (Simulated)',
        voucher_id: voucherNumber,
        total_amount: totalAmount
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
          <span>Dashboard</span>
        </Link>

        {/* RGB Color Customizer Box matching paper aesthetics */}
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

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        
        {/* Voucher Metadata Card */}
        <div className="bg-white border border-black p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <h2 className="font-bold border-b border-black pb-3 flex items-center gap-2 text-zinc-800 text-sm">
            <Receipt className="h-4 w-4" style={{ color: customHex }} />
            <span>[Supplier Voucher & Vendor Details]</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Voucher Number</label>
              <input 
                type="text" 
                value={voucherNumber} 
                onChange={(e) => setVoucherNumber(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Payment Due Date</label>
              <input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Supplier / Vendor Name</label>
              <input 
                type="text" 
                value={supplierName} 
                onChange={(e) => setSupplierName(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Service Category</label>
              <input 
                type="text" 
                value={supplierCategory} 
                onChange={(e) => setSupplierCategory(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Payment Terms</label>
              <input 
                type="text" 
                value={paymentTerms} 
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>
          </div>
        </div>

        {/* Line Items Card */}
        <div className="bg-white border border-black p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex items-center justify-between border-b border-black pb-3">
            <h3 className="font-bold text-zinc-500">[Voucher Cost Items & Deliverables]</h3>
            <button 
              type="button" 
              onClick={addItem}
              className="border border-black px-3 py-1.5 bg-[#F4F4F0] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              <span>Add Item</span>
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-[#F4F4F0] p-3 border border-black">
                <div className="sm:col-span-6">
                  <input 
                    type="text" 
                    placeholder="Description" 
                    value={item.description} 
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    className="w-full border border-black p-2 bg-white font-bold text-xs"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <input 
                    type="number" 
                    min="1" 
                    placeholder="Qty" 
                    value={item.quantity} 
                    onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                    className="w-full border border-black p-2 bg-white font-bold text-xs text-center"
                    required
                  />
                </div>
                <div className="sm:col-span-3">
                  <input 
                    type="number" 
                    placeholder="Unit Cost" 
                    value={item.unit_cost} 
                    onChange={(e) => handleItemChange(index, 'unit_cost', Number(e.target.value))}
                    className="w-full border border-black p-2 bg-white font-bold text-xs"
                    required
                  />
                </div>
                <div className="sm:col-span-1 flex justify-center">
                  <button 
                    type="button" 
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                    className="p-2 border border-black bg-white hover:bg-red-50 text-red-600 disabled:opacity-30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals Preview Card */}
        <div className="bg-white border border-black p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <h3 className="font-bold text-zinc-500 border-b border-black pb-3">[Total Payable Summary]</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-[#F4F4F0] p-4 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
              <span className="text-[10px] text-zinc-500 font-bold">Total Supplier Expense Payable</span>
              <span className="font-bold text-sm" style={{ color: customHex }}>Ksh {totalAmount.toLocaleString()}</span>
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
            <span>{loading ? 'GENERATING & SAVING VOUCHER...' : 'CREATE & SAVE SUPPLIER VOUCHER (POST)'}</span>
          </button>
        </div>

      </form>

      {/* API Response Success Modal / Card */}
      {responseResult && (
        <div className="max-w-4xl mx-auto mt-6 bg-white border border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex items-center gap-2 font-bold text-xs text-black border-b border-black pb-3">
            <CheckCircle2 className="h-4 w-4" style={{ color: customHex }} />
            <span>{responseResult.message}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 bg-[#F4F4F0] p-4 border border-black">
            <div><span className="text-[10px] text-zinc-500 block font-bold">Voucher Ref</span> <span className="font-bold text-black">{responseResult.voucher_id}</span></div>
            <div><span className="text-[10px] text-zinc-500 block font-bold">Total Payable</span> <span className="font-bold" style={{ color: customHex }}>Ksh {responseResult.total_amount?.toLocaleString()}</span></div>
          </div>
        </div>
      )}

    </div>
  );
}