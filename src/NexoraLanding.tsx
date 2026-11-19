"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  ShieldCheck,
  Wallet,
  CreditCard,
  ChartNoAxesCombined,
  Globe2,
  LockKeyhole,
  Eye,
  EyeOff,
  Landmark,
  Sparkles,
  CircleDollarSign,
  MoveUpRight,
  Menu,
  X,
  Check,
} from "lucide-react";

type Props = {
  /** Pass the existing NEXORA dashboard here so successful demo login opens it. */
  dashboard?: React.ReactNode;
  /** Optional callback for your existing auth/router integration. */
  onLogin?: (email: string, password: string) => void | Promise<void>;
  /** Optional callback when the user logs out of the demo dashboard. */
  onLogout?: () => void;
};

const DEMO_EMAIL = "demo@nexorabank.com";
const DEMO_PASSWORD = "Nexora@123";
const ease = [0.22, 1, 0.36, 1] as const;

function GrainOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-soft-light" aria-hidden="true">
      <svg className="h-full w-full">
        <filter id="nexora-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#nexora-grain)" />
      </svg>
    </div>
  );
}

function RevealText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.span className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.012 } } }}>
      {text.split("").map((char, index) => (
        <motion.span key={`${char}-${index}`} className="inline-block" variants={{ hidden: { opacity: 0, y: 16, filter: "blur(4px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease } } }} style={{ whiteSpace: char === " " ? "pre" : undefined }}>
          {char === " " ? "\u00a0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function Blob({ className = "" }: { className?: string }) {
  return <div className={`pointer-events-none absolute rounded-full bg-[#D97726]/15 blur-[90px] animate-pulse ${className}`} />;
}

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-xl border border-[#E89A54]/40 bg-gradient-to-br from-[#F39A43] to-[#9C4B1C] shadow-[0_5px_24px_rgba(217,119,38,.2)]">
        <Landmark size={18} className="text-[#1A0D07]" strokeWidth={2.2} />
      </div>
      <div className="leading-none">
        <div className={`text-[15px] font-semibold tracking-[0.19em] ${light ? "text-[#FFF3E8]" : "text-[#2A170E]"}`}>NEXORA</div>
        <div className={`mt-1 text-[8px] tracking-[0.28em] ${light ? "text-[#C5A58E]" : "text-[#8C6045]"}`}>BANKING BEYOND BOUNDARIES</div>
      </div>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="group relative py-2 text-[13px] font-medium text-[#D7C1B0] transition-all duration-300 hover:text-[#F3A45B] hover:[text-shadow:0_0_14px_rgba(243,154,67,.55)]">
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#F39A43] shadow-[0_0_10px_#F39A43] transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

function Navbar({ onLogin, authenticated, onDashboard }: { onLogin: () => void; authenticated: boolean; onDashboard: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease }}
      className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.06] bg-[#100905]/75 px-5 py-4 backdrop-blur-xl md:px-12"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#top" aria-label="NEXORA home"><BrandMark light /></a>
        <nav className="hidden items-center gap-9 md:flex">
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#intelligence">Intelligence</NavLink>
          <NavLink href="#security">Security</NavLink>
          <NavLink href="#about">About</NavLink>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {authenticated ? (
            <span className="rounded-full border border-[#D97726]/35 bg-[#1B100A] px-4 py-2 text-[12px] text-[#FFF0E3] shadow-[0_0_18px_rgba(217,119,38,.12)]">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.8)]" />Tushar Gupta
            </span>
          ) : (
            <button onClick={onLogin} className="group inline-flex items-center gap-2 rounded-full border border-[#D97726]/70 bg-[#080604] px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:border-[#F39A43] hover:bg-[#D97726] hover:text-white hover:shadow-[0_0_24px_rgba(243,154,67,.38)]">
              Login <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          )}
        </div>
        <button className="text-[#F4E8DE] md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden md:hidden">
            <div className="flex flex-col gap-4 px-1 pb-3 pt-6">
              {["Experience", "Intelligence", "Security", "About"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="text-sm text-[#E7D2C2]">{item}</a>
              ))}
              {authenticated && <div className="text-xs text-[#F0B17D]">Signed in as <b className="text-white">Tushar Gupta</b></div>}
              <button onClick={() => { setOpen(false); authenticated ? onDashboard() : onLogin(); }} className="mt-1 rounded-full bg-[#080604] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D97726] hover:shadow-[0_0_22px_rgba(243,154,67,.35)]">{authenticated ? "Go to dashboard" : "Login"} <ArrowUpRight className="ml-1 inline" size={15} /></button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero({ onLogin, authenticated, onDashboard }: { onLogin: () => void; authenticated: boolean; onDashboard: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 650], [0, 105]);
  const cardY = useTransform(scrollY, [0, 650], [0, -85]);
  return (
    <section id="top" ref={ref} className="relative flex min-h-[760px] items-center overflow-hidden bg-[#100905] px-5 pb-24 pt-32 text-[#FFF3E8] md:min-h-[850px] md:px-12">
      <Blob className="-right-28 -top-32 h-[520px] w-[520px]" />
      <Blob className="-bottom-36 left-[20%] h-[440px] w-[440px] bg-[#8C421B]/20" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8 }} className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-[#D97726]" />
            <span className="text-[10px] font-semibold tracking-[0.28em] text-[#E5A16D]">A NEW STANDARD IN DIGITAL BANKING</span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }} className="max-w-4xl font-serif text-[clamp(3.7rem,8vw,7.8rem)] leading-[0.98] tracking-[-0.055em]">
            {["Banking", "beyond", "boundaries."].map((word, i) => (
              <div key={word} className="overflow-hidden pb-2">
                <motion.span variants={{ hidden: { y: "110%", opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1.05, ease } } }} className={`inline-block ${i === 2 ? "italic text-[#E78A3C]" : "text-[#FFF3E8]"}`}>{word}</motion.span>
              </div>
            ))}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.85 }} className="mt-8 max-w-lg text-base leading-8 text-[#C4A995] md:text-lg">
            A more considered way to move, manage and understand your money. Experience a smarter digital banking ecosystem, designed around you.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.8 }} className="mt-10 flex flex-wrap items-center gap-5">
            <button onClick={authenticated ? onDashboard : onLogin} className="group inline-flex items-center gap-8 rounded-full border border-[#D97726]/70 bg-[#080604] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#F39A43] hover:bg-[#D97726] hover:text-white hover:shadow-[0_0_30px_rgba(243,154,67,.42)]">
              {authenticated ? "Go to dashboard" : "Login to NEXORA"} <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
            <a href="#experience" className="inline-flex items-center gap-2 text-sm text-[#D7C1B0] transition-colors hover:text-[#F39A43]">Explore the experience <ArrowDown size={15} /></a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="mt-16 flex flex-wrap gap-x-9 gap-y-4 border-t border-white/10 pt-7">
            {[["01", "Thoughtful design"], ["02", "Intelligent insights"], ["03", "Security first"]].map(([n, label]) => (
              <div key={n} className="flex items-center gap-3"><span className="text-[10px] text-[#D97726]">{n}</span><span className="text-[11px] tracking-wide text-[#9F8572]">{label}</span></div>
            ))}
          </motion.div>
        </div>
        <div className="relative min-h-[460px] lg:col-span-5 lg:min-h-[650px]">
          <motion.div style={{ y: imageY }} initial={{ opacity: 0, scale: 1.08, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.5, ease }} className="absolute inset-x-0 top-2 bottom-5 overflow-hidden rounded-[2rem] border border-[#A65E2D]/40 bg-[radial-gradient(circle_at_65%_22%,rgba(226,132,57,.25),transparent_38%),linear-gradient(145deg,#382014,#160D08_65%)] shadow-[0_30px_100px_rgba(0,0,0,.4)]">
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(231,138,60,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(231,138,60,.09) 1px,transparent 1px)", backgroundSize: "48px 48px", maskImage: "linear-gradient(to bottom,black,transparent)" }} />
            <div className="absolute left-1/2 top-[42%] h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E58B43]/25" />
            <div className="absolute left-1/2 top-[42%] h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E58B43]/20" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-[42%] h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#E58B43]/25">
              <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F39A43] shadow-[0_0_25px_#F39A43]" />
            </motion.div>
            <div className="absolute left-1/2 top-[42%] flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[2rem] border border-[#F0A05C]/40 bg-[#24140B]/85 shadow-[0_0_90px_rgba(217,119,38,.17)] backdrop-blur-xl">
              <Landmark size={37} className="text-[#F39A43]" />
              <span className="mt-3 text-[10px] font-semibold tracking-[0.28em] text-[#E9B68F]">NEXORA</span>
            </div>
            <motion.div style={{ y: cardY }} className="absolute bottom-7 left-5 right-5 rounded-2xl border border-[#D58A51]/30 bg-[#1A100B]/80 p-5 backdrop-blur-xl md:left-8 md:right-8">
              <div className="flex items-center justify-between">
                <span className="text-[9px] tracking-[0.2em] text-[#B99A83]">NEXORA PRIVATE BANKING</span>
                <Sparkles size={16} className="text-[#E78A3C]" />
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div><div className="text-xs text-[#B99A83]">A clearer view of your money</div><div className="mt-1 font-serif text-2xl text-[#FFF0E2]">Made for your next.</div></div>
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#D97726] text-[#1B0D06]"><ArrowUpRight size={18} /></div>
              </div>
            </motion.div>
            <div className="absolute right-6 top-7 text-[9px] tracking-[0.24em] text-[#B78B6B]">EST. FOR WHAT'S NEXT</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30, y: 30 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 1.05, duration: 1, ease }} className="absolute -left-3 top-[17%] hidden rounded-2xl border border-[#A75D2E]/40 bg-[#24150D]/90 p-4 shadow-2xl backdrop-blur-xl sm:block lg:-left-12">
            <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#D97726]/15 text-[#F39A43]"><ShieldCheck size={18} /></div><div><div className="text-xs font-semibold text-[#F8E9DD]">Security, always</div><div className="mt-1 text-[10px] text-[#A98B75]">Built around your peace of mind</div></div></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20, y: 30 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 1.2, duration: 1, ease }} className="absolute -right-2 top-[65%] hidden rounded-2xl border border-[#A75D2E]/40 bg-[#24150D]/90 p-4 shadow-2xl backdrop-blur-xl sm:block lg:-right-8">
            <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#D97726]/15 text-[#F39A43]"><ChartNoAxesCombined size={18} /></div><div><div className="text-xs font-semibold text-[#F8E9DD]">Insights that matter</div><div className="mt-1 text-[10px] text-[#A98B75]">Your finances, in perspective</div></div></div>
          </motion.div>
        </div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[#94745D]">
        <span className="text-[9px] tracking-[0.3em]">SCROLL TO DISCOVER</span><ArrowDown size={14} className="animate-bounce" />
      </motion.div>
    </section>
  );
}

