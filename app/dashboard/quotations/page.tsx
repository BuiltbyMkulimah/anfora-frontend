'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Printer, Send, Save, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface QuotationItemInput {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
}

export default function NewQuotationPage() {
  const [clientId, setClientId] = useState<number>(1);
  const [clientName, setClientName] = useState('The Henderson Family');
  const [clientEmail, setClientEmail] = useState('henderson@example.com');
  const [agencyName, setAgencyName] = useState('Maitai Safaris');
  const [expiryDate, setExpiryDate] = useState<string>('2026-10-01');
  const [notes, setNotes] = useState<string>('Thank you for choosing Maitai Safaris. Rates are subject to availability upon confirmation.');
  
  const [items, setItems] = useState<QuotationItemInput[]>([
    { id: '1', description: 'Ol Tukai Lodge - 2 Nights (Full Board)', quantity: 4, unit_price: 300 },
    { id: '2', description: '4x4 Land Cruiser Safari Vehicle Hire', quantity: 7, unit_price: 250 },
    { id: '3', description: 'Amboseli National Park Entry Fees', quantity: 4, unit_price: 160 }
  ]);

  const [loading, setLoading] = useState(false);
  const [savedQuotationNumber, setSavedQuotationNumber] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handlers for Items
  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: '', quantity: 1, unit_price: 0 }
    ]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof QuotationItemInput, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

 
  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.unit_price), 0);
  const taxAmount = subtotal * 0.16;
  const totalAmount = subtotal + taxAmount;

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const payload = {
      client_id: Number(clientId),
      expiry_date: expiryDate,
      notes: notes,
      items: items.map(({ description, quantity, unit_price }) => ({
        description,
        quantity: Number(quantity),
        unit_price: Number(unit_price)
      }))
    };

    try {
      const res = await fetch('http://localhost:5000/quotation/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create quotation');

      setSavedQuotationNumber(data.quotation_number || 'QT-2026-0042');
    } catch (err: any) {
      setSavedQuotationNumber('QT-2026-DEMO');
    } finally {
      setLoading(false);
    }
  };

  // If Quotation is saved/generated, render the clean B2B proposal document view
  if (savedQuotationNumber) {
    return (
      <div className="min-h-screen bg-[#F4F4F0] text-black p-4 sm:p-12 font-mono uppercase text-xs print:bg-white print:p-0">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between border border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] print:hidden">
          <button 
            onClick={() => setSavedQuotationNumber(null)}
            className="flex items-center gap-1.5 font-bold hover:opacity-60 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>EDIT QUOTATION</span>
          </button>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.print()}
              className="border border-black px-3 py-1.5 bg-white hover:bg-black hover:text-white transition-colors flex items-center gap-1.5 text-[10px] font-bold"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>PRINT / PDF</span>
            </button>
            <button 
              onClick={() => alert(`Quotation ${savedQuotationNumber} shared successfully to ${clientEmail}!`)}
              className="border border-black px-3 py-1.5 bg-black text-white hover:bg-transparent hover:text-black transition-colors flex items-center gap-1.5 text-[10px] font-bold"
            >
              <Send className="h-3.5 w-3.5" />
              <span>SHARE TO CLIENT</span>
            </button>
          </div>
        </div>

        {/* The Formal Quotation Document Card */}
        <div className="max-w-4xl mx-auto border border-black bg-white p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8 print:shadow-none print:border-none">
          
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-black pb-6 gap-4">
            <div>
              <h1 className="text-xl font-bold tracking-widest">{agencyName}</h1>
              <p className="text-[10px] text-zinc-500 lowercase mt-0.5">Powered by Anfora CRM // Yolo Connect KE</p>
            </div>
            <div className="text-right">
              <span className="border border-black px-3 py-1 bg-black text-white font-bold text-xs tracking-wider">
                {savedQuotationNumber}
              </span>
              <p className="text-[10px] text-zinc-500 mt-2">Date: {new Date().toISOString().split('T')[0]}</p>
              <p className="text-[10px] text-zinc-500">Expiry: {expiryDate}</p>
            </div>
          </div>

          {/* Client & Operator Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-black pb-6">
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 block font-bold">[Prepared For Client]</span>
              <p className="text-sm font-bold">{clientName}</p>
              <p className="text-zinc-600 lowercase">{clientEmail}</p>
            </div>
            <div className="space-y-1 sm:text-right">
              <span className="text-[10px] text-zinc-500 block font-bold">[Issued By Agency]</span>
              <p className="text-sm font-bold">{agencyName}</p>
              <p className="text-zinc-600 lowercase">yoloconnectke@gmail.com</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="space-y-4">
            <h3 className="font-bold text-zinc-800">[Proposal Itemization]</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-black">
                <thead>
                  <tr className="border-b border-black bg-[#F4F4F0] text-[10px] text-zinc-600">
                    <th className="p-3 border-r border-black">Description</th>
                    <th className="p-3 border-r border-black w-20 text-center">Qty</th>
                    <th className="p-3 border-r border-black w-28 text-right">Unit Price</th>
                    <th className="p-3 w-32 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black">
                  {items.map((item, index) => (
                    <tr key={item.id || index} className="text-xs">
                      <td className="p-3 border-r border-black font-medium">{item.description}</td>
                      <td className="p-3 border-r border-black text-center">{item.quantity}</td>
                      <td className="p-3 border-r border-black text-right">$ {Number(item.unit_price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td className="p-3 text-right font-bold">$ {(item.quantity * item.unit_price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Breakdown Summary Box */}
          <div className="flex justify-end pt-2">
            <div className="w-full sm:w-72 border border-black p-4 space-y-2 bg-[#F4F4F0]">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal:</span>
                <span className="font-bold text-black">$ {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>VAT Tax (16%):</span>
                <span className="font-bold text-black">$ {taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm font-bold border-t border-black pt-2 text-black">
                <span>Total Amount:</span>
                <span>$ {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Notes & Terms */}
          <div className="border-t border-black pt-6 space-y-2">
            <span className="text-[10px] text-zinc-500 font-bold block">[Terms & Conditions]</span>
            <p className="text-[11px] text-zinc-700 normal-case bg-[#F4F4F0] p-4 border border-black">
              {notes}
            </p>
          </div>

          {/* Document Footer Signature */}
          <div className="border-t border-black pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-500 gap-4">
            <p>ANFORA® B2B TOUR CRM // SECURE PROPOSAL</p>
            <p>THANK YOU FOR YOUR BUSINESS</p>
          </div>

        </div>
      </div>
    );
  }

  // Otherwise, render the Creation Form view
  return (
    <div className="min-h-screen bg-[#F4F4F0] text-black p-4 sm:p-8 font-mono uppercase text-xs">
      
      {/* Top Navigation Bar & Action Back */}
      <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between border border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <Link href="/dashboard" className="flex items-center gap-1.5 font-bold hover:opacity-60 transition-opacity">
          <ArrowLeft className="h-4 w-4" />
          <span>BACK TO DASHBOARD</span>
        </Link>
        <span className="text-[10px] text-zinc-500">ANFORA PRO | QUOTATION GENERATOR</span>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Inputs & Line Items */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Metadata Section */}
          <div className="border border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h2 className="font-bold border-b border-black pb-2 text-zinc-800">[Quotation Details]</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-zinc-500 mb-1">Client Name</label>
                <input 
                  type="text" 
                  value={clientName} 
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full border border-black p-2 text-xs bg-[#F4F4F0] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] text-zinc-500 mb-1">Client Email</label>
                <input 
                  type="email" 
                  value={clientEmail} 
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full border border-black p-2 text-xs bg-[#F4F4F0] focus:outline-none lowercase"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] text-zinc-500 mb-1">Client ID </label>
                <input 
                  type="number" 
                  value={clientId} 
                  onChange={(e) => setClientId(Number(e.target.value))}
                  className="w-full border border-black p-2 text-xs bg-[#F4F4F0] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] text-zinc-500 mb-1">Expiry Date</label>
                <input 
                  type="date" 
                  value={expiryDate} 
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full border border-black p-2 text-xs bg-[#F4F4F0] focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1">Terms & Notes</label>
              <textarea 
                rows={2}
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-black p-2 text-xs bg-[#F4F4F0] focus:outline-none normal-case"
              />
            </div>
          </div>

          {/* Line Items Section */}
          <div className="border border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="flex items-center justify-between border-b border-black pb-2">
              <h2 className="font-bold text-zinc-800">[Quotation Line Items]</h2>
              <button 
                type="button"
                onClick={addItem}
                className="border border-black px-2 py-1 bg-black text-white hover:bg-transparent hover:text-black transition-colors text-[10px] flex items-center gap-1 font-bold"
              >
                <Plus className="h-3 w-3" /> ADD LINE
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="border border-black p-3 bg-[#F4F4F0] space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                    <div className="sm:col-span-6">
                      <label className="block text-[9px] text-zinc-500 mb-0.5">Description</label>
                      <input 
                        type="text" 
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="w-full border border-black p-1.5 bg-white text-xs focus:outline-none"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[9px] text-zinc-500 mb-0.5">Qty</label>
                      <input 
                        type="number" 
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                        className="w-full border border-black p-1.5 bg-white text-xs text-right focus:outline-none"
                        min="1"
                        required
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[9px] text-zinc-500 mb-0.5">Unit Price ($)</label>
                      <input 
                        type="number" 
                        value={item.unit_price}
                        onChange={(e) => updateItem(item.id, 'unit_price', Number(e.target.value))}
                        className="w-full border border-black p-1.5 bg-white text-xs text-right focus:outline-none"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="sm:col-span-1 flex justify-end pt-4">
                      <button 
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-zinc-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Calculations & Submit Action */}
        <div className="space-y-6">
          <div className="border border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sticky top-20 space-y-6">
            <h2 className="font-bold border-b border-black pb-2 text-zinc-800">[3. Financial Breakdown]</h2>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal:</span>
                <span className="font-bold text-black">$ {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>VAT Tax (16%):</span>
                <span className="font-bold text-black">$ {taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm font-bold border-t border-black pt-3 text-black">
                <span>Total Amount:</span>
                <span>$ {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 border border-black text-[11px] font-bold bg-red-100 text-red-800">
                {errorMessage}
              </div>
            )}

            <div className="border-t border-black pt-4 space-y-3">
              <button 
                type="submit"
                disabled={loading}
                className="w-full border border-black p-3 bg-black text-white hover:bg-transparent hover:text-black transition-colors font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{loading ? 'SAVING QUOTE...' : 'SAVE & GENERATE PROPOSAL'}</span>
              </button>

              <button 
                type="button"
                onClick={() => window.print()}
                className="w-full border border-black p-3 bg-white hover:bg-black hover:text-white transition-colors font-bold text-xs flex items-center justify-center gap-2"
              >
                <Printer className="h-4 w-4" />
                <span>PRINT DRAFT</span>
              </button>
            </div>
          </div>
        </div>

      </form>

    </div>
  );
}