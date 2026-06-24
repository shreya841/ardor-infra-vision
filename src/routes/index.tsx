import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Zap, Sun, Building2, Cog, Wind, Package, ArrowRight, CheckCircle2,
  Shield, Award, Leaf, Clock, Sparkles, Factory, Landmark, Briefcase,
  HardHat, Phone, Mail, MapPin, Linkedin, Twitter, Facebook, Menu, X,
} from "lucide-react";

import heroImg from "@/assets/hero-infrastructure.png";
import pSolar from "@/assets/project-solar-farm.jpg";
import pGrid from "@/assets/project-electrical-grid.jpg";
import pIndustrial from "@/assets/project-industrial.jpg";
import pCity from "@/assets/project-smartcity.jpg";
import pControl from "@/assets/project-controlroom.jpg";
import pConstruction from "@/assets/project-construction.jpg";
import sElectrical from "@/assets/service-electrical.jpg";
import sHvac from "@/assets/service-hvac.jpg";
import sEquipment from "@/assets/service-equipment.jpg";
import iManufacturing from "@/assets/industry-manufacturing.jpg";
import iGovernment from "@/assets/industry-government.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARDOR Infrastructure — Electrical, Solar & Industrial Solutions" },
      { name: "description", content: "Premium engineering company in Bhopal delivering electrical, solar energy, infrastructure development and industrial installation across India." },
    ],
  }),
  component: HomePage,
});

/* ---------- helpers ---------- */

