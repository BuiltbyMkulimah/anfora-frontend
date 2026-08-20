export default function Loading() {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).toUpperCase();
  return (
    <main className="min-h-screen bg-[#F4F4F0] text-[#1a1a1a] font-serif p-4 md:p-8 flex items-center justify-center selection:bg-black selection:text-white">
      
      
      <div className="w-full max-w-3xl border-4 border-[#1a1a1a] p-6 md:p-10 bg-[#F5F2EB] shadow-2xl relative">
        
        
        <div className="border-b-2 border-t-2 border-[#1a1a1a] py-3 text-center mb-6">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase font-serif">
            THE ANFORA STANDARD
          </h1>
        </div>

        
        <div className="border-b border-[#1a1a1a] pb-3 mb-6 flex flex-wrap items-center justify-between text-[11px] font-mono tracking-widest uppercase">
          <span>ISSUE NO. 001</span>
          <span className="text-lg">✱</span>
          <span>CRM For Tour and Travel Operators</span>
          <span className="text-lg">✱</span>
          <span>{currentDate}</span>
        </div>

        {/* Breaking News Banner Heading */}
        <div className="border-b border-[#1a1a1a] pb-4 mb-6">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide font-sans">
            BREAKING NEWS : OPERATORS WHO STILL USE SPREADSHEETS ARE BLEEDING MARGINS AND LOSING PROFITS!
          </h2>
        </div>

        {/* Main Content Grid: Checklist Left, Visual/Loading Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[#1a1a1a] items-center">
          
          {/* Left Column: Core Modules Status */}
          {/* Left Column: Divided into Two Paragraph Blocks */}
          <div className="space-y-6">
            
            {/* Division 1: The Problem */}
            <div className="space-y-2 border-l-2 border-[#1a1a1a] pl-4">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-zinc-700">
                
              </span>
              <p className="text-xs leading-relaxed font-sans text-zinc-900">
                Tour operators across East Africa are losing vital margins to chaotic WhatsApp threads, unverified supplier rate sheets, and messy, amateur invoice structures. Managing multi-thousand dollar safaris on fragmented spreadsheets leads to double bookings and revenue leakage.
              </p>
            </div>

            {/* Division 2: The Solution */}
            <div className="space-y-2 border-l-2 border-[#1a1a1a] pl-4">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-zinc-700">
                
              </span>
              <p className="text-xs leading-relaxed font-sans text-zinc-900">
                Anfora replaces manual chaos with rigorous automation. By unifying your Itinerary Builder, Costing Matrix, and Invoice Generator into a single interface, we protect your margins and eliminate administrative friction instantly.
              </p>
            </div>

          </div>

          {/* Right Column: Framed Loading Visual Box */}
          <div className="border border-[#1a1a1a] p-6 bg-[#EBE7DF] text-center space-y-4 relative flex flex-col items-center justify-center min-h-[200px]">
            {/* Spinning/Pulse Core Element */}
            <div className="w-10 h-10 border-4 border-[#1a1a1a] border-t-transparent rounded-full animate-spin mb-2" />
            <p className="text-[11px] font-mono uppercase tracking-tight text-zinc-800 leading-relaxed">
              MIGRATING YOUR SYSTEM. PLEASE WAIT...
            </p>
          </div>

        </div>

        {/* Bottom Editorial Box */}
        <div className="mt-6 border border-[#1a1a1a] p-4 bg-[#EBE7DF] text-center">
          <p className="text-xs font-bold uppercase font-sans tracking-wide animate-pulse">
            STATUS:TuLiA NiKuPaNgE..
          </p>
        </div>

        {/* Bottom Double Rule Frame */}
        <div className="mt-6 border-b-2 border-t-2 border-[#1a1a1a] py-2 text-center text-[10px] font-mono tracking-widest uppercase">
          PRODUCT OF YOLO CONNECT KE | NAIROBI, KENYA
        </div>

      </div>
    </main>
  );
}