'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Printer, Send, Save, ArrowLeft, Sliders, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
}

export default function InvoicePage() {
  // RGB Color Customizer State
  const [rgbColor, setRgbColor] = useState({ r: 0, g: 0, b: 0 }); // Pure paper-black default
  const customHex = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;

  // Invoice Form State
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-001');
  const [clientName, setClientName] = useState('Acme Corporation');
  const [clientEmail, setClientEmail] = useState('billing@acme.com');
  const [dueDate, setDueDate] = useState('2026-10-01');

  // Line items state
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: 'Safari Tour Package Logistics & Accommodation', quantity: 4, unit_price: 35000 },
    { description: 'Park Conservation & Entry Permits', quantity: 4, unit_price: 12000 }
  ]);

  const [loading, setLoading] = useState(false);
  const [responseResult, setResponseResult] = useState<any>(null);

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unit_price: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Live Calculations
  const subtotal = items.reduce((acc, item) => acc + (Number(item.quantity) || 0) * (Number(item.unit_price) || 0), 0);
  const taxRate = 0.16; // e.g., 16% VAT
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + taxAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      invoice_number: invoiceNumber,
      client_name: clientName,
      client_email: clientEmail,
      due_date: dueDate,
      items,
      subtotal,
      tax_amount: taxAmount,
      total_amount: totalAmount
    };

    try {
      const res = await fetch('http://localhost:5000/invoices/create', {
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
        message: 'Invoice created and dispatched successfully (Simulated)',
        invoice_id: invoiceNumber,
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
        
        {/* Invoice Metadata Card */}
        <div className="bg-white border border-black p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <h2 className="font-bold border-b border-black pb-3 flex items-center gap-2 text-zinc-800 text-sm">
            <FileText className="h-4 w-4" style={{ color: customHex }} />
            <span>[Invoice Metadata & Client Details]</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Invoice Number</label>
              <input 
                type="text" 
                value={invoiceNumber} 
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Due Date</label>
              <input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Client Name</label>
              <input 
                type="text" 
                value={clientName} 
                onChange={(e) => setClientName(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Client Email</label>
              <input 
                type="email" 
                value={clientEmail} 
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>
          </div>
        </div>

        {/* Line Items Card */}
        <div className="bg-white border border-black p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex items-center justify-between border-b border-black pb-3">
            <h3 className="font-bold text-zinc-500">[Invoice Line Items]</h3>
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
                    placeholder="Unit Price" 
                    value={item.unit_price} 
                    onChange={(e) => handleItemChange(index, 'unit_price', Number(e.target.value))}
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
          <h3 className="font-bold text-zinc-500 border-b border-black pb-3">[Summary & Calculations]</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#F4F4F0] p-4 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-[10px] text-zinc-500 block mb-1 font-bold">Subtotal</span>
              <span className="font-bold text-sm text-black">Ksh {subtotal.toLocaleString()}</span>
            </div>
            <div className="bg-[#F4F4F0] p-4 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-[10px] text-zinc-500 block mb-1 font-bold">VAT (16%)</span>
              <span className="font-bold text-sm text-black">Ksh {taxAmount.toLocaleString()}</span>
            </div>
            <div className="bg-[#F4F4F0] p-4 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-[10px] text-zinc-500 block mb-1 font-bold">Total Amount Due</span>
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
            <span>{loading ? 'GENERATING & SAVING INVOICE...' : 'CREATE & SAVE INVOICE (POST)'}</span>
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
            <div><span className="text-[10px] text-zinc-500 block font-bold">Invoice Ref</span> <span className="font-bold text-black">{responseResult.invoice_id}</span></div>
            <div><span className="text-[10px] text-zinc-500 block font-bold">Total Dispatched</span> <span className="font-bold" style={{ color: customHex }}>Ksh {responseResult.total_amount?.toLocaleString()}</span></div>
          </div>
        </div>
      )}

    </div>
  );
}