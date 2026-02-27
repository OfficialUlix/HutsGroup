import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  Car,
  Check,
  ChevronDown,
  Clock3,
  Factory,
  Github,
  Instagram,
  Landmark,
  Leaf,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  Rocket,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Twitter,
  Wrench,
  X,
  Zap
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Non-Abrasive Precision",
    text: "Laser pulses remove rust and paint without touching the base material, preserving texture and tolerances."
  },
  {
    icon: Leaf,
    title: "Eco-Safe Process",
    text: "No chemicals, no blasting media, minimal secondary waste. Cleaner process for people and sites."
  },
  {
    icon: Target,
    title: "Micron-Level Control",
    text: "Targeted beam control for complex geometries, heritage details, and delicate restoration zones."
  },
  {
    icon: Factory,
    title: "Industrial Throughput",
    text: "Production-line cleaning, mold prep, and preventive maintenance with minimal downtime."
  },
  {
    icon: Car,
    title: "Automotive Restoration",
    text: "Chassis derusting, coating removal, and component restoration for classic and modern vehicles."
  },
  {
    icon: Landmark,
    title: "Heritage Friendly",
    text: "Soot, algae, and contaminant removal on stone and brick while keeping historic surfaces intact."
  }
];

const stats = [
  { target: 14, suffix: "K+", label: "Projects Completed", decimals: 0 },
  { target: 2.8, suffix: "M", label: "cm2 Restored Surface", decimals: 1 },
  { target: 98, suffix: "%", label: "Substrate Integrity Rate", decimals: 0 },
  { target: 24, suffix: "h", label: "Average First Response", decimals: 0 }
];

const processSteps = [
  {
    icon: Search,
    title: "Scan & Diagnose",
    text: "We assess substrate, contaminant layers, and access constraints to select the exact laser profile."
  },
  {
    icon: Settings2,
    title: "Tune Parameters",
    text: "Frequency, pulse width, and power are calibrated on a test area for safe and efficient removal."
  },
  {
    icon: Rocket,
    title: "Clean & Validate",
    text: "Our team completes surface treatment and validates finish quality before handover."
  }
];

const testimonials = [
  {
    name: "Oliver Grant",
    role: "Operations Manager, UK Fabrication",
    quote:
      "The Huts Group crew cleaned oxidation from critical parts without stripping base metal. We reduced rework significantly."
  },
  {
    name: "Sophie Clarke",
    role: "Project Lead, Heritage Conservation",
    quote:
      "Stone facade contamination was removed with outstanding precision. The original detail stayed untouched."
  },
  {
    name: "Marcus Bell",
    role: "Owner, Classic Auto Workshop",
    quote:
      "Paint and rust removal on vintage components was fast and controlled. It saved hours compared to blasting."
  }
];

const plans = [
  {
    name: "Basic",
    monthly: 490,
    yearly: 4704,
    description: "For light commercial and single-site jobs.",
    features: ["On-site assessment", "Up to 4 service hours", "Email support", "Basic reporting"],
    popular: false
  },
  {
    name: "Pro",
    monthly: 990,
    yearly: 9504,
    description: "For recurring industrial and restoration workflows.",
    features: ["Priority scheduling", "Up to 12 service hours", "Process tuning", "Detailed QA report", "Phone support"],
    popular: true
  },
  {
    name: "Enterprise",
    monthly: null,
    yearly: null,
    description: "For plants, councils, and multi-location programs.",
    features: ["Custom scope", "Dedicated crew", "SLA and safety docs", "Nationwide coordination", "Account manager"],
    popular: false
  }
];

