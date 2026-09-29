import Link from "next/link";
import { Scale, ArrowLeft, ShieldAlert } from "lucide-react";

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-[#F4F4F0] text-black p-4 sm:p-8 font-mono uppercase text-xs selection:bg-black selection:text-white flex justify-center">
            <div className="max-w-4xl w-full border border-black bg-white p-6 sm:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8 my-auto">
                
                {/* Header Branding */}
                <div className="border-b border-black pb-6 space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] text-white px-2 py-0.5 font-bold tracking-widest bg-black">
                            ANFORA® LEGAL FRAMEWORK
                        </span>
                        <Scale className="h-5 w-5 text-black" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight pt-2">Terms of Service & Operational Policies</h1>
                    <p className="text-[10px] text-zinc-500 lowercase">Effective Date: September 2026 • Read carefully before deploying or utilizing operator resources.</p>
                </div>

                {/* Notice Block */}
                <div className="border border-black bg-[#F4F4F0] p-4 text-[10px] space-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-2 font-bold text-black">
                        <ShieldAlert className="h-4 w-4" />
                        <span>BINDING LEGAL AGREEMENT</span>
                    </div>
                    <p className="text-zinc-600 lowercase font-medium">
                        By accessing, registering for, or using the Anfora platform, you agree to be legally bound by all conditions outlined below.
                    </p>
                </div>

                {/* Content Body */}
                <div className="space-y-6 text-zinc-800 text-xs leading-relaxed lowercase font-medium">
                    
                    <section className="border-b border-zinc-200 pb-5 space-y-2">
                        <h2 className="text-sm font-bold text-black uppercase">1. Acceptance of Terms (The Clickwrap Clause)</h2>
                        <p className="normal-case text-zinc-600">
                            By accessing, registering for, or using any service provided by Anfora, you acknowledge that you have read, understood, and agree to be legally bound by these terms. If you are entering into this agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity.
                        </p>
                    </section>

                    <section className="border-b border-zinc-200 pb-5 space-y-2">
                        <h2 className="text-sm font-bold text-black uppercase">2. User Accounts & Registration Rules</h2>
                        <p className="normal-case text-zinc-600">
                            Users must meet minimum age requirements (18+ years or legal operating age in your jurisdiction). You are strictly responsible for maintaining account security, safeguarding credentials, and all actions executed under your profile. Anfora reserves the absolute right to suspend or terminate accounts immediately without notice if security breaches or policy violations occur.
                        </p>
                    </section>

                    <section className="border-b border-zinc-200 pb-5 space-y-2">
                        <h2 className="text-sm font-bold text-black uppercase">3. Acceptable Use Policy (AUP)</h2>
                        <p className="normal-case text-zinc-600 mb-2">
                            The platform must be used strictly for lawful commercial and operational logistics. Prohibited activities explicitly include:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-zinc-600 normal-case">
                            <li>scraping, harvesting, or indexing platform data via automated scripts or bots;</li>
                            <li>uploading malware, viruses, or disruptive code;</li>
                            <li>harassing, abusing, or harming other operators or users;</li>
                            <li>reverse-engineering, decompiling, or attempting to extract source code from the software;</li>
                            <li>using the network for fraudulent or illegal activities.</li>
                        </ul>
                    </section>

                    <section className="border-b border-zinc-200 pb-5 space-y-2">
                        <h2 className="text-sm font-bold text-black uppercase">4. Intellectual Property Rights</h2>
                        <p className="normal-case text-zinc-600">
                            All software, UI design systems, source code, logos, and trademarks belong exclusively to Anfora or its licensors. Users are granted a limited, non-exclusive, non-transferable, revocable license to access and use the platform for authorized operational workflows. Unauthorized commercial replication or redistribution is strictly prohibited.
                        </p>
                    </section>

                    <section className="border-b border-zinc-200 pb-5 space-y-2">
                        <h2 className="text-sm font-bold text-black uppercase">5. User-Generated Content</h2>
                        <p className="normal-case text-zinc-600">
                            You retain ownership rights over text, itinerary logs, images, and data uploaded to your profile. By uploading, you grant Anfora a worldwide, non-exclusive, royalty-free license to host, process, cache, and display your content solely as required to deliver and optimize platform services.
                        </p>
                    </section>

                    <section className="border-b border-zinc-200 pb-5 space-y-2">
                        <h2 className="text-sm font-bold text-black uppercase">6. Payment, Subscription & Refund Terms</h2>
                        <p className="normal-case text-zinc-600">
                            Paid tiers operate on recurring billing cycles (monthly or annual). Subscriptions automatically renew unless canceled prior to the billing date. Due to the digital infrastructure nature of our tools, all fee disbursements are non-refundable except where mandated by applicable law.
                        </p>
                    </section>

                    <section className="border-b border-zinc-200 pb-5 space-y-2">
                        <h2 className="text-sm font-bold text-black uppercase">7. Disclaimer of Warranties</h2>
                        <p className="normal-case text-zinc-600">
                            The platform and associated resources are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. Anfora explicitly disclaims any statutory guarantees regarding 100% uptime, error-free software execution, or uninterrupted access.
                        </p>
                    </section>

                    <section className="border-b border-zinc-200 pb-5 space-y-2">
                        <h2 className="text-sm font-bold text-black uppercase">8. Limitation of Liability</h2>
                        <p className="normal-case text-zinc-600">
                            To the maximum extent permitted under law, Anfora shall not be held liable for any indirect, incidental, special, or consequential damages—including lost revenue, commercial profits, or data loss—arising out of your use or inability to use the platform.
                        </p>
                    </section>

                    <section className="border-b border-zinc-200 pb-5 space-y-2">
                        <h2 className="text-sm font-bold text-black uppercase">9. Indemnification</h2>
                        <p className="normal-case text-zinc-600">
                            You agree to defend, indemnify, and hold harmless Anfora, its directors, and staff from any claims, legal liabilities, damages, or operational expenses resulting from your misuse of the ecosystem, violation of these terms, or infringement of third-party rights.
                        </p>
                    </section>

                    <section className="border-b border-zinc-200 pb-5 space-y-2">
                        <h2 className="text-sm font-bold text-black uppercase">10. Governing Law and Dispute Resolution</h2>
                        <p className="normal-case text-zinc-600">
                            This agreement is governed by and construed in accordance with the laws of Kenya. Any structural disputes or claims arising from these terms shall be subject to the exclusive jurisdiction of the competent courts located in Kenya.
                        </p>
                    </section>

                    <section className="border-b border-zinc-200 pb-5 space-y-2">
                        <h2 className="text-sm font-bold text-black uppercase">11. Changes to the Terms</h2>
                        <p className="normal-case text-zinc-600">
                            We reserve the right to modify these terms at any time. Major revisions will be broadcast via email notifications or prominent platform announcements. Continued utilization of the software post-update constitutes full consent to the revised terms.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-sm font-bold text-black uppercase">12. Contact Information</h2>
                        <p className="normal-case text-zinc-600">
                            For legal inquiries, notices, or support escalations, reach out directly to the compliance department at <span className="text-black font-bold underline">yoloconnectke@gmail.com</span>.
                        </p>
                    </section>

                </div>

                {/* Footer Navigation */}
                <div className="border-t border-black pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px]">
                    <Link 
                        href="/createaccount" 
                        className="inline-flex items-center gap-1.5 border border-black px-4 py-2 bg-white hover:bg-black hover:text-white transition-colors font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <ArrowLeft className="h-3 w-3" />
                        <span>BACK TO REGISTRATION</span>
                    </Link>
                    <span className="text-zinc-500 font-bold uppercase">Anfora &bull; All Rights Reserved 2026</span>
                </div>

            </div>
        </div>
    );
}