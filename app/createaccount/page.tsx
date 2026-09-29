"use client";
import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Compass, ArrowRight, Loader2 } from "lucide-react";

export default function CreateAccountPage() {
    const [rgbColor] = useState({ r: 0, g: 0, b: 0 }); 
    const customHex = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!agreeToTerms) {
            setError("You must agree to the terms and conditions.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to create account.");
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F4F0] text-black p-4 sm:p-8 font-mono uppercase text-xs selection:bg-black selection:text-white flex items-center justify-center">
            <div className="max-w-md w-full border border-black bg-white p-8 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
                
                {/* Header Branding */}
                <div className="border-b border-black pb-4 space-y-1">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] text-black px-2 py-0.5 font-bold tracking-widest" >
                            ANFORA® | YOLO CONNECT KE
                        </span>
                        <Compass className="h-4 w-4 text-black" />
                    </div>
                    <h1 className="text-lg font-bold tracking-tight pt-2">Create Your Account</h1>
                    <p className="text-[10px] text-zinc-500 uppercase">Add Your Details to Get Started</p>
                </div>

                {error && (
                    <div className="border border-red-800 bg-red-100 p-3 text-red-700 text-[11px] font-bold shadow-[2px_2px_0px_0px_rgba(185,28,28,1)]">
                        [ERROR] {error}
                    </div>
                )}

                {success ? (
                    <div className="border border-black bg-[#F4F4F0] p-6 text-center space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex justify-center">
                            <ShieldCheck className="h-6 w-6 text-emerald-700" />
                        </div>
                        <p className="font-bold text-xs">Account created successfully! You can now access your operator dashboard.</p>
                        <Link 
                            href="/login" 
                            className="inline-flex items-center gap-1.5 border border-black px-4 py-2 bg-white hover:bg-black hover:text-white transition-colors text-[10px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mt-2"
                        >
                            <span>PROCEED TO LOGIN</span>
                            <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="block text-[10px] text-zinc-500 font-bold">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Mwangi Maitai"
                                className="w-full border border-black p-2.5 text-xs bg-[#F4F4F0] focus:outline-none font-bold normal-case placeholder-zinc-400"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-[10px] text-zinc-500 font-bold">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="mwangi@example.com"
                                className="w-full border border-black p-2.5 text-xs bg-[#F4F4F0] focus:outline-none font-bold normal-case placeholder-zinc-400"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-[10px] text-zinc-500 font-bold">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className="w-full border border-black p-2.5 text-xs bg-[#F4F4F0] focus:outline-none font-bold placeholder-zinc-400"
                            />
                        </div>

                        <div className="flex items-start gap-2.5 pt-2">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreeToTerms}
                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                                className="mt-0.5 h-4 w-4 rounded-none border border-black bg-[#F4F4F0] accent-black cursor-pointer"
                            />
                            <label htmlFor="terms" className="text-[10px] text-zinc-600 leading-relaxed cursor-pointer normal-case font-medium">
                                I agree to the{" "}
                                <Link href="/terms" target="_blank" className="font-bold underline text-black">
                                    Terms of Service
                                </Link>{" "}
                                and acknowledge the operator privacy standards.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full border border-black p-3 text-white hover:opacity-90 transition-all font-bold text-xs tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                            style={{ backgroundColor: customHex }}
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                            <span>{loading ? "INITIALIZING ACCOUNT..." : "CREATE ACCOUNT"}</span>
                        </button>
                    </form>
                )}

                <div className="border-t border-black pt-4 text-center text-[10px] text-zinc-500">
                    <p>ALREADY HAVE AN ACCOUNT? <Link href="/login" className="font-bold text-black underline">LOG IN HERE</Link></p>
                </div>

            </div>
        </div>
    );
}