const faqItems = [
  {
    question: "Is laser cleaning safe for metal and stone?",
    answer:
      "Yes. The beam is tuned to remove contaminants while preserving the substrate. It is a non-contact and non-abrasive process."
  },
  {
    question: "Do you work outside London?",
    answer:
      "Yes. Huts Group is London-based and delivers mobile laser cleaning services across the UK for industrial and restoration projects."
  },
  {
    question: "What can be removed?",
    answer:
      "Rust, paint, oxides, soot, grease, and other surface contaminants on suitable metal, brick, and stone substrates."
  },
  {
    question: "How fast can we get a quote?",
    answer:
      "Most enquiries receive a first response within 24 hours. Sharing photos and dimensions speeds up scoping."
  },
  {
    question: "Is this greener than traditional methods?",
    answer:
      "Yes. Laser cleaning avoids chemical solvents and abrasive media, reducing waste streams and cleanup overhead."
  },
  {
    question: "Can it be done on-site?",
    answer:
      "Yes. Our mobile setup supports on-site cleaning for large or fixed assets where transport is impractical."
  }
];

const footerColumns = [
  {
    title: "Services",
    links: ["Rust Removal", "Paint Stripping", "Stone Cleaning", "Automotive Restoration"]
  },
  {
    title: "Industries",
    links: ["Manufacturing", "Heritage", "Automotive", "Commercial Facilities"]
  },
  {
    title: "Company",
    links: ["About", "Case Studies", "FAQ", "Careers"]
  },
  {
    title: "Resources",
    links: ["Safety Docs", "Method Statements", "Support", "Contact"]
  }
];

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" }
];

