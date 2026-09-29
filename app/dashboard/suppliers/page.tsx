'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Save, ArrowLeft, Sliders, Truck, CheckCircle2, History, MapPin, Calendar, Building2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SupplierContactPerson {
  name: string;
  email: string;
  phone: string;
}

interface SuppliedItem {
  description: string;
  quantity: number;
  unit_cost: number;
}

export default function SuppliersPage() {
  const pathname = usePathname();
  const [supplierName, setSupplierName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [taxPin, setTaxPin] = useState('');


  const [contactPersons, setContactPersons] = useState<SupplierContactPerson[]>([
    { name: '', email: '', phone: '' }
  ]);


  const [items, setItems] = useState<SuppliedItem[]>([
    { description: '', quantity: 1, unit_cost: 0 }
  ]);

  const [loading, setLoading] = useState(false);
  const [responseResult, setResponseResult] = useState<any>(null);

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unit_cost: 0 }]);
  };

  const handleItemChange = (index: number, field: keyof SuppliedItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const removeItem = (index: number) => {  
    setItems(items.filter((_, i) => i !== index));
  };

  const handleContactChange = (index: number, field: keyof SupplierContactPerson, value: any) => {
    const newContacts = [...contactPersons];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setContactPersons(newContacts);
  };

  const addContact = () => {
    setContactPersons([...contactPersons, { name: '', email: '', phone: '' }]);
  };

  const removeContact = (index: number) => {
    setContactPersons(contactPersons.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      supplier_name: supplierName,
      category,
      location,
      payment_terms: paymentTerms,
      tax_pin: taxPin,
      contact_persons: contactPersons,
      supplied_items: items
    };

    try {
      const res = await fetch('http://localhost:5000/suppliers/create', {
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
        message: 'Supplier registered successfully (Simulated)',
        supplier_id: 'SUP-55104',
        supplier_name: supplierName
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

          
          <div className="flex items-center gap-2 border-l border-black pl-4">
           
            <Link
              href="/suppliers/tracker"
              className={`px-3 py-1.5 border border-black font-bold transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-flex items-center ${
                pathname === '/suppliers/tracker' ? 'bg-black text-white' : 'bg-[#F4F4F0] text-black hover:bg-zinc-200'
              }`}
            >
              <History className="h-3 w-3 inline mr-1" />
              <span>Suppliers Tracker</span>
            </Link>
          </div>
        </div>

   
      </div>

      {/* Register Supplier Form View */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        
        {/* Supplier Profile Card */}
        <div className="bg-white border border-black p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <h2 className="font-bold border-b border-black pb-3 flex items-center gap-2 text-zinc-800 text-sm">
            <Truck className="h-4 w-4"  />
            <span>[Supplier Details]</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Location / Destination</label>
              <input 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">KRA PIN / Tax ID</label>
              <input 
                type="text" 
                value={taxPin} 
                onChange={(e) => setTaxPin(e.target.value)}
                className="w-full border border-black p-3 bg-[#F4F4F0] focus:outline-none font-bold text-xs"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] text-zinc-500 mb-1.5 font-bold">Payment Terms (e.g. Net 30)</label>
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
            <h3 className="font-bold text-zinc-500">[Supplied Items]</h3>
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
                    placeholder="Description of item / service" 
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
                    placeholder="Quantity" 
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

        {/* Contact Persons Card */}
        <div className="bg-white border border-black p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex items-center justify-between border-b border-black pb-3">
            <h3 className="font-bold text-zinc-500">[Supplier Contacts ({contactPersons.length})]</h3>
            <button 
              type="button" 
              onClick={addContact}
              className="border border-black px-3 py-1.5 bg-[#F4F4F0] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              <span>Add Contact</span>
            </button>
          </div>

          <div className="space-y-3">
            {contactPersons.map((contact, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-[#F4F4F0] p-3 border border-black">
                <div className="sm:col-span-4">
                  <input 
                    type="text" 
                    placeholder="Contact Name" 
                    value={contact.name} 
                    onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                    className="w-full border border-black p-2 bg-white font-bold text-xs"
                    required
                  />
                </div>
                <div className="sm:col-span-4">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={contact.email} 
                    onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                    className="w-full border border-black p-2 bg-white font-bold text-xs"
                    required
                  />
                </div>
                <div className="sm:col-span-3">
                  <input 
                    type="text" 
                    placeholder="Phone Number" 
                    value={contact.phone} 
                    onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                    className="w-full border border-black p-2 bg-white font-bold text-xs"
                    required
                  />
                </div>
                <div className="sm:col-span-1 flex justify-center">
                  <button 
                    type="button" 
                    onClick={() => removeContact(index)}
                    disabled={contactPersons.length === 1}
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
            style={{ backgroundColor: loading ? '#A3A3A3' : '#000000' }}
          >
            <Save className="h-4 w-4" />
            <span>{loading ? 'REGISTERING & SAVING SUPPLIER...' : 'CREATE & SAVE SUPPLIER PROFILE (POST)'}</span>
          </button>
        </div>

      </form>

      {/* API Response Success Modal / Card */}
      {responseResult && (
        <div className="max-w-4xl mx-auto mt-6 bg-white border border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex items-center gap-2 font-bold text-xs text-black border-b border-black pb-3">
            <CheckCircle2 className="h-4 w-4" />
            <span>{responseResult.message}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 bg-[#F4F4F0] p-4 border border-black">
            <div><span className="text-[10px] text-zinc-500 block font-bold">Supplier ID</span> <span className="font-bold text-black">{responseResult.supplier_id}</span></div>
            <div><span className="text-[10px] text-zinc-500 block font-bold">Registered Vendor</span> <span className="font-bold">{responseResult.supplier_name}</span></div>
          </div>
        </div>
      )}

    </div>
  );
}