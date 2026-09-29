"use client";
import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Compass, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
    const [rgbColor] = useState({ r: 0, g: 0, b: 0 });
    const customHex = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Invalid credentials provided.");
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred during authentication.");
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
                        <span className="text-[10px] text-white px-2 py-0.5 font-bold tracking-widest" style={{ backgroundColor: customHex }}>
                            ANFORA® LOGIN PAGE
                        </span>
                        <Compass className="h-4 w-4 text-black" />
                    </div>
                    <h1 className="text-lg font-bold tracking-tight pt-2">Sign In</h1>
                    <p className="text-[10px] text-zinc-500 uppercase">Login to your account to access your anfora dashboard.</p>
                </div>

                {error && (
                    <div className="border border-red-800 bg-red-100 p-3 text-red-700 text-[11px] font-bold shadow-[2px_2px_0px_0px_rgba(185,28,28,1)]">
                        [AUTH ERROR] {error}
                    </div>
                )}

                {success ? (
                    <div className="border border-black bg-[#F4F4F0] p-6 text-center space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex justify-center">
                            <ShieldCheck className="h-6 w-6 text-emerald-700" />
                        </div>
                        <p className="font-bold text-xs">Authentication verified! Terminal session unlocked.</p>
                        <Link 
                            href="/dashboard" 
                            className="inline-flex items-center gap-1.5 border border-black px-4 py-2 bg-white hover:bg-black hover:text-white transition-colors text-[10px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mt-2"
                        >
                            <span>LAUNCH DASHBOARD</span>
                            <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                            <div className="flex items-center justify-between">
                                <label className="block text-[10px] text-zinc-500 font-bold">Password</label>
                                <Link href="/forgot-password" className="text-[10px] text-black underline lowercase font-bold">
                                    forgot?
                                </Link>
                            </div>
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full border border-black p-3 text-white hover:opacity-90 transition-all font-bold text-xs tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                            style={{ backgroundColor: customHex }}
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                            <span>{loading ? "AUTHENTICATING..." : "ACCESS TERMINAL"}</span>
                        </button>
                    </form>
                )}

                <div className="border-t border-black pt-4 text-center text-[10px] text-zinc-500">
                    <p>DON'T HAVE AN ACCOUNT? <Link href="/createaccount" className="font-bold text-black underline">REGISTER HERE</Link></p>
                </div>

            </div>
        </div>
    );
}