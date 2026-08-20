import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import Workflows from '@/app/components/Workflow';
import OperationalRigor from '@/app/components/Anfora';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F4F0] text-black font-sans selection:bg-black selection:text-white">
      
      
      <Navbar activeTab="WORKFLOWS" />
      <Hero />
      <Workflows />
      <OperationalRigor />
      <Footer />

    </main>
  );
}