function Counter({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function Reveal({ children, delay = 0, y = 24 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- sections ---------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["Home", "#home"], ["About", "#about"], ["Services", "#services"],
    ["Projects", "#projects"], ["Industries", "#industries"], ["Why Us", "#why"], ["Contact", "#contact"],
  ] as const;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/85 backdrop-blur-xl border-b border-border shadow-[0_8px_30px_-20px_rgba(15,23,42,0.15)]" : "bg-transparent"}`}>
      <div className="container-x flex h-20 items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5">
          <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-soft text-white shadow-soft">
            <Zap className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-tight text-ink">ARDOR</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-soft">Infrastructure</div>
          </div>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-surface hover:text-brand">
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <a href="#contact" className="btn-primary text-sm">Get Consultation <ArrowRight className="h-4 w-4" /></a>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-white lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-surface">{label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-2 text-sm">Get Consultation</a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section id="home" ref={ref} className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      {/* backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface via-white to-white" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-60" />
      <div className="absolute -left-40 top-20 -z-10 h-[420px] w-[420px] rounded-full bg-brand/10 blur-3xl" />
      <div className="absolute -right-32 top-60 -z-10 h-[360px] w-[360px] rounded-full bg-cyan/20 blur-3xl" />

      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            <Sparkles className="h-3.5 w-3.5" /> Engineering Excellence Since 2008
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl"
          >
            Powering Tomorrow's{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-brand via-brand-soft to-cyan bg-clip-text text-transparent">Infrastructure</span>
              <svg className="absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M2 8 Q 50 2 100 6 T 198 6" stroke="url(#g)" strokeWidth="3" fill="none" strokeLinecap="round" />
                <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stopColor="#0B63F6" /><stop offset="1" stopColor="#00D4FF" /></linearGradient></defs>
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            Delivering Electrical, Solar, Industrial and Infrastructure Solutions with innovation, reliability and engineering excellence across India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#services" className="btn-primary">Explore Services <ArrowRight className="h-4 w-4" /></a>
            <a href="#projects" className="btn-ghost">View Projects</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-6 text-sm text-ink-soft"
          >
            {["ISO 9001:2015", "MSME Certified", "Govt. Approved Vendor"].map((t) => (
              <div key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand" />{t}</div>
            ))}
          </motion.div>
        </div>

        {/* Hero visual */}
        <motion.div style={{ y: y1 }} className="relative">
          <div className="relative rounded-3xl bg-gradient-to-br from-white to-surface p-4 shadow-card ring-1 ring-border">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-surface to-white">
              <motion.img
                src={heroImg}
                alt="ARDOR Infrastructure ecosystem with solar, grid, smart city"
                width={1280} height={1024}
                className="h-auto w-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* spinning wind turbine svg overlay */}
            <div className="pointer-events-none absolute right-10 top-10">
              <div className="relative h-16 w-16">
                <div className="absolute left-1/2 top-0 h-10 w-0.5 -translate-x-1/2 bg-ink-soft/40" />
                <Wind className="animate-spin-slow absolute -top-2 left-1/2 h-8 w-8 -translate-x-1/2 text-brand drop-shadow" strokeWidth={1.5} />
              </div>
            </div>

            {/* floating stat card */}
            <motion.div
              style={{ y: y2 }}
              className="absolute -left-6 bottom-10 hidden rounded-2xl bg-white px-5 py-4 shadow-card ring-1 ring-border md:block"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand"><Sun className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-ink-soft">Live Capacity</div>
                  <div className="font-display text-lg font-bold text-ink">1.5 GW Installed</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity }}
              className="absolute -right-4 top-24 hidden rounded-2xl bg-white px-4 py-3 shadow-card ring-1 ring-border md:flex md:items-center md:gap-2.5"
            >
              <span className="relative grid h-2.5 w-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm font-semibold text-ink">99% Uptime</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStats() {
  const stats = [
    { value: 250, suffix: "+", label: "Projects Completed" },
    { value: 180, suffix: "+", label: "Clients Served" },
    { value: 100, suffix: "+", label: "Engineering Solutions" },
    { value: 17, suffix: "+", label: "Years of Experience" },
  ];
  return (
    <section className="relative -mt-16">
      <div className="container-x">
        <Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-border shadow-card ring-1 ring-border md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white p-8 text-center md:p-10">
                <div className="font-display text-4xl font-extrabold text-ink md:text-5xl">
                  <span className="bg-gradient-to-r from-brand to-brand-soft bg-clip-text text-transparent">
                    <Counter to={s.value} suffix={s.suffix} />
                  </span>
                </div>
                <div className="mt-2 text-sm font-medium uppercase tracking-wider text-ink-soft">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-card">
              <img src={pIndustrial} alt="Engineers at industrial site" loading="lazy" width={1024} height={768} className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-6 hidden h-48 w-56 overflow-hidden rounded-2xl shadow-card ring-4 ring-white md:block">
              <img src={pSolar} alt="Solar farm" loading="lazy" width={1024} height={768} className="h-full w-full object-cover" />
            </div>
            <div className="absolute -left-6 -top-6 hidden h-40 w-40 overflow-hidden rounded-2xl shadow-card ring-4 ring-white md:block">
              <img src={pControl} alt="Control room" loading="lazy" width={1024} height={768} className="h-full w-full object-cover" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <span className="eyebrow"><Briefcase className="h-3.5 w-3.5" /> About ARDOR</span>
          <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
            Building India's backbone with engineering precision.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Headquartered in Bhopal, ARDOR Infrastructure is a multi-disciplinary engineering company delivering electrical, solar, industrial and infrastructure projects for enterprises, governments and developers across India.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand"><Award className="h-5 w-5" /></div>
              <h3 className="mt-4 text-lg font-bold">Our Mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                To engineer reliable, sustainable infrastructure that empowers communities and accelerates industrial growth.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand"><Sparkles className="h-5 w-5" /></div>
              <h3 className="mt-4 text-lg font-bold">Our Vision</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                To be India's most trusted partner for next-generation electrical and energy infrastructure.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const services = [
  { icon: Zap, title: "Electrical Installation", desc: "End-to-end electrical engineering — panels, distribution, LT/HT cabling, and switchgear.", img: sElectrical },
  { icon: Sun, title: "Solar Energy Solutions", desc: "Utility-scale and rooftop solar PV systems engineered for maximum lifetime yield.", img: pSolar },
  { icon: Building2, title: "Infrastructure Development", desc: "Site civil works, transmission corridors, substations and large-format infrastructure.", img: pConstruction },
  { icon: Cog, title: "Industrial Engineering", desc: "Plant electrification, automation backbones and heavy machinery installation.", img: pIndustrial },
  { icon: Wind, title: "HVAC Systems", desc: "Energy-efficient heating, ventilation and air-conditioning for commercial and industrial.", img: sHvac },
  { icon: Package, title: "Equipment Supply", desc: "Transformers, panels, cables and BOS — sourced, tested and delivered on schedule.", img: sEquipment },
];

function Services() {
  return (
    <section id="services" className="section-pad bg-surface">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className="eyebrow"><Cog className="h-3.5 w-3.5" /> What We Do</span></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">A complete engineering capability under one roof.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg text-ink-soft">From design and procurement to installation, commissioning and O&amp;M.</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <article className="card-tilt group overflow-hidden rounded-3xl border border-border bg-white">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent" />
                  <div className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-xl bg-white/95 text-brand shadow-soft backdrop-blur">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-sm backdrop-blur">
                    0{i + 1}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const projects = [
  { img: pSolar, title: "Bhopal Solar Park", cat: "Solar", size: "tall" },
  { img: pGrid, title: "MP State Transmission Grid", cat: "Electrical", size: "wide" },
  { img: pCity, title: "Smart City Power Backbone", cat: "Infrastructure", size: "" },
  { img: pConstruction, title: "Industrial Township Civils", cat: "Infrastructure", size: "" },
  { img: pControl, title: "SCADA Control Centre", cat: "Industrial", size: "wide" },
  { img: pIndustrial, title: "Heavy Plant Electrification", cat: "Industrial", size: "tall" },
];

function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  return (
    <section id="projects" className="section-pad">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Reveal><span className="eyebrow"><Building2 className="h-3.5 w-3.5" /> Selected Work</span></Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">Projects that power the country.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="flex gap-2">
              {["All", "Solar", "Electrical", "Infrastructure", "Industrial"].map((c, i) => (
                <button key={c} className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${i === 0 ? "bg-brand text-white shadow-soft" : "bg-white text-ink-soft hover:text-brand"} border border-border`}>{c}</button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* masonry grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <article
                className={`group relative overflow-hidden rounded-2xl shadow-soft ring-1 ring-border ${
                  p.size === "tall" ? "row-span-2 aspect-[3/4] md:aspect-auto md:h-full" : p.size === "wide" ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <img src={p.img} alt={p.title} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">{p.cat}</div>
                  <h3 className="mt-2 text-lg font-bold text-white">{p.title}</h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* marquee */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-border bg-surface py-8">
          <div ref={trackRef} className="animate-marquee flex w-max gap-6">
            {[...projects, ...projects].map((p, i) => (
              <div key={i} className="h-40 w-72 shrink-0 overflow-hidden rounded-2xl shadow-soft">
                <img src={p.img} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const industries = [
  { icon: Zap, title: "Energy", img: pGrid },
  { icon: Factory, title: "Manufacturing", img: iManufacturing },
  { icon: HardHat, title: "Industrial Plants", img: pIndustrial },
  { icon: Building2, title: "Commercial", img: pCity },
  { icon: Landmark, title: "Government", img: iGovernment },
  { icon: Cog, title: "Infrastructure", img: pConstruction },
];

function Industries() {
  return (
    <section id="industries" className="section-pad bg-surface">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className="eyebrow"><Factory className="h-3.5 w-3.5" /> Industries We Serve</span></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">Trusted across India's most demanding sectors.</h2>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.title} delay={i * 0.05}>
              <article className="group relative h-72 overflow-hidden rounded-3xl shadow-soft ring-1 ring-border">
                <img src={ind.img} alt={ind.title} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 text-white backdrop-blur">
                      <ind.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{ind.title}</h3>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const why = [
  { icon: Award, title: "Engineering Expertise", desc: "Multi-disciplinary team with deep domain experience." },
  { icon: CheckCircle2, title: "Reliable Execution", desc: "On-time delivery backed by robust project management." },
  { icon: Shield, title: "Quality Assurance", desc: "ISO-driven QA at every stage of the project lifecycle." },
  { icon: HardHat, title: "Safety Compliance", desc: "HSE-first culture with industry-leading safety record." },
  { icon: Leaf, title: "Sustainable Solutions", desc: "Energy-efficient, environmentally responsible designs." },
  { icon: Clock, title: "Timely Delivery", desc: "Predictable schedules and transparent reporting." },
];

function WhyUs() {
  return (
    <section id="why" className="section-pad">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className="eyebrow"><Shield className="h-3.5 w-3.5" /> Why Choose ARDOR</span></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">Six reasons enterprises choose us.</h2>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {why.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <div className="group relative h-full rounded-3xl border border-border bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-card">
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-soft text-white shadow-soft">
                  <w.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-bold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{w.desc}</p>
                <div className="absolute right-6 top-6 font-display text-3xl font-extrabold text-surface transition-colors group-hover:text-brand/15">0{i + 1}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { n: "01", title: "Consultation", desc: "Discovery, site survey and feasibility." },
  { n: "02", title: "Planning", desc: "Scope, timeline and resource planning." },
  { n: "03", title: "Engineering Design", desc: "Detailed engineering and approvals." },
  { n: "04", title: "Execution", desc: "Procurement, installation and rollout." },
  { n: "05", title: "Quality Testing", desc: "QA, commissioning and validation." },
  { n: "06", title: "Project Delivery", desc: "Handover, training and O&M support." },
];

function Process() {
  return (
    <section className="section-pad bg-gradient-to-b from-surface to-white">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className="eyebrow"><Clock className="h-3.5 w-3.5" /> How We Work</span></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">A proven six-step delivery process.</h2>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent md:block" />
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-6">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="relative text-center">
                  <div className="relative mx-auto grid h-14 w-14 place-items-center rounded-full bg-white shadow-card ring-2 ring-brand/20">
                    <span className="absolute inset-0 -z-10 rounded-full bg-brand/20" style={{ animation: `pulse-ring 3s ease-out ${i * 0.4}s infinite` }} />
                    <span className="font-display text-sm font-bold text-brand">{s.n}</span>
                  </div>
                  <h3 className="mt-5 font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-pad">
      <div className="container-x">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-card">
          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            <div className="relative bg-gradient-to-br from-brand via-brand to-brand-soft p-10 text-white md:p-14">
              <div className="absolute inset-0 grid-bg opacity-10" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5" /> Let's Build Together
                </span>
                <h2 className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl">Start your next infrastructure project with ARDOR.</h2>
                <p className="mt-4 max-w-md text-white/85">Tell us about your requirements. Our engineering team will get back within one business day.</p>

                <div className="mt-10 space-y-5">
                  {[
                    { icon: MapPin, label: "ARDOR Headquarters", value: "Bhopal, Madhya Pradesh, India" },
                    { icon: Phone, label: "Call us", value: "+91 622 333 7900" },
                    { icon: Mail, label: "Email us", value: "hello@ardorinfra.com" },
                  ].map((c) => (
                    <div key={c.label} className="flex items-start gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15 backdrop-blur">
                        <c.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-widest text-white/70">{c.label}</div>
                        <div className="mt-0.5 font-medium">{c.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* animated marker */}
                <div className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                  <span className="relative grid h-3 w-3">
                    <span className="absolute inset-0 animate-ping rounded-full bg-cyan" />
                    <span className="relative h-3 w-3 rounded-full bg-cyan" />
                  </span>
                  <span className="text-sm">Mon–Sat, 9:00 AM – 7:00 PM IST</span>
                </div>
              </div>
            </div>

            <form className="p-10 md:p-14" onSubmit={(e) => e.preventDefault()}>
              <h3 className="text-2xl font-bold">Request a consultation</h3>
              <p className="mt-2 text-sm text-ink-soft">Fill the form and we'll route your enquiry to the right engineering lead.</p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" placeholder="Your name" />
                <Field label="Company" placeholder="Company name" />
                <Field label="Email" type="email" placeholder="you@company.com" />
                <Field label="Phone" placeholder="+91 ..." />
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Project Type</label>
                  <select className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20">
                    <option>Solar Energy Solutions</option>
                    <option>Electrical Installation</option>
                    <option>Infrastructure Development</option>
                    <option>Industrial Engineering</option>
                    <option>HVAC Systems</option>
                    <option>Equipment Supply</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Message</label>
                  <textarea rows={4} placeholder="Tell us about your project..." className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20" />
                </div>
              </div>
              <button type="submit" className="btn-primary mt-7 w-full sm:w-auto">Submit Inquiry <ArrowRight className="h-4 w-4" /></button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{label}</label>
      <input {...rest} className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-soft text-white">
                <Zap className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div className="leading-tight">
                <div className="font-display text-lg font-bold text-white">ARDOR</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">Infrastructure</div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/65">
              Electrical, Solar, Industrial and Infrastructure engineering — delivered across India with reliability and excellence.
            </p>
            <div className="mt-6 flex gap-2">
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-brand">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Quick Links" items={["Home", "About", "Services", "Projects", "Industries", "Contact"]} />
          <FooterCol title="Services" items={["Electrical", "Solar Energy", "Infrastructure", "Industrial", "HVAC", "Equipment Supply"]} />

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white">Contact</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              <li className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-soft" />Bhopal, MP, India</li>
              <li className="flex gap-2.5"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-soft" />+91 622 333 7900</li>
              <li className="flex gap-2.5"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-soft" />hello@ardorinfra.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/55 md:flex-row">
          <div>© {new Date().getFullYear()} ARDOR Infrastructure. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white">{title}</h4>
      <ul className="mt-5 space-y-2.5 text-sm text-white/65">
        {items.map((i) => (
          <li key={i}><a href="#" className="transition-colors hover:text-white">{i}</a></li>
        ))}
      </ul>
    </div>
  );
}

function HomePage() {
  return (
    <main className="overflow-hidden bg-white">
      <Navbar />
      <Hero />
      <TrustStats />
      <About />
      <Services />
      <Projects />
      <Industries />
      <WhyUs />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
