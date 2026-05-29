"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck2,
  ChevronRight,
  CheckCircle2,
  Clock3,
  Mail,
  Megaphone,
  Phone,
  Shield,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users2,
  Wallet,
  Lock,
  Unlock,
  Paintbrush,
  Zap,
  MessageSquare,
  HelpCircle,
  TrendingUp,
  Check,
  Building,
  GraduationCap,
  Sun,
  Moon
} from "lucide-react";

export default function HomePage() {
  
  const [theme, setTheme] = useState<"light" | "dark">("light");


  const [ticketPrice, setTicketPrice] = useState(40);
  const [ticketsSold, setTicketsSold] = useState(250);

  const [enteredPasscode, setEnteredPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcodeError, setPasscodeError] = useState("");

  
  const [brandColor, setBrandColor] = useState("violet");

  
  const [activeNiche, setActiveNiche] = useState("churches");

  
  const totalSales = ticketPrice * ticketsSold;
  
  // Typical Platforms: 3.7% + ₦1.79 per ticket platform fee + 2.9% payment processing
  const competitorPlatform = (0.037 * ticketPrice + 1.79) * ticketsSold;
  const competitorProcessing = 0.029 * totalSales;
  const competitorTotal = competitorPlatform + competitorProcessing;

  // Gathrio: 2.0% platform fee + 2.9% + ₦0.30 Stripe Connect fee passed to organizer
  const gathrioPlatform = 0.02 * totalSales;
  const gathrioProcessing = (0.029 * ticketPrice + 0.3) * ticketsSold;
  const gathrioTotal = gathrioPlatform + gathrioProcessing;

  const platformSavings = competitorPlatform - gathrioPlatform;
  const totalSavings = competitorTotal - gathrioTotal;

  // Handle mock passcode validation
  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPasscode.toLowerCase().trim() === "gathrio") {
      setIsUnlocked(true);
      setPasscodeError("");
    } else {
      setPasscodeError("Invalid passcode. Try typing 'GATHRIO'!");
      setIsUnlocked(false);
    }
  };

  const handleResetPasscode = () => {
    setIsUnlocked(false);
    setEnteredPasscode("");
    setPasscodeError("");
  };

  // Branding colors hex mapping
  const colorMap: Record<string, { primary: string; bg: string; border: string; glow: string }> = {
    violet: {
      primary: "#8b5cf6",
      bg: "bg-violet-600",
      border: "border-violet-500/30",
      glow: "shadow-[0_0_20px_rgba(139,92,246,0.25)]",
    },
    emerald: {
      primary: "#10b981",
      bg: "bg-emerald-500",
      border: "border-emerald-500/30",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.25)]",
    },
    rose: {
      primary: "#f43f5e",
      bg: "bg-rose-500",
      border: "border-rose-500/30",
      glow: "shadow-[0_0_20px_rgba(244,63,94,0.25)]",
    },
    amber: {
      primary: "#f59e0b",
      bg: "bg-amber-500",
      border: "border-amber-500/30",
      glow: "shadow-[0_0_20px_rgba(245,158,11,0.25)]",
    },
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 relative overflow-x-hidden ${
      theme === "light" 
        ? "bg-[#f8f9fc] text-slate-800 selection:bg-violet-100 selection:text-violet-900" 
        : "bg-[#070913] text-slate-100 selection:bg-violet-500/30 selection:text-violet-200"
    }`}>
      
      {/* Dynamic Theme Glow Backgrounds */}
      <div className={`absolute top-0 left-1/4 -z-10 h-[600px] w-[600px] rounded-full blur-[150px] transition-colors duration-500 ${
        theme === "light" ? "bg-violet-500/5" : "bg-violet-900/10"
      }`} />
      <div className={`absolute top-1/3 right-1/4 -z-10 h-[500px] w-[500px] rounded-full blur-[120px] transition-colors duration-500 ${
        theme === "light" ? "bg-indigo-500/5" : "bg-indigo-900/10"
      }`} />
      <div className={`absolute bottom-1/4 left-10 -z-10 h-[600px] w-[600px] rounded-full blur-[150px] transition-colors duration-500 ${
        theme === "light" ? "bg-fuchsia-500/5" : "bg-fuchsia-950/10"
      }`} />

      {/* Navigation Bar */}
      <nav className={`sticky top-0 z-50 border-b transition-colors duration-500 backdrop-blur-md ${
        theme === "light" 
          ? "border-slate-200/80 bg-white/80" 
          : "border-slate-900 bg-[#070913]/70"
      }`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2.5">
            <Image
              src="/gathrio-icon-color.png"
              alt="gathrio"
              width={40}
              height={40}
            />
            <span className={`text-base font-bold tracking-wider ${theme === "light" ? "text-slate-900" : "text-white"}`}>
              GATHRIO
            </span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className={`text-sm transition ${theme === "light" ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}>Features</a>
            <a href="#demo" className={`text-sm transition ${theme === "light" ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}>Interactive Demos</a>
            <a href="#calculator" className={`text-sm transition ${theme === "light" ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}>Savings Calculator</a>
            <a href="#pricing" className={`text-sm transition ${theme === "light" ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}>Pricing</a>
            <a href="#faq" className={`text-sm transition ${theme === "light" ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}>FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                theme === "light" 
                  ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700" 
                  : "bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-300"
              }`}
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <Link
              href="/signin"
              className={`text-xs font-semibold px-3 py-1.5 transition ${
                theme === "light" ? "text-slate-600 hover:text-slate-900" : "text-slate-300 hover:text-white"
              }`}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white transition hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-violet-500/10"
            >
              Create Account
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <section className="relative text-center lg:text-left lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 lg:pt-8">
          
          <div className="lg:col-span-6 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
            <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs transition-colors duration-500 ${
              theme === "light" 
                ? "border-violet-500/15 bg-violet-50 text-violet-700" 
                : "border-violet-500/20 bg-violet-950/40 text-violet-300"
            }`}>
              <Sparkles size={13} className={theme === "light" ? "text-violet-600" : "text-violet-400"} />
              <span>Ditching high platform fees and held payouts?</span>
            </div>
            
            <h1 className={`mt-6 text-[36px] font-extrabold leading-[1.1] tracking-tight sm:text-[52px] lg:text-[58px] transition-colors duration-500 ${
              theme === "light" ? "text-slate-900" : "text-white"
            }`}>
              Take Full Control of Your{" "}
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 bg-clip-text text-transparent">
                Events & Money
              </span>
            </h1>

            <p className={`mt-6 text-sm leading-relaxed sm:text-base md:text-lg transition-colors duration-500 ${
              theme === "light" ? "text-slate-600" : "text-slate-400"
            }`}>
              Low transparent fees, immediate payouts, custom branding, and passcode-protected privacy. Built specifically for event hosts who demand control over their cash flow and attendees.
            </p>

            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.01]"
              >
                Create Free Event <ArrowRight size={16} />
              </Link>
              <a
                href="#demo"
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-semibold transition hover:scale-[1.01] ${
                  theme === "light"
                    ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
                    : "border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                Try Interactive Demo
              </a>
            </div>

            {/* Quick value badges */}
            <div className={`mt-10 grid grid-cols-2 gap-4 border-t pt-8 text-left sm:grid-cols-4 transition-colors duration-500 ${
              theme === "light" ? "border-slate-200" : "border-slate-900"
            }`}>
              <div>
                <p className={`text-sm font-bold ${theme === "light" ? "text-slate-900" : "text-white"}`}>Immediate</p>
                <p className="text-xs text-slate-500">Payouts to Stripe</p>
              </div>
              <div>
                <p className={`text-sm font-bold ${theme === "light" ? "text-slate-900" : "text-white"}`}>Radical</p>
                <p className="text-xs text-slate-500">Fee Transparency</p>
              </div>
              <div>
                <p className={`text-sm font-bold ${theme === "light" ? "text-slate-900" : "text-white"}`}>Invite-Only</p>
                <p className="text-xs text-slate-500">Passcode Protection</p>
              </div>
              <div>
                <p className={`text-sm font-bold ${theme === "light" ? "text-slate-900" : "text-white"}`}>WhatsApp</p>
                <p className="text-xs text-slate-500">Founder Direct Line</p>
              </div>
            </div>
          </div>

          {/* Hero mockup/visualization */}
          <div className="mt-12 lg:col-span-6 lg:mt-0 animate-tilt-in" style={{ animationDelay: "0.15s" }}>
            <div className={`relative rounded-2xl border p-2 transition-all duration-500 ${
              theme === "light" 
                ? "border-slate-200/80 bg-slate-100 shadow-xl shadow-slate-200/30" 
                : "border-slate-800 bg-slate-950 shadow-2xl shadow-violet-950/20"
            }`}>
              {/* Outer decorative ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-violet-600/10 to-indigo-600/10 blur-sm -z-10" />
              
              <div className={`overflow-hidden rounded-xl border transition-colors duration-500 ${
                theme === "light" ? "border-slate-200 bg-white" : "border-slate-900 bg-[#0c0f24]"
              }`}>
                {/* Browser bar wrapper */}
                <div className={`flex items-center gap-1.5 border-b px-4 py-3 transition-colors duration-500 ${
                  theme === "light" ? "border-slate-200 bg-slate-50" : "border-slate-900 bg-slate-950"
                }`}>
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  <span className={`ml-3 text-[10px] font-mono tracking-wider transition-colors duration-500 ${
                    theme === "light" ? "text-slate-400" : "text-slate-600"
                  }`}>https://gathrio.io/dashboard</span>
                </div>
               
                      
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
                  alt="People enjoying an engaging live community event organized via Gathrio"
                  width={1200}
                  height={800}
                  className="h-48 w-full object-cover opacity-85 sm:h-64"
                />
                
                {/* Event banner overlap banner */}
                <div className={`px-5 py-4 border-b transition-colors duration-500 ${
                  theme === "light" 
                    ? "bg-slate-50 border-slate-200" 
                    : "bg-gradient-to-r from-violet-950/80 to-indigo-950/80 border-slate-900"
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${
                        theme === "light" 
                          ? "bg-violet-100 border-violet-200 text-violet-700" 
                          : "bg-violet-500/10 border-violet-500/20 text-violet-300"
                      }`}>
                        Core Event Flow
                      </span>
                      <h4 className={`mt-1 text-sm font-bold sm:text-base transition-colors duration-500 ${
                        theme === "light" ? "text-slate-900" : "text-white"
                      }`}>
                        Community Fundraising and Ticket Operations
                      </h4>
                    </div>
                    <div className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs ${
                      theme === "light"
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-emerald-950/30 border-emerald-500/20 text-emerald-400"
                    }`}>
                      <TrendingUp size={13} />
                      <span>Payout Released (T+2 Days)</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className={`rounded-xl border p-3 transition-colors duration-500 ${
                    theme === "light" ? "border-slate-100 bg-slate-50/50" : "border-slate-900 bg-slate-950/50"
                  }`}>
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block">Tickets Sold</span>
                    <span className={`text-xl font-bold mt-1 block transition-colors duration-500 ${
                      theme === "light" ? "text-slate-900" : "text-white"
                    }`}>428 / 500</span>
                    <div className={`mt-2 h-1.5 w-full rounded overflow-hidden transition-colors duration-500 ${
                      theme === "light" ? "bg-slate-200" : "bg-slate-800"
                    }`}>
                      <div className="bg-violet-500 h-full rounded" style={{ width: '85.6%' }} />
                    </div>
                  </div>
                  <div className={`rounded-xl border p-3 transition-colors duration-500 ${
                    theme === "light" ? "border-slate-100 bg-slate-50/50" : "border-slate-900 bg-slate-950/50"
                  }`}>
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block">Net Earnings</span>
                    <span className={`text-xl font-bold mt-1 block transition-colors duration-500 ${
                      theme === "light" ? "text-slate-900" : "text-white"
                    }`}>₦17,120</span>
                    <span className={`text-[9px] font-medium mt-1 block ${theme === "light" ? "text-emerald-600" : "text-emerald-400"}`}>Directly in your Stripe Connect</span>
                  </div>
                  <div className={`rounded-xl border p-3 transition-colors duration-500 ${
                    theme === "light" ? "border-slate-100 bg-slate-50/50" : "border-slate-900 bg-slate-950/50"
                  }`}>
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block">Ticket Scanning</span>
                    <span className={`text-xl font-bold mt-1 block transition-colors duration-500 ${
                      theme === "light" ? "text-slate-900" : "text-white"
                    }`}>94% Active</span>
                    <span className="text-[9px] text-violet-600 font-medium mt-1 block">QR Scanning Ready at Gate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE PLATFORM FEATURES (THE 4 PILLARS) */}
        <section id="features" className="mt-32 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">The Gathrio Advantage</h2>
            <p className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl transition-colors duration-500 ${
              theme === "light" ? "text-slate-900" : "text-white"
            }`}>
              Engineered to Resolve Your Biggest Event Grievances
            </p>
            <p className={`mt-4 text-sm sm:text-base transition-colors duration-500 ${
              theme === "light" ? "text-slate-600" : "text-slate-400"
            }`}>
              Existing event giants focus on their own brand and lock your cash. We flipped the equation to put organizers first.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Pillar 1 */}
            <div className={`rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-violet-500/20 group cursor-pointer ${
              theme === "light" 
                ? "border-slate-200/80 bg-white text-slate-800 shadow-sm" 
                : "border-slate-900 bg-[#090b1a]/50 text-slate-100 hover:bg-[#0c0e24]"
            }`}>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/10 text-violet-600 border border-violet-500/20 transition-transform duration-300 group-hover:scale-105">
                <Wallet size={20} />
              </div>
              <h3 className={`mt-4 text-base font-bold transition-colors duration-500 ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}>Fair Fees & Fast Payouts</h3>
              <p className={`mt-3 text-xs leading-relaxed transition-colors duration-500 ${
                theme === "light" ? "text-slate-600" : "text-slate-400"
              }`}>
                Stop waiting for weeks post-event to get paid. Payouts trigger to your bank via Stripe Connect within 48 hours of ticket sales. Our transparent ticket platform fee is just 2.0%.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className={`rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-indigo-500/20 group cursor-pointer ${
              theme === "light" 
                ? "border-slate-200/80 bg-white text-slate-800 shadow-sm" 
                : "border-slate-900 bg-[#090b1a]/50 text-slate-100 hover:bg-[#0c0e24]"
            }`}>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600 border border-indigo-500/20 transition-transform duration-300 group-hover:scale-105">
                <Lock size={20} />
              </div>
              <h3 className={`mt-4 text-base font-bold transition-colors duration-500 ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}>Bcrypt Private Passcodes</h3>
              <p className={`mt-3 text-xs leading-relaxed transition-colors duration-500 ${
                theme === "light" ? "text-slate-600" : "text-slate-400"
              }`}>
                The ultimate solution for private conferences, members-only retreats, and exclusive gatherings. Safeguard your pages with secure passcodes. Invitees must enter the code to unlock ticket purchasing.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className={`rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-fuchsia-500/20 group cursor-pointer ${
              theme === "light" 
                ? "border-slate-200/80 bg-white text-slate-800 shadow-sm" 
                : "border-slate-900 bg-[#090b1a]/50 text-slate-100 hover:bg-[#0c0e24]"
            }`}>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-600/10 text-fuchsia-600 border border-fuchsia-500/20 transition-transform duration-300 group-hover:scale-105">
                <Paintbrush size={20} />
              </div>
              <h3 className={`mt-4 text-base font-bold transition-colors duration-500 ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}>Full Organizer Branding</h3>
              <p className={`mt-3 text-xs leading-relaxed transition-colors duration-500 ${
                theme === "light" ? "text-slate-600" : "text-slate-400"
              }`}>
                Ditch the ticketing platform&apos;s corporate branding. Inject custom colors, upload high-res event banners, define accent profiles, and host under customizable display names that honor your identity.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className={`rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-rose-500/20 group cursor-pointer ${
              theme === "light" 
                ? "border-slate-200/80 bg-white text-slate-800 shadow-sm" 
                : "border-slate-900 bg-[#090b1a]/50 text-slate-100 hover:bg-[#0c0e24]"
            }`}>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600/10 text-rose-600 border border-rose-500/20 transition-transform duration-300 group-hover:scale-105">
                <MessageSquare size={20} />
              </div>
              <h3 className={`mt-4 text-base font-bold transition-colors duration-500 ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}>Direct Human Support</h3>
              <p className={`mt-3 text-xs leading-relaxed transition-colors duration-500 ${
                theme === "light" ? "text-slate-600" : "text-slate-400"
              }`}>
                Say goodbye to generic AI chat bots that give circular answers. Connect directly with our founding engineering and support team via WhatsApp or Email. We are active, responsive, and available.
              </p>
            </div>

          </div>
        </section>

        {/* INTERACTIVE PLAYGROUNDS */}
        <section id="demo" className="mt-32 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">Product Interactive Playground</h2>
            <p className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl transition-colors duration-500 ${
              theme === "light" ? "text-slate-900" : "text-white"
            }`}>
              Experience the Key Differentiators Live
            </p>
            <p className={`mt-4 text-xs sm:text-sm transition-colors duration-500 ${
              theme === "light" ? "text-slate-600" : "text-slate-400"
            }`}>
              We built functional mockups so you can see how passcode protection and white-label branding work instantly without writing a single line of database code.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            
            {/* INTERACTIVE DEMO 1: Passcode Protection Screen */}
            <div className={`rounded-3xl border p-6 sm:p-8 relative overflow-hidden transition-all duration-500 ${
              theme === "light" 
                ? "border-slate-200/80 bg-white shadow-xl shadow-slate-200/25" 
                : "border-slate-900 bg-slate-950/70 shadow-2xl"
            }`}>
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-violet-600/5 blur-[40px] -z-10" />
              
              <div className="flex items-center gap-2">
                <Lock className="text-violet-500" size={18} />
                <h3 className={`text-lg font-bold transition-colors duration-500 ${
                  theme === "light" ? "text-slate-900" : "text-white"
                }`}>1. Secure Private Passcode Flow</h3>
              </div>
              
              <p className={`mt-2 text-xs leading-relaxed transition-colors duration-500 ${
                theme === "light" ? "text-slate-500" : "text-slate-400"
              }`}>
                Host invite-only summits, church events, or corporate annual general meetings. Give invitees your access code to reveal the hidden registration interface.
              </p>

              <div className={`mt-6 rounded-2xl border p-5 min-h-[260px] flex flex-col justify-center transition-colors duration-500 ${
                theme === "light" ? "border-slate-200 bg-slate-50/50" : "border-slate-900 bg-[#0a0d22]"
              }`}>
                {!isUnlocked ? (
                  <form onSubmit={handlePasscodeSubmit} className="text-center max-w-sm mx-auto w-full">
                    <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/10 text-violet-600 border border-violet-500/20 mb-4 animate-bounce-soft">
                      <Lock size={20} />
                    </div>
                    <h4 className={`text-sm font-bold transition-colors duration-500 ${
                      theme === "light" ? "text-slate-900" : "text-white"
                    }`}>Exclusive Access Required</h4>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Enter the passcode to unlock this private event.
                    </p>
                    
                    {/* Access hint */}
                    <div className={`mt-3 inline-block rounded border px-2 py-0.5 text-[9px] font-mono transition-colors duration-500 ${
                      theme === "light" 
                        ? "bg-violet-50 border-violet-100 text-violet-700" 
                        : "bg-violet-950/50 border-violet-500/30 text-violet-300"
                    }`}>
                      💡 Access code hint: <span className={`font-bold underline ${theme === "light" ? "text-violet-900" : "text-white"}`}>GATHRIO</span>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="Enter Passcode..."
                        value={enteredPasscode}
                        onChange={(e) => setEnteredPasscode(e.target.value)}
                        className={`w-full rounded-xl border px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500 transition ${
                          theme === "light" 
                            ? "bg-white border-slate-200 text-slate-800 placeholder-slate-400" 
                            : "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                        }`}
                      />
                      <button
                        type="submit"
                        className="rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white hover:bg-violet-500 transition cursor-pointer"
                      >
                        Unlock
                      </button>
                    </div>
                    {passcodeError && (
                      <p className="mt-2 text-[10px] text-rose-500 font-medium">{passcodeError}</p>
                    )}
                  </form>
                ) : (
                  <div className="text-center max-w-sm mx-auto w-full animate-fade-in-up">
                    <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 mb-3">
                      <Unlock size={20} />
                    </div>
                    <h4 className={`text-sm font-bold transition-colors duration-500 ${
                      theme === "light" ? "text-slate-900" : "text-white"
                    }`}>Passcode Correct!</h4>
                    <p className="mt-0.5 text-[10px] text-slate-500">
                      Exclusive Event Unlocked
                    </p>

                    {/* Unlocked ticket preview */}
                    <div className={`mt-4 rounded-xl border p-4 text-left relative overflow-hidden transition-colors duration-500 ${
                      theme === "light" ? "bg-white border-slate-200" : "bg-slate-950 border-slate-900"
                    }`}>
                      <div className={`absolute top-0 right-0 h-10 w-10 border-l border-b rounded-bl-xl flex items-center justify-center ${
                        theme === "light" 
                          ? "bg-emerald-50 border-emerald-100" 
                          : "bg-emerald-500/10 border-emerald-500/20"
                      }`}>
                        <Check size={14} className="text-emerald-500" />
                      </div>
                      
                      <span className="text-[9px] text-emerald-500 uppercase tracking-widest font-mono">Unlock Active • Ticket Tier Open</span>
                      <h5 className={`font-bold text-xs mt-1 transition-colors duration-500 ${
                        theme === "light" ? "text-slate-800" : "text-white"
                      }`}>Exclusive VIP Founders Retreat 2026</h5>
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-500">
                        <CalendarCheck2 size={11} />
                        <span>June 18, 2026 • 6:00 PM</span>
                      </div>
                      
                      <div className={`mt-3 flex items-center justify-between border-t pt-3 transition-colors duration-500 ${
                        theme === "light" ? "border-slate-100" : "border-slate-900"
                      }`}>
                        <div>
                          <span className="text-[9px] text-slate-500 block">General Admission</span>
                          <span className={`text-xs font-bold transition-colors duration-500 ${
                            theme === "light" ? "text-slate-900" : "text-white"
                          }`}>₦150.00</span>
                        </div>
                        <button className="rounded-lg bg-emerald-600 px-3 py-1.5 text-[10px] font-bold text-white hover:bg-emerald-500 transition cursor-pointer">
                          Register Ticket
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleResetPasscode}
                      className="mt-4 text-[10px] text-slate-500 underline hover:text-slate-400 cursor-pointer"
                    >
                      Reset Lock Demo
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* INTERACTIVE DEMO 2: Branded Accent Color Customizer */}
            <div className={`rounded-3xl border p-6 sm:p-8 relative overflow-hidden transition-all duration-500 ${
              theme === "light" 
                ? "border-slate-200/80 bg-white shadow-xl shadow-slate-200/25" 
                : "border-slate-900 bg-slate-950/70 shadow-2xl"
            }`}>
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-indigo-600/5 blur-[40px] -z-10" />
              
              <div className="flex items-center gap-2">
                <Paintbrush className="text-indigo-500" size={18} />
                <h3 className={`text-lg font-bold transition-colors duration-500 ${
                  theme === "light" ? "text-slate-900" : "text-white"
                }`}>2. Interactive Accent Customizer</h3>
              </div>
              
              <p className={`mt-2 text-xs leading-relaxed transition-colors duration-500 ${
                theme === "light" ? "text-slate-500" : "text-slate-400"
              }`}>
                Your event represents *your* community. Choose color schemes, upload banner images, and set logos. Gathrio dynamically customizes the pages without forcing its corporate look.
              </p>

              {/* Color swatches */}
              <div className="mt-4 flex gap-2.5">
                {Object.keys(colorMap).map((color) => (
                  <button
                    key={color}
                    onClick={() => setBrandColor(color)}
                    className={`h-8 px-3 rounded-lg border text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                      brandColor === color
                        ? (theme === "light" ? "bg-slate-100 text-slate-900 border-slate-300" : "bg-slate-900 text-white border-slate-700")
                        : (theme === "light" ? "bg-white text-slate-400 border-slate-200 hover:border-slate-300" : "bg-slate-950/50 text-slate-500 border-slate-900 hover:border-slate-800")
                    }`}
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${colorMap[color].bg}`} />
                    {color}
                  </button>
                ))}
              </div>

              {/* Branded preview screen */}
              <div className={`mt-6 rounded-2xl border p-5 transition-colors duration-500 ${
                theme === "light" ? "border-slate-200 bg-slate-50/50" : "border-slate-900 bg-[#0a0d22]"
              }`}>
                <div className={`rounded-xl border overflow-hidden transition-all duration-500 ${
                  theme === "light" ? "border-slate-200 bg-white" : `bg-slate-950 ${colorMap[brandColor].border} ${colorMap[brandColor].glow}`
                }`}>
                  
                  {/* Mock banner */}
                  <div className={`h-16 px-4 flex items-center justify-between border-b transition-colors duration-500 ${
                    theme === "light" ? "bg-slate-50 border-slate-100" : "bg-slate-900/40 border-slate-900"
                  }`}>
                    <span className={`text-[10px] font-bold tracking-wide uppercase ${theme === "light" ? "text-slate-500" : "text-slate-400"}`}>⚡ Host: Lagos Christian Center</span>
                    <div className={`h-6 w-6 rounded-full ${colorMap[brandColor].bg} opacity-20`} />
                  </div>
                  
                  <div className="p-4">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">Sunday Worship Service</span>
                    <h5 className={`font-extrabold text-sm mt-0.5 transition-colors duration-500 ${
                      theme === "light" ? "text-slate-800" : "text-white"
                    }`}>Youth Revival & Empowerment Conference</h5>
                    
                    <div className={`mt-4 flex flex-wrap gap-2 items-center justify-between border-t pt-3 transition-colors duration-500 ${
                      theme === "light" ? "border-slate-100" : "border-slate-900/60"
                    }`}>
                      <div>
                        <span className="text-[9px] text-slate-500 block">Registration Pricing</span>
                        <span className={`text-xs font-bold transition-colors duration-500 ${
                          theme === "light" ? "text-slate-950" : "text-white"
                        }`}>Free Event</span>
                      </div>
                      
                      <button
                        className={`rounded-lg px-4 py-2 text-[10px] font-bold text-white transition-all duration-500 hover:opacity-90 ${colorMap[brandColor].bg}`}
                      >
                        Register Free Ticket
                      </button>
                    </div>
                  </div>

                </div>
                <div className="mt-3 text-center">
                  <span className="text-[9px] text-slate-500 font-mono">
                    Live CSS Variable injection: <span className={`font-bold ${theme === "light" ? "text-slate-700" : "text-slate-300"}`}>--brand-color: {colorMap[brandColor].primary}</span>
                  </span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* INTERACTIVE SAVINGS CALCULATOR SECTION */}
        <section id="calculator" className="mt-32 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className={`rounded-3xl border p-6 sm:p-10 relative overflow-hidden transition-all duration-500 ${
            theme === "light" 
              ? "bg-gradient-to-b from-[#f2f4fc] to-[#f8f9fc] border-slate-200/80 shadow-md" 
              : "bg-gradient-to-b from-[#090c24] to-[#070913] border-slate-900 shadow-2xl"
          }`}>
            
            {/* Glowing accents */}
            <div className="absolute top-0 left-0 h-48 w-48 rounded-full bg-violet-600/5 blur-[80px]" />
            <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-indigo-600/5 blur-[80px]" />

            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">Total Transparency Calculator</h2>
              <p className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl transition-colors duration-500 ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}>
                See Exactly What You Save Compared to Traditional Platforms
              </p>
              <p className={`mt-4 text-xs sm:text-sm transition-colors duration-500 ${
                theme === "light" ? "text-slate-600" : "text-slate-400"
              }`}>
                Established platforms lock down high ticketing fees and hold your money until weeks after the event. Drag the sliders to see Gathrio&apos;s 2% model in action.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              
              {/* Left Side: Sliders */}
              <div className="lg:col-span-6 space-y-6">
                <div className={`rounded-2xl border p-5 transition-colors duration-500 ${
                  theme === "light" ? "border-slate-200 bg-white" : "border-slate-900 bg-slate-950/60"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <label className={`text-xs font-semibold ${theme === "light" ? "text-slate-700" : "text-slate-300"}`}>Average Ticket Price</label>
                    <span className="rounded bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 text-xs font-mono font-bold text-violet-600">
                      ₦{ticketPrice}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1.5">
                    <span>₦10</span>
                    <span>₦100</span>
                    <span>₦200</span>
                  </div>
                </div>

                <div className={`rounded-2xl border p-5 transition-colors duration-500 ${
                  theme === "light" ? "border-slate-200 bg-white" : "border-slate-900 bg-slate-950/60"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <label className={`text-xs font-semibold ${theme === "light" ? "text-slate-700" : "text-slate-300"}`}>Expected Attendees (Tickets Sold)</label>
                    <span className="rounded bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-xs font-mono font-bold text-indigo-600">
                      {ticketsSold} guests
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1500"
                    step="50"
                    value={ticketsSold}
                    onChange={(e) => setTicketsSold(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1.5">
                    <span>50</span>
                    <span>750</span>
                    <span>1,500</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className={`rounded-xl border p-3 transition-colors duration-500 ${
                    theme === "light" ? "border-slate-200 bg-white/70" : "border-slate-900 bg-slate-950/40"
                  }`}>
                    <span className="text-[10px] text-slate-500 block uppercase tracking-wider">Gross Sales Revenue</span>
                    <span className={`text-lg font-extrabold mt-1 block transition-colors duration-500 ${
                      theme === "light" ? "text-slate-850" : "text-white"
                    }`}>₦{totalSales.toLocaleString()}</span>
                  </div>
                  
                  <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3 shadow-lg shadow-emerald-500/5">
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block uppercase tracking-wider font-semibold">Total Savings</span>
                    <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">₦{Math.max(0, Math.round(totalSavings)).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Visual Comparison Card */}
              <div className="lg:col-span-6">
                <div className={`rounded-2xl border p-6 space-y-5 transition-all duration-500 ${
                  theme === "light" ? "border-slate-200 bg-white shadow-md" : "border-slate-900 bg-slate-950"
                }`}>
                  <h4 className={`text-sm font-bold tracking-wide border-b pb-3 flex items-center justify-between transition-colors duration-500 ${
                    theme === "light" ? "border-slate-100 text-slate-900" : "border-slate-900 text-white"
                  }`}>
                    <span>Platform Fee Breakdown</span>
                    <span className="text-xs font-normal text-slate-500 font-mono">Gross: ₦{totalSales.toLocaleString()}</span>
                  </h4>

                  {/* Savings Chart comparison */}
                  <div className="space-y-4">
                    {/* Typical Row */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500 font-semibold">Typical Platform (Platform & Processing)</span>
                        <span className="text-rose-500 font-bold">₦{Math.round(competitorTotal).toLocaleString()}</span>
                      </div>
                      <div className={`h-6 w-full rounded overflow-hidden relative flex items-center px-2 transition-colors duration-500 ${
                        theme === "light" ? "bg-slate-100" : "bg-slate-900"
                      }`}>
                        <div className="bg-rose-50/20 dark:bg-rose-500/20 border-r border-rose-300 dark:border-rose-500 h-full absolute left-0 top-0 transition-all duration-300" style={{ width: '100%' }} />
                        <span className="text-[9px] text-rose-700 dark:text-rose-300 font-mono font-semibold relative z-10">
                          Fee rate: ~{( (competitorTotal / totalSales) * 100).toFixed(1)}% of gross
                        </span>
                      </div>
                    </div>

                    {/* Gathrio Row */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500 font-semibold">Gathrio (Platform & Processing)</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">₦{Math.round(gathrioTotal).toLocaleString()}</span>
                      </div>
                      <div className={`h-6 w-full rounded overflow-hidden relative flex items-center px-2 transition-colors duration-500 ${
                        theme === "light" ? "bg-slate-100" : "bg-slate-900"
                      }`}>
                        <div
                          className="bg-emerald-50/20 dark:bg-emerald-500/20 border-r border-emerald-300 dark:border-emerald-500 h-full absolute left-0 top-0 transition-all duration-300"
                          style={{ width: `${(gathrioTotal / competitorTotal) * 100}%` }}
                        />
                        <span className="text-[9px] text-emerald-700 dark:text-emerald-300 font-mono font-semibold relative z-10">
                          Fee rate: ~{( (gathrioTotal / totalSales) * 100).toFixed(1)}% of gross
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Immediate payout comparative notes */}
                  <div className={`rounded-xl border p-3.5 space-y-2 transition-colors duration-500 ${
                    theme === "light" ? "border-slate-150 bg-slate-50/70" : "border-slate-800 bg-slate-900/60"
                  }`}>
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 rounded-full bg-emerald-500/10 p-0.5">
                        <Check size={12} className="text-emerald-500" />
                      </div>
                      <p className={`text-[11px] leading-relaxed transition-colors duration-500 ${
                        theme === "light" ? "text-slate-650" : "text-slate-300"
                      }`}>
                        <strong className={theme === "light" ? "text-slate-900" : "text-white"}>Radical Platform Savings:</strong> Gathrio&apos;s raw platform cut is only <span className="font-bold text-emerald-500">₦{Math.round(gathrioPlatform)} (2%)</span> vs other platforms&apos; whopping <span className="font-bold text-rose-500">₦{Math.round(competitorPlatform)} (3.7% + ₦1.79/ticket)</span>.
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 rounded-full bg-emerald-500/10 p-0.5">
                        <Check size={12} className="text-emerald-500" />
                      </div>
                      <p className={`text-[11px] leading-relaxed transition-colors duration-500 ${
                        theme === "light" ? "text-slate-650" : "text-slate-300"
                      }`}>
                        <strong className={theme === "light" ? "text-slate-900" : "text-white"}>Cash Flow Security:</strong> Funds are sent automatically to your bank within 2 days of a ticket sale. We never hold your total event receipts hostage.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* FOR WHO / TARGET NICHES SECTION */}
        <section className="mt-32 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">Gathrio For Who?</h2>
            <p className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl transition-colors duration-500 ${
              theme === "light" ? "text-slate-900" : "text-white"
            }`}>
              Custom-Tailored Solutions for Focused Communities
            </p>
            <p className={`mt-4 text-xs sm:text-sm transition-colors duration-500 ${
              theme === "light" ? "text-slate-650" : "text-slate-400"
            }`}>
              We focus heavily on specific groups where standard platform branding, locked cash, and zero privacy create genuine operational hurdles.
            </p>
          </div>

          {/* Interactive Niche Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { id: "churches", label: "Faith & Churches", icon: ShieldCheck },
              { id: "communities", label: "Cultural Groups", icon: Users2 },
              { id: "corporate", label: "Corporate Workshops", icon: Building },
              { id: "campus", label: "Student & Campus", icon: GraduationCap },
            ].map((niche) => {
              const Icon = niche.icon;
              return (
                <button
                  key={niche.id}
                  onClick={() => setActiveNiche(niche.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
                    activeNiche === niche.id
                      ? "bg-violet-600 text-white shadow-md shadow-violet-500/15 animate-pulse-soft"
                      : (theme === "light" 
                        ? "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 shadow-sm" 
                        : "bg-slate-900/60 text-slate-400 border border-slate-900 hover:text-white")
                  }`}
                >
                  <Icon size={14} />
                  {niche.label}
                </button>
              );
            })}
          </div>

          {/* Active Niche Details Display */}
          <div className={`mt-8 rounded-3xl border p-6 sm:p-8 animate-fade-in-up transition-colors duration-500 ${
            theme === "light" ? "border-slate-200/80 bg-slate-100/30" : "border-slate-900 bg-[#090b1c]/40"
          }`}>
            {activeNiche === "churches" && (
              <div className="grid grid-cols-1 md:grid-cols-12 md:items-center gap-8 animate-fade-in-up">
                <div className="md:col-span-7 space-y-4">
                  <span className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${
                    theme === "light" 
                      ? "bg-violet-100 border-violet-250 text-violet-700" 
                      : "bg-violet-500/10 border-violet-500/20 text-violet-300"
                  }`}>
                    Churches & Ministries
                  </span>
                  <h3 className={`text-xl font-bold transition-colors duration-500 ${
                    theme === "light" ? "text-slate-900" : "text-white"
                  }`}>Cultivating Sacred Gatherings with Privacy</h3>
                  <p className={`text-xs leading-relaxed transition-colors duration-500 ${
                    theme === "light" ? "text-slate-600" : "text-slate-400"
                  }`}>
                    Corporate platform advertisements look wildly inappropriate on church event pages, and holding your funds hostage affects your parish operations.
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-violet-500" />
                      <span className={theme === "light" ? "text-slate-700" : "text-slate-300"}><strong>Private Page Passcodes:</strong> Keep member-only retreats secure from the general public.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-violet-500" />
                      <span className={theme === "light" ? "text-slate-700" : "text-slate-300"}><strong>Clean White-Labeling:</strong> Event pages carry your church logo, accent colors, and custom details.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-violet-500" />
                      <span className={theme === "light" ? "text-slate-700" : "text-slate-300"}><strong>Zero Hidden Fee Options:</strong> Free weekly services are completely, 100% free forever.</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5">
                  <div className={`overflow-hidden rounded-2xl border p-1 transition-colors duration-500 ${
                    theme === "light" ? "border-slate-200 bg-white" : "border-slate-800 bg-slate-950"
                  }`}>
                    <Image
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80"
                      alt="Church group gathering at an exclusive event organized with Gathrio"
                      width={600}
                      height={400}
                      className="rounded-xl h-48 w-full object-cover opacity-80"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeNiche === "communities" && (
              <div className="grid grid-cols-1 md:grid-cols-12 md:items-center gap-8 animate-fade-in-up">
                <div className="md:col-span-7 space-y-4">
                  <span className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${
                    theme === "light" 
                      ? "bg-indigo-100 border-indigo-250 text-indigo-700" 
                      : "bg-indigo-500/10 border-indigo-500/20 text-indigo-300"
                  }`}>
                    Diaspora & Cultural Groups
                  </span>
                  <h3 className={`text-xl font-bold transition-colors duration-500 ${
                    theme === "light" ? "text-slate-900" : "text-white"
                  }`}>Streamline Community Festivals & Town Halls</h3>
                  <p className={`text-xs leading-relaxed transition-colors duration-500 ${
                    theme === "light" ? "text-slate-600" : "text-slate-400"
                  }`}>
                    Event-driven cultures host massive gatherings that require quick payout cash flow to pay event vendors, caterers, and rentals. Waiting weeks until after the event closes creates major friction.
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-indigo-500" />
                      <span className={theme === "light" ? "text-slate-700" : "text-slate-300"}><strong>48-Hour Vendor Cash Flow:</strong> Direct Stripe payouts let you settle venue balances early.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-indigo-500" />
                      <span className={theme === "light" ? "text-slate-700" : "text-slate-300"}><strong>Offline attendee registration:</strong> Scan attendee QR codes directly with any smartphone.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-indigo-500" />
                      <span className={theme === "light" ? "text-slate-700" : "text-slate-300"}><strong>Community Support:</strong> Direct WhatsApp assistance so you never get stuck during pre-event rush.</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5">
                  <div className={`overflow-hidden rounded-2xl border p-1 transition-colors duration-500 ${
                    theme === "light" ? "border-slate-200 bg-white" : "border-slate-800 bg-slate-950"
                  }`}>
                    <Image
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                      alt="Cultural community meeting organized with Gathrio"
                      width={600}
                      height={400}
                      className="rounded-xl h-48 w-full object-cover opacity-80"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeNiche === "corporate" && (
              <div className="grid grid-cols-1 md:grid-cols-12 md:items-center gap-8 animate-fade-in-up">
                <div className="md:col-span-7 space-y-4">
                  <span className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${
                    theme === "light" 
                      ? "bg-fuchsia-100 border-fuchsia-250 text-fuchsia-700" 
                      : "bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-300"
                  }`}>
                    Corporate & Professional
                  </span>
                  <h3 className={`text-xl font-bold transition-colors duration-500 ${
                    theme === "light" ? "text-slate-900" : "text-white"
                  }`}>Elite Invite-Only Staff & AGM Operations</h3>
                  <p className={`text-xs leading-relaxed transition-colors duration-500 ${
                    theme === "light" ? "text-slate-600" : "text-slate-400"
                  }`}>
                    Corporate companies host highly sensitive investor summits, annual general meetings (AGMs), or exclusive training workshops. Platform co-branding is a dealbreaker, and public exposure is highly restricted.
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-fuchsia-500" />
                      <span className={theme === "light" ? "text-slate-700" : "text-slate-300"}><strong>Bcrypt Passcodes:</strong> Only verified employees with credentials can view registration.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-fuchsia-500" />
                      <span className={theme === "light" ? "text-slate-700" : "text-slate-300"}><strong>Total White-Label Identity:</strong> Custom domains, branding profiles, and logo emphasis.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-fuchsia-500" />
                      <span className={theme === "light" ? "text-slate-700" : "text-slate-300"}><strong>Direct Export & Reporting:</strong> Securely export all guest check-in records in clean spreadsheets.</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5">
                  <div className={`overflow-hidden rounded-2xl border p-1 transition-colors duration-500 ${
                    theme === "light" ? "border-slate-200 bg-white" : "border-slate-800 bg-slate-950"
                  }`}>
                    <Image
                      src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80"
                      alt="Corporate seminar and meeting organized with Gathrio"
                      width={600}
                      height={400}
                      className="rounded-xl h-48 w-full object-cover opacity-80"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeNiche === "campus" && (
              <div className="grid grid-cols-1 md:grid-cols-12 md:items-center gap-8 animate-fade-in-up">
                <div className="md:col-span-7 space-y-4">
                  <span className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${
                    theme === "light" 
                      ? "bg-rose-100 border-rose-250 text-rose-750" 
                      : "bg-rose-500/10 border-rose-500/20 text-rose-300"
                  }`}>
                    Campus & Student Bodies
                  </span>
                  <h3 className={`text-xl font-bold transition-colors duration-500 ${
                    theme === "light" ? "text-slate-900" : "text-white"
                  }`}>Organize Campus Rallies, Sports, & After-Parties</h3>
                  <p className={`text-xs leading-relaxed transition-colors duration-500 ${
                    theme === "light" ? "text-slate-600" : "text-slate-400"
                  }`}>
                    Student leaders run departmental events, athletic games, and exclusive parties on extreme budgets. Traditional platform fees eat 20-30% of their tight ticket pricing margins.
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-rose-500" />
                      <span className={theme === "light" ? "text-slate-700" : "text-slate-300"}><strong>Extreme low fees:</strong> Pay-per-ticket 2% ensures you keep maximum student ticket revenue.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-rose-500" />
                      <span className={theme === "light" ? "text-slate-700" : "text-slate-300"}><strong>Mobile-First Ticketing:</strong> Standard mobile browser checkout optimized for 58%+ mobile users.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-rose-500" />
                      <span className={theme === "light" ? "text-slate-700" : "text-slate-300"}><strong>Instant QR Deliveries:</strong> Tickets drop directly into student emails with clean scannable codes.</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5">
                  <div className={`overflow-hidden rounded-2xl border p-1 transition-colors duration-500 ${
                    theme === "light" ? "border-slate-200 bg-white" : "border-slate-800 bg-slate-950"
                  }`}>
                    <Image
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
                      alt="College student group gathering at campus event organized with Gathrio"
                      width={600}
                      height={400}
                      className="rounded-xl h-48 w-full object-cover opacity-80"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* STRATEGIC VS SECTION: TRADITIONAL PLATFORM PROBLEMS vs GATHRIO SOLUTIONS */}
        <section className="mt-32 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">The Hard Truth</h2>
            <p className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl transition-colors duration-500 ${
              theme === "light" ? "text-slate-900" : "text-white"
            }`}>
              Why Organizers are Actively Migrating
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* The Competitor Problem Card */}
            <div className={`rounded-3xl border p-6 sm:p-8 space-y-5 transition-all duration-300 hover:scale-[1.01] ${
              theme === "light" 
                ? "border-rose-200 bg-rose-50/50 shadow-sm" 
                : "border-rose-900/30 bg-rose-950/10"
            }`}>
              <h3 className="text-lg font-bold text-rose-500 flex items-center gap-2">
                <span>The Outdated Industry Norm</span>
              </h3>
              
              <ul className="space-y-4 text-xs">
                <li className="flex gap-3">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <p className={theme === "light" ? "text-slate-700" : "text-slate-350"}><strong>Compounding platform fee cuts:</strong> Organizers report losing up to 30% of ticket prices in combined platform/processing surcharges.</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <p className={theme === "light" ? "text-slate-700" : "text-slate-355"}><strong>Locked-up cash flow:</strong> Traditional platforms hold 100% of your payout funds until the event completely finishes, blocking vital operations capital.</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <p className={theme === "light" ? "text-slate-700" : "text-slate-355"}><strong>Impersonal support chatbots:</strong> Circular automated bot responses that fail to resolve checkout errors or critical pre-event crises.</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <p className={theme === "light" ? "text-slate-700" : "text-slate-355"}><strong>Host identity hijacking:</strong> The platform forces its own color codes, logo layouts, and spam event feeds on your attendees.</p>
                </li>
              </ul>
            </div>

            {/* The Gathrio Solution Card */}
            <div className={`rounded-3xl border p-6 sm:p-8 space-y-5 transition-all duration-300 hover:scale-[1.01] ${
              theme === "light" 
                ? "border-emerald-200 bg-emerald-50/50 shadow-sm" 
                : "border-emerald-900/30 bg-emerald-950/10"
            }`}>
              <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <span>The Gathrio Philosophy</span>
              </h3>
              
              <ul className="space-y-4 text-xs">
                <li className="flex gap-3">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  <p className={theme === "light" ? "text-slate-700" : "text-slate-300"}><strong>Low 2.0% pay-per-ticket model:</strong> Keep the majority of your hard-earned revenue. Free events are always, 100% free.</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  <p className={theme === "light" ? "text-slate-700" : "text-slate-300"}><strong>Immediate Stripe Connect payouts:</strong> Get paid continuously within 48 hours as attendees purchase tickets. Stay highly liquid.</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  <p className={theme === "light" ? "text-slate-700" : "text-slate-300"}><strong>Direct founder assistance:</strong> Instant access to our support group on WhatsApp. Real humans resolving your issues fast.</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  <p className={theme === "light" ? "text-slate-700" : "text-slate-300"}><strong>Total branding autonomy:</strong> Apply your logos, custom accent properties, and highlight your community identity cleanly.</p>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* TRANSPARENT PRICING SECTION */}
        <section id="pricing" className="mt-32 border-t border-slate-200 dark:border-slate-900 pt-32 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">Radically Transparent Pricing</h2>
            <p className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl transition-colors duration-500 ${
              theme === "light" ? "text-slate-900" : "text-white"
            }`}>
              Pay As You Earn. No Upfront Subscriptions.
            </p>
            <p className={`mt-4 text-xs sm:text-sm transition-colors duration-500 ${
              theme === "light" ? "text-slate-650" : "text-slate-400"
            }`}>
              We ditch complex tiered plans and subscription models. We only earn when you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            
            {/* Free tier */}
            <div className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
              theme === "light" 
                ? "border-slate-200 bg-white shadow-sm" 
                : "border-slate-900 bg-[#090b1a]/40"
            }`}>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">Free Gatherings</span>
                <h4 className={`text-xl font-bold mt-1 transition-colors duration-500 ${theme === "light" ? "text-slate-900" : "text-white"}`}>Community Announcements</h4>
                <p className="text-xs text-slate-500 mt-2">Perfect for church announcements, free school rallies, and public community updates.</p>
                
                <div className="mt-6 border-t border-slate-200 dark:border-slate-900/60 pt-6">
                  <span className={`text-4xl font-extrabold transition-colors duration-500 ${theme === "light" ? "text-slate-900" : "text-white"}`}>₦0</span>
                  <span className="text-xs text-slate-500 font-medium"> / ticket</span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-slate-500">
                  <Check size={14} className="text-violet-500" />
                  <span className={theme === "light" ? "text-slate-700" : "text-slate-350"}>Unlimited event pages</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-500">
                  <Check size={14} className="text-violet-500" />
                  <span className={theme === "light" ? "text-slate-700" : "text-slate-350"}>Custom colors and logos</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-500">
                  <Check size={14} className="text-violet-500" />
                  <span className={theme === "light" ? "text-slate-700" : "text-slate-350"}>Email ticket deliveries</span>
                </div>
                <Link
                  href="/signup"
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-xl border px-4 py-2.5 text-xs font-bold transition hover:bg-slate-50 ${
                    theme === "light" 
                      ? "border-slate-200 bg-white text-slate-700" 
                      : "border-slate-800 bg-slate-950 text-white"
                  }`}
                >
                  Create Free Event
                </Link>
              </div>
            </div>

            {/* Paid tier (Highlighted) */}
            <div className={`rounded-2xl border p-6 flex flex-col justify-between relative transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
              theme === "light" 
                ? "border-violet-300 bg-gradient-to-b from-[#f3f4ff] to-[#ffffff] shadow-md shadow-violet-500/5" 
                : "border-violet-500/20 bg-gradient-to-b from-[#0e112d] to-[#080a1a] shadow-xl shadow-violet-950/10"
            }`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-3.5 py-1 text-[9px] font-extrabold text-white uppercase tracking-widest">
                Recommended
              </div>

              <div>
                <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${theme === "light" ? "text-violet-600" : "text-violet-300"}`}>Paid Events</span>
                <h4 className={`text-xl font-bold mt-1 transition-colors duration-500 ${theme === "light" ? "text-slate-900" : "text-white"}`}>Paid Ticketing Engine</h4>
                <p className={`text-xs mt-2 ${theme === "light" ? "text-slate-600" : "text-slate-400"}`}>Host concerts, training workshops, summits, or comedy shows. Pass fees to the attendee.</p>
                
                <div className="mt-6 border-t border-slate-200 dark:border-slate-900/60 pt-6">
                  <span className={`text-4xl font-extrabold transition-colors duration-500 ${theme === "light" ? "text-slate-900" : "text-white"}`}>2.0%</span>
                  <span className={`text-xs font-medium ${theme === "light" ? "text-slate-650" : "text-slate-400"}`}> / ticket platform cut</span>
                  <p className="text-[9px] text-slate-500 mt-1">Plus standard Stripe Connect processing (~2.9% + ₦0.30)</p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-slate-500">
                  <Check size={14} className="text-violet-500" />
                  <span className={theme === "light" ? "text-slate-700" : "text-slate-200"}>Immediate payouts (T+2 Days)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-500">
                  <Check size={14} className="text-violet-500" />
                  <span className={theme === "light" ? "text-slate-700" : "text-slate-200"}>Custom colors, branding and logo</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-500">
                  <Check size={14} className="text-violet-500" />
                  <span className={theme === "light" ? "text-slate-700" : "text-slate-200"}>PDF ticket generation with QR</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-500">
                  <Check size={14} className="text-violet-500" />
                  <span className={theme === "light" ? "text-slate-700" : "text-slate-200"}>Direct founder WhatsApp line</span>
                </div>
                <Link
                  href="/signup"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-violet-500 transition shadow-lg shadow-violet-500/20"
                >
                  Get Started Now
                </Link>
              </div>
            </div>

            {/* Passcode private tier */}
            <div className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
              theme === "light" 
                ? "border-slate-200 bg-white shadow-sm" 
                : "border-slate-900 bg-[#090b1a]/40"
            }`}>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">Private Access</span>
                <h4 className={`text-xl font-bold mt-1 transition-colors duration-500 ${theme === "light" ? "text-slate-900" : "text-white"}`}>Passcode-Protected Tiers</h4>
                <p className="text-xs text-slate-500 mt-2">Invite-only conferences, VIP retreats, security-gated corporate sessions.</p>
                
                <div className="mt-6 border-t border-slate-200 dark:border-slate-900/60 pt-6">
                  <span className={`text-4xl font-extrabold transition-colors duration-500 ${theme === "light" ? "text-slate-900" : "text-white"}`}>2.0%</span>
                  <span className="text-xs text-slate-500 font-medium"> / ticket (same as paid)</span>
                  <p className="text-[9px] text-slate-500 mt-1">Gathrio charges no extra setup fees for private passcode protection.</p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-slate-500">
                  <Check size={14} className="text-violet-500" />
                  <span className={theme === "light" ? "text-slate-700" : "text-slate-350"}>Bcrypt-hashed passcode security</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-500">
                  <Check size={14} className="text-violet-500" />
                  <span className={theme === "light" ? "text-slate-700" : "text-slate-350"}>Fully locked event page layouts</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-500">
                  <Check size={14} className="text-violet-500" />
                  <span className={theme === "light" ? "text-slate-700" : "text-slate-350"}>Guest entry scanning at gate</span>
                </div>
                <Link
                  href="/signup"
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-xl border px-4 py-2.5 text-xs font-bold transition hover:bg-slate-50 ${
                    theme === "light" 
                      ? "border-slate-200 bg-white text-slate-700" 
                      : "border-slate-800 bg-slate-950 text-white"
                  }`}
                >
                  Create Private Event
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="mt-32 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <div className="text-center mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">Frequently Asked Questions</h2>
            <p className={`mt-3 text-3xl font-extrabold tracking-tight transition-colors duration-500 ${
              theme === "light" ? "text-slate-900" : "text-white"
            }`}>
              Everything You Need to Know
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Why are Gathrio&apos;s fees so much lower than typical ticketing platforms?",
                a: "Established ticketing platforms have immense corporate overhead, marketing expenses, and complex legacy structures. Gathrio is designed as a lean, hyper-efficient ticketing machine for solo developers and direct community hosts. We pass those savings directly back to you."
              },
              {
                q: "How exactly do immediate payouts work?",
                a: "We integrate directly with Stripe Connect Standard or Express. When an attendee purchases a ticket, the payment goes to Gathrio&apos;s Stripe account. Gathrio immediately deducts the 2.0% platform fee and triggers a Stripe transfer to your connected bank account (usually landing within 2 business days). No holding funds until the event is finished!"
              },
              {
                q: "What makes Gathrio passcode-protected events different?",
                a: "Major event directories force all events to be public for search reasons. Gathrio lets you toggle 'Passcode Protected'. When enabled, the attendee must type a bcrypt-gated passcode to even see the event details or purchase tickets. This is perfect for private corporate briefings, members-only church retreats, or exclusive student parties."
              },
              {
                q: "Do I have to pay a monthly subscription fee?",
                a: "No! There are absolutely no monthly subscription charges or listing fees. You can list unlimited free events for free. For paid events, we only take a 2% cut per ticket sold. If you don&apos;t sell any tickets, you pay nothing."
              },
              {
                q: "What support channels do you offer?",
                a: "We offer a direct WhatsApp Business line (+2348137225526) and active support email (hello@gathrio.com). Because we are in the MVP stage, you will get assistance directly from the founding developers — not a useless automated AI chatbot."
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border p-5 space-y-2 transition-all duration-300 hover:scale-[1.005] ${
                  theme === "light" 
                    ? "border-slate-200/80 bg-white hover:border-slate-350 hover:shadow-sm" 
                    : "border-slate-900 bg-slate-950/40 hover:border-slate-800"
                }`}
              >
                <h4 className={`text-sm font-bold flex items-center gap-2 transition-colors duration-500 ${
                  theme === "light" ? "text-slate-900" : "text-white"
                }`}>
                  <HelpCircle size={14} className="text-violet-500 flex-shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: item.q }} />
                </h4>
                <p className={`text-xs leading-relaxed pl-6 transition-colors duration-500 ${
                  theme === "light" ? "text-slate-600" : "text-slate-400"
                }`} dangerouslySetInnerHTML={{ __html: item.a }} />
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM FINAL CALL TO ACTION (CTA) */}
        <section className="mt-32 rounded-3xl bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-950 p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-violet-500/20 text-center sm:text-left animate-fade-in-up" style={{ animationDelay: "0.55s" }}>
          
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-violet-500/10 blur-[100px] -z-10" />
          
          <div className="sm:grid sm:grid-cols-12 sm:items-center sm:gap-8">
            <div className="sm:col-span-8 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-violet-300 font-mono">Ready to get started?</span>
              <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl">
                Reclaim Your Event Revenue & Cash Flow Today.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Create branded pages, configure private passcodes, accept Stripe payments, and access direct founder WhatsApp support in under 10 minutes.
              </p>
            </div>

            <div className="mt-6 sm:mt-0 sm:col-span-4 flex flex-col gap-2.5">
              <Link
                href="/signup"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-950 transition hover:bg-slate-100 hover:scale-[1.01] shadow-lg shadow-black/20"
              >
                Create Account Free
              </Link>
              
              <a
                href="https://wa.me/2348137225526"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <Phone size={14} /> WhatsApp Founder
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className={`border-t transition-colors duration-500 px-4 py-16 text-slate-400 sm:px-6 lg:px-8 ${
        theme === "light" ? "border-slate-200 bg-slate-50 text-slate-500" : "border-slate-900 bg-[#04050b]"
      }`}>
        <div className="mx-auto w-full max-w-7xl">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Logo and Tagline */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <Image
                    src="/gathrio-icon-color.png"
                    alt="gathrio"
                    width={40}
                    height={40}
                 />
                <span className={`text-sm font-semibold tracking-wider transition-colors duration-500 ${theme === "light" ? "text-slate-900" : "text-white"}`}>
                  GATHRIO
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-500 max-w-sm">
                The events booking, ticketing, and operations platform that puts organizers first. Direct Stripe Connect payouts, bcrypt private page passcodes, and customized white-labeled branding profiles.
              </p>
              
              <div className="space-y-2 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-violet-500" />
                  <span className={theme === "light" ? "text-slate-600" : "text-slate-400"}>hello@gathrio.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-violet-500" />
                  <span className={theme === "light" ? "text-slate-600" : "text-slate-400"}>+2348137225526</span>
                </div>
              </div>
            </div>

            {/* Quick links columns */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
              
              <div className="space-y-3.5">
                <h5 className={`text-xs font-bold uppercase tracking-wider transition-colors duration-500 ${theme === "light" ? "text-slate-800" : "text-white"}`}>Product</h5>
                <ul className="space-y-2 text-xs">
                  <li><a href="#features" className={`hover:text-violet-600 dark:hover:text-white transition ${theme === "light" ? "text-slate-550" : "text-slate-400"}`}>Features</a></li>
                  <li><a href="#demo" className={`hover:text-violet-600 dark:hover:text-white transition ${theme === "light" ? "text-slate-550" : "text-slate-400"}`}>Interactive Demo</a></li>
                  <li><a href="#calculator" className={`hover:text-violet-600 dark:hover:text-white transition ${theme === "light" ? "text-slate-550" : "text-slate-400"}`}>Savings Calc</a></li>
                  <li><a href="#pricing" className={`hover:text-violet-600 dark:hover:text-white transition ${theme === "light" ? "text-slate-550" : "text-slate-400"}`}>Pricing</a></li>
                </ul>
              </div>

              <div className="space-y-3.5">
                <h5 className={`text-xs font-bold uppercase tracking-wider transition-colors duration-500 ${theme === "light" ? "text-slate-800" : "text-white"}`}>Legal & Terms</h5>
                <ul className="space-y-2 text-xs">
                  <li><Link href="/terms" className={`hover:text-violet-600 dark:hover:text-white transition ${theme === "light" ? "text-slate-550" : "text-slate-400"}`}>Terms of Service</Link></li>
                  <li><Link href="/privacy" className={`hover:text-violet-600 dark:hover:text-white transition ${theme === "light" ? "text-slate-550" : "text-slate-400"}`}>Privacy Policy</Link></li>
                  <li><Link href="/refunds" className={`hover:text-violet-600 dark:hover:text-white transition ${theme === "light" ? "text-slate-550" : "text-slate-400"}`}>Refund Policy</Link></li>
                </ul>
              </div>

              <div className="space-y-3.5 col-span-2 sm:col-span-1">
                <h5 className={`text-xs font-bold uppercase tracking-wider transition-colors duration-500 ${theme === "light" ? "text-slate-800" : "text-white"}`}>Get Started</h5>
                <ul className="space-y-2 text-xs">
                  <li><Link href="/signup" className={`hover:text-violet-600 dark:hover:text-white transition ${theme === "light" ? "text-slate-550" : "text-slate-400"}`}>Create Account</Link></li>
                  <li><Link href="/signin" className={`hover:text-violet-600 dark:hover:text-white transition ${theme === "light" ? "text-slate-550" : "text-slate-400"}`}>Sign In</Link></li>
                  <li><Link href="/events" className={`hover:text-violet-600 dark:hover:text-white transition ${theme === "light" ? "text-slate-550" : "text-slate-400"}`}>Browse Events</Link></li>
                </ul>
              </div>

            </div>
          </div>

          <div className="mt-12 border-t border-slate-200 dark:border-slate-900/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-400 dark:text-slate-650">
            <p>© {new Date().getFullYear()} Gathrio. All rights reserved. Developed with purpose.</p>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-emerald-500/80" />
              <span>Directly powered by Stripe and Stripe Connect.</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}