function Statement() {
  return (
    <section className="bg-[#F2E7DC] px-5 py-20 text-center text-[#2A170E] md:px-12 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-[10px] font-semibold tracking-[0.3em] text-[#A65A2C]">A DIFFERENT KIND OF BANKING</div>
        <h2 className="font-serif text-3xl leading-[1.25] tracking-tight md:text-6xl">
          <RevealText text="Money is more than a balance. It's possibility, momentum, and the freedom to move forward." />
        </h2>
        <motion.div initial={{ height: 0 }} whileInView={{ height: 76 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="mx-auto mt-12 w-px bg-[#A65A2C]/50" />
      </div>
    </section>
  );
}

function Marquee() {
  const phrase = "CLARITY • CONTROL • CONFIDENCE • NEXORA • ";
  return (
    <div className="overflow-hidden bg-[#4A2817] py-5">
      <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="flex w-max whitespace-nowrap">
        {Array.from({ length: 6 }).map((_, i) => <span key={i} className="px-4 font-serif text-3xl italic tracking-wide text-[#F6D5B7]/55 md:text-5xl">{phrase}</span>)}
      </motion.div>
    </div>
  );
}


function FeatureRail() {
  const items = [
    { icon: <Wallet size={18} />, label: "One clear view", detail: "Accounts and balances together" },
    { icon: <CreditCard size={18} />, label: "Cards in control", detail: "Freeze, manage and monitor" },
    { icon: <ChartNoAxesCombined size={18} />, label: "Smarter insights", detail: "Understand spending patterns" },
    { icon: <ShieldCheck size={18} />, label: "Security first", detail: "Stay aware of account activity" },
  ];
  return (
    <section className="relative overflow-hidden border-y border-[#85502F]/30 bg-[#21130B] px-5 py-10 md:px-12 md:py-12">
      <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.65, ease }} whileHover={{ y: -5, borderColor: "rgba(243,154,67,.65)" }} className="flex items-center gap-4 rounded-2xl border border-[#85502F]/30 bg-[#160C07]/75 p-5 transition-shadow hover:shadow-[0_0_25px_rgba(217,119,38,.13)]">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#D97726]/15 text-[#F39A43]">{item.icon}</div>
            <div><div className="text-sm font-semibold text-[#F8E9DD]">{item.label}</div><div className="mt-1 text-[11px] text-[#A98B75]">{item.detail}</div></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const capabilities = [
  { n: "01", title: "See the whole picture.", label: "FINANCIAL CLARITY", desc: "Bring accounts, activity and spending insights into one considered view.", icon: <ChartNoAxesCombined size={23} /> },
  { n: "02", title: "Move with confidence.", label: "EFFORTLESS PAYMENTS", desc: "A simpler way to manage beneficiaries, payments and transfers.", icon: <MoveUpRight size={23} /> },
  { n: "03", title: "Stay in control.", label: "CARD & ACCOUNT CONTROL", desc: "Manage cards, preferences and account security from one place.", icon: <CreditCard size={23} /> },
];

function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [70, -65]);
  const yB = useTransform(scrollYProgress, [0, 1], [-35, 60]);
  return (
    <section id="experience" ref={sectionRef} className="relative overflow-hidden bg-[#160C07] px-5 py-28 text-[#FFF3E8] md:px-12 md:py-36">
      <Blob className="-left-48 top-20 h-[400px] w-[400px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
          <div><div className="mb-5 text-[10px] tracking-[0.3em] text-[#D97726]">THE NEXORA EXPERIENCE</div><h2 className="font-serif text-5xl leading-tight md:text-7xl">Designed around<br /><span className="italic text-[#E78A3C]">your life.</span></h2></div>
          <p className="max-w-sm text-sm leading-7 text-[#B99A83]">Thoughtful tools and a clear perspective help make everyday money decisions feel more intuitive.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {capabilities.map((item, i) => (
            <motion.article key={item.n} style={{ y: i === 0 ? yA : i === 2 ? yB : undefined }} initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9, delay: i * 0.12, ease }} whileHover={{ y: -8 }} className={`group flex min-h-[370px] flex-col justify-between overflow-hidden rounded-[1.7rem] border border-[#86502E]/40 p-8 ${i === 1 ? "bg-[#4B2918]" : "bg-gradient-to-br from-[#2B190F] to-[#1A0E08]"}`}>
              <div className="flex items-center justify-between"><span className="text-[10px] tracking-[0.22em] text-[#C18B64]">{item.label}</span><span className="text-xs text-[#9D7559]">{item.n}</span></div>
              <div><div className="mb-8 grid h-14 w-14 place-items-center rounded-2xl border border-[#D97726]/30 bg-[#D97726]/10 text-[#F39A43] transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">{item.icon}</div><h3 className="font-serif text-3xl leading-tight text-[#FFF0E3]">{item.title}</h3><p className="mt-4 max-w-xs text-sm leading-6 text-[#C2A58E]">{item.desc}</p></div>
              <div className="flex items-center justify-between border-t border-white/10 pt-5 text-xs text-[#C18B64]"><span>Explore what’s possible</span><ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Intelligence() {
  const bars = [22, 34, 28, 43, 38, 55, 48, 62, 54, 72, 64, 83, 70, 92, 78, 100];
  return (
    <section id="intelligence" className="overflow-hidden bg-[#EDE0D4] px-5 py-28 text-[#2A170E] md:px-12 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div>
          <div className="mb-5 text-[10px] font-semibold tracking-[0.3em] text-[#A65A2C]">NEXORA INTELLIGENCE</div>
          <h2 className="font-serif text-5xl leading-[1.08] md:text-7xl">Your money,<br /><span className="italic text-[#B45E26]">in perspective.</span></h2>
          <p className="mt-8 max-w-md text-base leading-8 text-[#765640]">Understand the patterns behind your money. Explore spending, track progress and make more informed decisions with a clearer financial picture.</p>
          <div className="mt-10 space-y-4">
            {["A considered view of your spending", "Savings goals and progress tracking", "Activity that’s easier to understand"].map((text) => <div key={text} className="flex items-center gap-3 text-sm text-[#513321]"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#D97726]/15 text-[#A65320]"><Check size={13} /></span>{text}</div>)}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 50, rotate: 2 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease }} className="relative mx-auto w-full max-w-[560px]">
          <div className="absolute -inset-8 rounded-[3rem] bg-[#D97726]/10 blur-3xl" />
          <div className="relative rounded-[2rem] border border-[#A65A2C]/20 bg-[#1B100A] p-6 text-[#FFF0E3] shadow-[0_35px_90px_rgba(65,34,17,.22)] md:p-8">
            <div className="flex items-center justify-between"><div><div className="text-[10px] tracking-[0.22em] text-[#B99A83]">FINANCIAL OVERVIEW</div><div className="mt-2 text-lg font-semibold">Your money at a glance</div></div><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#D97726]/15 text-[#E78A3C]"><Sparkles size={19} /></div></div>
            <div className="mt-9 rounded-2xl border border-white/10 bg-white/[0.035] p-5"><div className="text-xs text-[#B99A83]">Monthly spending</div><div className="mt-2 flex items-end justify-between"><div className="font-serif text-3xl">₹28,450</div><div className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] text-emerald-300">↓ 8.4% vs last month</div></div><div className="mt-7 flex h-32 items-end gap-2">{bars.map((h, i) => <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.035, ease }} className={`flex-1 rounded-t-md ${i === 13 ? "bg-[#F39A43]" : "bg-[#85502F]"}`} />)}</div><div className="mt-3 flex justify-between text-[9px] tracking-widest text-[#967A64]"><span>WEEK 01</span><span>WEEK 02</span><span>WEEK 03</span><span>WEEK 04</span></div></div>
            <div className="mt-4 grid grid-cols-2 gap-4"><div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><div className="text-[10px] text-[#B99A83]">Savings progress</div><div className="mt-2 text-xl">72%</div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[72%] rounded-full bg-[#E78A3C]" /></div></div><div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><div className="text-[10px] text-[#B99A83]">Monthly insight</div><div className="mt-2 text-sm text-[#F1C49F]">You’re building better habits.</div><div className="mt-1 text-[10px] text-[#967A64]">Illustrative demo data</div></div></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Security() {
  return (
    <section id="security" className="relative overflow-hidden bg-[#100905] px-5 py-28 text-[#FFF3E8] md:px-12 md:py-36">
      <Blob className="-right-32 top-0 h-[450px] w-[450px]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7"><div className="mb-5 text-[10px] tracking-[0.3em] text-[#D97726]">SECURITY IS NOT AN AFTERTHOUGHT</div><h2 className="font-serif text-5xl leading-tight md:text-7xl">Confidence in<br /><span className="italic text-[#E78A3C]">every move.</span></h2><p className="mt-8 max-w-lg text-base leading-8 text-[#B99A83]">Explore security-minded controls and clear activity visibility, designed to help you stay informed and in control of your simulated banking experience.</p></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
          {[{ icon: <ShieldCheck />, title: "Security controls", text: "Manage account and card controls." }, { icon: <LockKeyhole />, title: "Access awareness", text: "Review sessions and account activity." }, { icon: <CreditCard />, title: "Card management", text: "Freeze and configure demo cards." }, { icon: <Globe2 />, title: "Travel readiness", text: "Review international-use settings." }].map((item, i) => <motion.div key={item.title} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }} className="rounded-2xl border border-[#86502E]/35 bg-[#24140B]/70 p-6 backdrop-blur"><div className="mb-7 text-[#E78A3C]">{item.icon}</div><h3 className="text-sm font-semibold">{item.title}</h3><p className="mt-2 text-xs leading-5 text-[#A98B75]">{item.text}</p></motion.div>)}
        </div>
      </div>
    </section>
  );
}

function Footer({ onLogin, authenticated, onDashboard }: { onLogin: () => void; authenticated: boolean; onDashboard: () => void }) {
  return (
    <footer id="about" className="relative overflow-hidden bg-[#3A2013] px-5 py-24 text-center text-[#FFF0E3] md:px-12">
      <Blob className="-left-28 -top-36 h-[400px] w-[400px] bg-[#E18A3B]/20" />
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-8 text-[10px] tracking-[0.3em] text-[#E7A36F]">YOUR NEXT CHAPTER STARTS HERE</div>
        <h2 className="font-serif text-5xl leading-none md:text-8xl">Move forward.<br /><span className="italic text-[#F0A15C]">With NEXORA.</span></h2>
        <p className="mx-auto mt-8 max-w-lg text-sm leading-7 text-[#D1B49D]">A clearer, more considered digital banking experience is just one step away.</p>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={authenticated ? onDashboard : onLogin} className="mt-10 inline-flex items-center gap-8 rounded-full border border-[#D97726]/60 bg-[#080604] px-8 py-4 text-sm font-bold text-white transition-all hover:border-[#F39A43] hover:bg-[#D97726] hover:text-white hover:shadow-[0_0_30px_rgba(243,154,67,.4)]">{authenticated ? "Go to dashboard" : "Login to NEXORA"} <ArrowUpRight size={17} /></motion.button>
      </div>
      <div className="relative mx-auto mt-24 flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/15 pt-7 text-[10px] text-[#C4A18A] md:flex-row md:text-left"><BrandMark light /><span>© {new Date().getFullYear()} NEXORA BANK. Simulated banking experience.</span><span>Banking beyond boundaries.</span></div>
    </footer>
  );
}

function LoginScreen({ onClose, onSuccess }: { onClose: () => void; onSuccess: (email: string, password: string) => Promise<void> }) {
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onSuccess(email.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[#090503]/90 px-4 py-8 backdrop-blur-xl">
      <motion.div initial={{ opacity: 0, y: 35, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }} transition={{ duration: 0.55, ease }} className="relative grid w-full max-w-4xl overflow-hidden rounded-[2rem] border border-[#9A5B34]/40 bg-[#1A100A] shadow-[0_35px_120px_rgba(0,0,0,.6)] md:grid-cols-2">
        <button onClick={onClose} aria-label="Close login" className="absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-[#D7C1B0] transition hover:bg-white/10"><X size={17} /></button>
        <div className="relative hidden min-h-[560px] flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_30%_25%,rgba(217,119,38,.28),transparent_40%),linear-gradient(145deg,#482717,#170D07_70%)] p-10 md:flex">
          <div className="absolute -right-24 top-20 h-80 w-80 rounded-full border border-[#E78A3C]/25" /><div className="absolute -right-12 top-32 h-56 w-56 rounded-full border border-[#E78A3C]/20" />
          <BrandMark light />
          <div className="relative"><div className="mb-5 text-[10px] tracking-[0.3em] text-[#E7A36F]">WELCOME BACK</div><h2 className="font-serif text-5xl leading-tight text-[#FFF0E3]">Your money.<br /><span className="italic text-[#E78A3C]">Your world.</span></h2><p className="mt-6 max-w-xs text-sm leading-7 text-[#C4A995]">Step into your NEXORA banking experience.</p></div>
          <div className="flex items-center gap-2 text-[10px] tracking-wider text-[#B99578]"><ShieldCheck size={14} className="text-[#E78A3C]" /> SECURE DEMO ENVIRONMENT</div>
        </div>
        <div className="p-7 pt-16 sm:p-10 md:pt-14">
          <div className="mb-8"><div className="mb-3 text-[10px] font-semibold tracking-[0.25em] text-[#D97726]">NEXORA BANK</div><h2 className="font-serif text-4xl text-[#FFF0E3]">Sign in</h2><p className="mt-2 text-sm text-[#A98B75]">Access your personal banking dashboard.</p></div>
          <form onSubmit={submit} className="space-y-5">
            <label className="block"><span className="mb-2 block text-xs font-medium text-[#D7C1B0]">Email address</span><input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-[#76503A] bg-[#100905] px-4 py-3.5 text-sm text-[#FFF0E3] outline-none transition placeholder:text-[#745B49] focus:border-[#D97726] focus:ring-2 focus:ring-[#D97726]/15" placeholder="you@example.com" /></label>
            <label className="block"><span className="mb-2 block text-xs font-medium text-[#D7C1B0]">Password</span><span className="relative block"><input type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-[#76503A] bg-[#100905] px-4 py-3.5 pr-12 text-sm text-[#FFF0E3] outline-none transition placeholder:text-[#745B49] focus:border-[#D97726] focus:ring-2 focus:ring-[#D97726]/15" placeholder="Enter your password" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A98B75] hover:text-[#F39A43]">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>
            {error && <div role="alert" className="rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-xs text-red-200">{error}</div>}
            <button disabled={loading} type="submit" className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#F39A43] to-[#D97726] px-5 py-4 text-sm font-bold text-[#1B0D06] shadow-[0_10px_30px_rgba(217,119,38,.18)] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60">{loading ? "Signing in..." : "Login to dashboard"} <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></button>
          </form>
          <div className="my-6 flex items-center gap-3"><div className="h-px flex-1 bg-white/10" /><span className="text-[9px] tracking-[0.2em] text-[#806651]">OR USE DEMO ACCESS</span><div className="h-px flex-1 bg-white/10" /></div>
          <div className="rounded-xl border border-[#9A5B34]/35 bg-[#26170F] p-4"><div className="mb-3 flex items-center justify-between"><span className="text-xs font-semibold text-[#F2DCCB]">Demo account</span><span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[9px] text-emerald-300">READY</span></div><div className="space-y-2 text-[11px] text-[#B99A83]"><div className="flex justify-between gap-3"><span>Email</span><button type="button" onClick={() => setEmail(DEMO_EMAIL)} className="text-right text-[#F0B17D]">{DEMO_EMAIL}</button></div><div className="flex justify-between gap-3"><span>Password</span><button type="button" onClick={() => setPassword(DEMO_PASSWORD)} className="text-right text-[#F0B17D]">••••••••••••</button></div></div><button type="button" onClick={() => { setEmail(DEMO_EMAIL); setPassword(DEMO_PASSWORD); }} className="mt-4 w-full rounded-lg border border-[#D97726]/40 py-2.5 text-xs font-semibold text-[#F0B17D] transition hover:bg-[#D97726]/10">Fill demo credentials</button></div>
          <p className="mt-5 text-center text-[10px] leading-5 text-[#806651]">Demo-only sign in. No real banking credentials or funds are used.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DemoDashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-[#100905] px-5 py-8 text-[#FFF0E3] md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6"><BrandMark light /><button onClick={onLogout} className="rounded-full border border-[#D97726]/50 px-5 py-2 text-xs text-[#F0B17D] hover:bg-[#D97726]/10">Sign out</button></div>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-5"><div><div className="text-xs tracking-[0.2em] text-[#D97726]">DEMO CUSTOMER DASHBOARD</div><h1 className="mt-3 font-serif text-5xl">Welcome back.</h1><p className="mt-3 text-sm text-[#A98B75]">You are signed in to the NEXORA demo environment.</p></div><div className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-300"><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" /> Demo session active</div></div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-[#9A5B34]/35 bg-gradient-to-br from-[#482717] to-[#1A100A] p-7 md:col-span-2"><div className="text-xs text-[#C5A58E]">TOTAL AVAILABLE BALANCE</div><div className="mt-4 font-serif text-5xl">₹8,45,250.00</div><div className="mt-6 flex flex-wrap gap-3 text-xs"><span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-emerald-300">+ 8.2% this month</span><span className="rounded-full bg-white/5 px-3 py-1.5 text-[#C5A58E]">Illustrative demo data</span></div></div>
          <div className="rounded-3xl border border-[#9A5B34]/35 bg-[#21130B] p-7"><div className="text-xs text-[#C5A58E]">PRIMARY SAVINGS</div><div className="mt-4 text-3xl">₹6,25,250</div><div className="mt-6 h-1.5 rounded-full bg-white/10"><div className="h-full w-[74%] rounded-full bg-[#E78A3C]" /></div><div className="mt-3 text-xs text-[#A98B75]">74% of your savings goal</div></div>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[{ icon: <Wallet />, title: "Accounts", desc: "View balances and account details" }, { icon: <CreditCard />, title: "My cards", desc: "Manage your virtual and physical cards" }, { icon: <MoveUpRight />, title: "Transfers", desc: "Review simulated transfers" }, { icon: <ChartNoAxesCombined />, title: "Insights", desc: "Explore your financial activity" }].map((item) => <div key={item.title} className="rounded-2xl border border-[#805034]/30 bg-[#1D110A] p-6"><div className="mb-5 text-[#E78A3C]">{item.icon}</div><div className="font-semibold">{item.title}</div><p className="mt-2 text-xs leading-5 text-[#A98B75]">{item.desc}</p></div>)}</div>
        <div className="mt-8 rounded-2xl border border-[#805034]/30 bg-[#1D110A] p-6 text-xs leading-6 text-[#A98B75]">This is a lightweight demo dashboard placeholder. To open your existing NEXORA banking dashboard after login, pass your current dashboard component to the <code className="text-[#F0B17D]">dashboard</code> prop.</div>
      </div>
    </div>
  );
}

export default function NexoraLanding({ dashboard, onLogin, onLogout }: Props) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const handleHome = () => setShowDashboard(false);
    window.addEventListener("nexora:home", handleHome);
    return () => window.removeEventListener("nexora:home", handleHome);
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      setAuthenticated(false);
      setShowDashboard(false);
      setLoginOpen(false);
    };
    window.addEventListener("nexora:logout", handleLogout);
    return () => window.removeEventListener("nexora:logout", handleLogout);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    if (onLogin) {
      await onLogin(email, password);
      setAuthenticated(true);
      setShowDashboard(true);
      setLoginOpen(false);
      return;
    }
    if (email.toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setAuthenticated(true);
      setShowDashboard(true);
      setLoginOpen(false);
      return;
    }
    throw new Error("Demo credentials don't match. Use demo@nexorabank.com and Nexora@123.");
  };

  if (authenticated && showDashboard) {
    return (
      <AnimatePresence mode="wait">
        <motion.div key="existing-dashboard" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {dashboard}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#100905] font-sans text-[#FFF3E8] selection:bg-[#D97726]/40 selection:text-[#FFF3E8]">
      <GrainOverlay />
      <Navbar onLogin={() => setLoginOpen(true)} authenticated={authenticated} onDashboard={() => setShowDashboard(true)} />
      <main>
        <Hero onLogin={() => setLoginOpen(true)} authenticated={authenticated} onDashboard={() => setShowDashboard(true)} />
        <Statement />
        <Marquee />
        <FeatureRail />
        <Experience />
        <Intelligence />
        <Security />
      </main>
      <Footer onLogin={() => setLoginOpen(true)} authenticated={authenticated} onDashboard={() => setShowDashboard(true)} />
      <AnimatePresence>{loginOpen && <LoginScreen onClose={() => setLoginOpen(false)} onSuccess={handleLogin} />}</AnimatePresence>
    </div>
  );
}

/*
Demo credentials:
Email: demo@nexorabank.com
Password: Nexora@123

Integration:
<NexoraLanding dashboard={<YourExistingNexoraDashboard />} />

For a real auth integration, pass onLogin={async (email, password) => {
  await yourAuthFunction(email, password);
}}.
*/