function Counter({ active, target, suffix, decimals }) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) {
      return undefined;
    }

    startedRef.current = true;
    let step = 0;
    const duration = 2000;
    const tickRate = 16;
    const totalSteps = Math.ceil(duration / tickRate);

    const timer = setInterval(() => {
      step += 1;
      const progress = Math.min(step / totalSteps, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(target * eased);

      if (progress >= 1) {
        clearInterval(timer);
      }
    }, tickRate);

    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function HutsGroupLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [billing, setBilling] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);

  const pageRef = useRef(null);
  const statsRef = useRef(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        left: `${(index * 17 + 9) % 100}%`,
        top: `${(index * 23 + 13) % 100}%`,
        delay: `${(index % 7) * 0.65}s`,
        duration: `${7 + (index % 5) * 1.4}s`
      })),
    []
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const container = pageRef.current;
    if (!container) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    const revealNodes = container.querySelectorAll("[data-reveal]");
    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = statsRef.current;
    if (!target) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const themeVars = {
    "--bg-primary": "#08080f",
    "--accent-from": "#06b6d4",
    "--accent-to": "#22c55e",
    "--card-bg": "rgba(15, 23, 42, 0.5)",
    "--border": "rgba(255,255,255,0.14)"
  };

  return (
    <div ref={pageRef} className="laser-page min-h-screen text-slate-100 antialiased" style={themeVars}>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap");

        html {
          scroll-behavior: smooth;
        }

        body {
          background: #08080f;
        }

        .laser-page {
          font-family: "Space Grotesk", "Plus Jakarta Sans", sans-serif;
          background:
            radial-gradient(circle at 5% -5%, rgba(6, 182, 212, 0.18), transparent 36%),
            radial-gradient(circle at 90% 10%, rgba(34, 197, 94, 0.14), transparent 32%),
            var(--bg-primary);
        }

        .hero-grid {
          background-image:
            linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(circle at center, black 40%, transparent 85%);
        }

        .fade-in-up {
          opacity: 0;
          transform: translateY(26px);
          animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .reveal {
          opacity: 0;
          transform: translateY(42px);
          transition:
            opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: var(--reveal-delay, 0ms);
        }

        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .blob {
          animation: blobFloat 12s ease-in-out infinite;
        }

        .blob.alt {
          animation-duration: 16s;
          animation-delay: -4s;
        }

        .particle {
          animation-name: particleFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .btn-glow {
          transition: transform 280ms ease, box-shadow 280ms ease, filter 280ms ease;
        }

        .btn-glow:hover {
          transform: scale(1.05);
          box-shadow: 0 0 34px rgba(6, 182, 212, 0.35);
          filter: brightness(1.04);
        }

        .card-glow {
          transition:
            transform 320ms ease,
            border-color 320ms ease,
            box-shadow 320ms ease,
            background-color 320ms ease;
        }

        .card-glow:hover {
          transform: translateY(-4px) scale(1.03);
          border-color: rgba(103, 232, 249, 0.44);
          box-shadow: 0 20px 55px rgba(8, 145, 178, 0.22);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(26px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blobFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -20px, 0) scale(1.06);
          }
        }

        @keyframes particleFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.15;
          }
          50% {
            transform: translate3d(0, -18px, 0);
            opacity: 0.65;
          }
        }
      `}</style>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-white/10 bg-[#08080f]/75 shadow-2xl shadow-black/30 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 md:px-10">
          <a href="#home" className="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-slate-100">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 text-[#03111a]">
              <Zap className="h-5 w-5" />
            </span>
            HUTS GROUP
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors duration-300 hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="btn-glow hidden min-h-11 items-center rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 text-sm font-semibold text-[#03111a] lg:inline-flex"
            >
              Get Quote
            </a>
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-100 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/55 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-72 border-l border-white/10 bg-[#090913]/95 p-6 backdrop-blur-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">Navigation</p>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-100"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block min-h-11 rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-white/10 hover:bg-white/5"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-3 flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-3 text-sm font-semibold text-[#03111a]"
            onClick={() => setMobileOpen(false)}
          >
            Request Quote
          </a>
        </div>
      </aside>

      <main className="relative overflow-hidden">
        <section id="home" className="relative isolate pt-32 md:pt-40">
          <div className="hero-grid absolute inset-0 opacity-40" />

          <div className="pointer-events-none absolute -left-16 top-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-[90px] blob" />
          <div className="pointer-events-none absolute right-0 top-36 h-80 w-80 rounded-full bg-emerald-400/18 blur-[110px] blob alt" />
          <div className="pointer-events-none absolute left-1/3 top-6 h-56 w-56 rounded-full bg-sky-500/20 blur-[100px] blob" />

          {particles.map((particle, index) => (
            <span
              key={index}
              className="particle pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-cyan-200/60"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            />
          ))}

          <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pb-24 md:px-10 md:pb-32">
            <span
              className="fade-in-up inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100"
              style={{ animationDelay: "80ms" }}
            >
              <Sparkles className="h-4 w-4" />
              London Based | UK-Wide Mobile Laser Cleaning
            </span>

            <h1
              className="fade-in-up mt-6 max-w-4xl text-4xl font-semibold leading-tight text-slate-100 md:text-6xl lg:text-7xl"
              style={{ animationDelay: "180ms" }}
            >
              Surface Restoration
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
                With Industrial Laser Precision
              </span>
            </h1>

            <p
              className="fade-in-up mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg"
              style={{ animationDelay: "280ms" }}
            >
              Huts Group removes rust, paint, oxides, soot, and grease without abrasive blasting or chemical stripping.
              Faster prep, cleaner surfaces, lower risk.
            </p>

            <div className="fade-in-up mt-9 flex flex-wrap gap-4" style={{ animationDelay: "380ms" }}>
              <a
                href="#pricing"
                className="btn-glow inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 text-sm font-semibold text-[#03111a]"
              >
                Start Project
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#process"
                className="btn-glow inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-semibold text-slate-100 backdrop-blur-xl"
              >
                <Play className="h-4 w-4" />
                See Process
              </a>
            </div>

            <div className="fade-in-up mt-12 grid max-w-4xl gap-4 sm:grid-cols-3" style={{ animationDelay: "460ms" }}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Coverage</p>
                <p className="mt-2 text-sm font-semibold text-slate-100">London + Nationwide UK</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Method</p>
                <p className="mt-2 text-sm font-semibold text-slate-100">Non-Contact, Non-Abrasive</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Sectors</p>
                <p className="mt-2 text-sm font-semibold text-slate-100">Industrial, Auto, Heritage</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 lg:py-24">
          <div data-reveal className="reveal text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Why Laser Cleaning</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Precision Cleaning. Zero Surface Compromise.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
              Designed for heavy-duty reliability and fine restoration detail in one workflow.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  data-reveal
                  className="reveal card-glow rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl"
                  style={{ "--reveal-delay": `${index * 110}ms` }}
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/30 to-emerald-400/25 text-cyan-100">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{feature.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <div className="mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

        <section ref={statsRef} id="stats" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
          <div data-reveal className="reveal">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="reveal rounded-3xl border border-white/12 bg-white/5 p-6 text-center backdrop-blur-xl"
                  data-reveal
                  style={{ "--reveal-delay": `${index * 100}ms` }}
                >
                  <p className="bg-gradient-to-r from-cyan-200 to-emerald-200 bg-clip-text text-4xl font-semibold text-transparent md:text-5xl">
                    <Counter
                      active={statsVisible}
                      target={stat.target}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </p>
                  <p className="mt-3 text-sm font-medium text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 lg:py-24">
          <div data-reveal className="reveal text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">How It Works</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">From Surface Audit to Final Finish</h2>
          </div>

          <div className="relative mt-14 grid gap-8 lg:grid-cols-3">
            <div className="pointer-events-none absolute left-[14%] right-[14%] top-16 hidden h-px bg-gradient-to-r from-cyan-400/0 via-cyan-300/70 to-emerald-300/0 lg:block" />
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.title}
                  data-reveal
                  className="reveal card-glow relative rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur-xl"
                  style={{ "--reveal-delay": `${index * 120}ms` }}
                >
                  <span className="absolute -top-4 left-6 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-emerald-300 text-sm font-semibold text-[#03111a]">
                    {index + 1}
                  </span>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/30 to-emerald-400/30 text-cyan-100">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{step.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="testimonials" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
          <div data-reveal className="reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Testimonials</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Teams That Switched to Laser</h2>
          </div>

          <div className="mt-10 flex gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
            {testimonials.map((item, index) => {
              const initials = item.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <article
                  key={item.name}
                  data-reveal
                  className="reveal card-glow min-w-[280px] rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl"
                  style={{ "--reveal-delay": `${index * 110}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300/80 to-emerald-300/80 text-sm font-semibold text-[#03111a]">
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.role}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-1 text-amber-300">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">"{item.quote}"</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="pricing" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 lg:py-24">
          <div data-reveal className="reveal text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Pricing</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Simple Plans for Different Workloads</h2>
            <div className="mt-8 inline-flex rounded-2xl border border-white/15 bg-white/5 p-1 backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={`min-h-11 rounded-xl px-5 text-sm font-semibold transition-all ${
                  billing === "monthly" ? "bg-white/20 text-white" : "text-slate-300"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling("yearly")}
                className={`min-h-11 rounded-xl px-5 text-sm font-semibold transition-all ${
                  billing === "yearly" ? "bg-white/20 text-white" : "text-slate-300"
                }`}
              >
                Yearly
                <span className="ml-2 rounded-full bg-emerald-300/20 px-2 py-0.5 text-xs text-emerald-200">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((plan, index) => {
              const isYearly = billing === "yearly";
              const amount = isYearly ? plan.yearly : plan.monthly;
              const cycleLabel = isYearly ? "/year" : "/month";

              return (
                <article
                  key={plan.name}
                  data-reveal
                  className={`reveal card-glow relative rounded-3xl border bg-white/5 p-7 backdrop-blur-xl ${
                    plan.popular
                      ? "border-cyan-300/60 shadow-[0_18px_60px_rgba(6,182,212,0.18)] lg:scale-[1.03]"
                      : "border-white/15"
                  }`}
                  style={{ "--reveal-delay": `${index * 100}ms` }}
                >
                  {plan.popular ? (
                    <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 px-3 py-1 text-xs font-semibold text-[#03111a]">
                      Popular
                    </span>
                  ) : null}
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">{plan.name}</p>
                  <p className="mt-4 text-4xl font-semibold text-white">
                    {amount ? `£${amount.toLocaleString("en-GB")}` : "Custom"}
                    {amount ? <span className="ml-1 text-sm font-medium text-slate-400">{cycleLabel}</span> : null}
                  </p>
                  <p className="mt-4 text-sm text-slate-300">{plan.description}</p>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-slate-200">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`btn-glow mt-7 inline-flex min-h-11 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold ${
                      plan.popular
                        ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-[#03111a]"
                        : "border border-white/20 bg-white/5 text-slate-100"
                    }`}
                  >
                    Choose {plan.name}
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section id="faq" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
          <div data-reveal className="reveal text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Answers Before You Start</h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {faqItems.map((item, index) => {
              const expanded = openFaq === index;
              return (
                <article
                  key={item.question}
                  data-reveal
                  className="reveal rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-xl"
                  style={{ "--reveal-delay": `${index * 80}ms` }}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 text-left"
                    onClick={() => setOpenFaq(expanded ? -1 : index)}
                  >
                    <span className="text-sm font-semibold text-white md:text-base">{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-cyan-200 transition-transform duration-300 ${
                        expanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      expanded ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-70"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm leading-relaxed text-slate-300">{item.answer}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="contact" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 lg:py-24">
          <div
            data-reveal
            className="reveal relative overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-r from-cyan-500/80 via-sky-500/70 to-emerald-500/80 px-7 py-10 md:px-12 md:py-14"
          >
            <div className="pointer-events-none absolute -left-12 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-white/20 blur-2xl" />
            <div className="pointer-events-none absolute -right-12 top-1/3 h-44 w-44 rounded-full bg-white/20 blur-2xl" />
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#03111a]/80">Ready To Start</p>
              <h2 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight text-[#03111a] md:text-5xl">
                Share your project details and get a laser cleaning action plan.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#03111a]/80 md:text-base">
                Send dimensions, location, and photos. We will propose the safest and fastest cleaning method.
              </p>
              <form className="mt-8 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="min-h-11 flex-1 rounded-xl border border-white/60 bg-white/90 px-4 text-sm text-[#03111a] outline-none transition focus:ring-2 focus:ring-[#03111a]/30"
                />
                <button
                  type="submit"
                  className="btn-glow min-h-11 rounded-xl bg-[#03111a] px-6 text-sm font-semibold text-white"
                >
                  Subscribe
                </button>
              </form>
              <div className="mt-7 flex flex-wrap gap-5 text-sm text-[#03111a]/80">
                <span className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +44 7810 111110
                </span>
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  contact@hutsgroup.co.uk
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  London, United Kingdom
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#07070d]">
        <div className="mx-auto w-full max-w-7xl px-6 py-14 md:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
            <div>
              <a href="#home" className="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-slate-100">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 text-[#03111a]">
                  <Zap className="h-5 w-5" />
                </span>
                HUTS GROUP
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
                Premium laser cleaning for industrial assets, automotive restoration, and heritage preservation.
              </p>

              <div className="mt-6 flex items-center gap-3 text-slate-300">
                <a
                  href="#"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 transition-colors hover:bg-white/10"
                  aria-label="Github"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 transition-colors hover:bg-white/10"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 transition-colors hover:bg-white/10"
                  aria-label="Linkedin"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 transition-colors hover:bg-white/10"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-200">{column.title}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="transition-colors hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright 2026 Huts Group. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5" />
                Mon-Sat 8:00-19:00
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Wrench className="h-3.5 w-3.5" />
                Mobile Laser Crew
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" />
                London HQ
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
