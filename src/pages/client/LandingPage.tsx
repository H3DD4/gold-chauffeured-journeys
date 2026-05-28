import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Sparkles, Car, MapPin, ShieldCheck, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { GoldDust } from "@/components/animated/GoldDust";
import { GoldButton } from "@/components/animated/GoldButton";
import { Reveal } from "@/components/animated/Reveal";
import { AnimatedCounter } from "@/components/animated/AnimatedCounter";
import { StarRating } from "@/components/animated/StarRating";
import { cars, testimonials } from "@/lib/mock-data";

const heroBg = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2000&q=90&auto=format";

export function LandingPage() {
  const words = "Arrive in Silence. Leave an Impression.".split(" ");
  const [tIndex, setTIndex] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTIndex(x => (x + 1) % testimonials.length), 5500);
    return () => clearInterval(i);
  }, []);
  const featured = cars.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/40 to-obsidian" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-transparent to-transparent" />
        </motion.div>
        <GoldDust count={40} />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-gold"
          >
            <span className="h-px w-12 bg-gold" /> Private chauffeur · Worldwide
          </motion.div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-ivory max-w-5xl">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="inline-block mr-[0.3em]"
              >
                {w.includes(".") ? <span className="gold-text italic">{w}</span> : w}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-8 max-w-xl text-base md:text-lg text-mist leading-relaxed"
          >
            A private chauffeur, a flawless car, an arrival composed to the second.
            For galas, transfers, weddings, and the quiet evenings in between.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link to="/fleet">
              <GoldButton size="lg">Explore the Fleet <ArrowRight size={14} /></GoldButton>
            </Link>
            <Link to="/booking">
              <GoldButton size="lg" variant="ghost">Reserve Now</GoldButton>
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gold scroll-indicator"
        >
          <ChevronDown size={20} />
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center mb-20">
              <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4">Three steps · No friction</div>
              <h2 className="font-display text-5xl md:text-6xl">A frictionless choreography</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Car, title: "Choose Your Car", text: "Browse a curated fleet of limousines, sedans, SUVs and vans. Each paired with its dedicated chauffeur." },
              { icon: MapPin, title: "Set Your Arrival", text: "Pick the date, the hour, the pickup, the destination. We handle the timing to the second." },
              { icon: Sparkles, title: "Step Out, Composed", text: "Your driver is waiting. Door held, climate set, the route already memorized." },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 0.15}>
                <div className="glass glass-hover rounded-lg p-8 h-full transition-all">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 text-gold">
                    <s.icon size={22} />
                  </div>
                  <div className="font-mono text-[10px] text-gold mb-2">0{i + 1}</div>
                  <h3 className="font-display text-2xl mb-3">{s.title}</h3>
                  <p className="text-mist text-sm leading-relaxed">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET PREVIEW */}
      <section className="py-32 px-6" style={{ background: "var(--charcoal)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-16">
            <Reveal>
              <div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4">The Fleet</div>
                <h2 className="font-display text-5xl md:text-6xl">Chosen, never assembled.</h2>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <Link to="/fleet" className="hidden md:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-gold hover:gap-3 transition-all">
                View All <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.08}>
                <Link to="/fleet/$carId" params={{ carId: c.id }} className="group block">
                  <div className="glass glass-hover rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-56 overflow-hidden">
                      <img src={c.images[0]} alt={`${c.make} ${c.model}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      {c.available && (
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 backdrop-blur">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-gold" />
                          <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-300">Available</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 rounded-full bg-obsidian/70 px-2.5 py-1 backdrop-blur text-[9px] uppercase tracking-[0.2em] text-gold border border-gold/30">
                        {c.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.25em] text-mist">{c.make}</div>
                          <h3 className="font-display text-xl mt-0.5">{c.model}</h3>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-lg text-gold">€{c.pricePerHour}</div>
                          <div className="text-[9px] uppercase tracking-[0.2em] text-mist">/hour</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gold/10">
                        <div className="flex items-center gap-1.5 text-xs text-mist">
                          <Star size={12} className="fill-gold text-gold" />
                          {c.rating.toFixed(2)} · {c.reviews}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-mist">{c.city}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center mb-16">
              <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4">Why Arrivée</div>
              <h2 className="font-display text-5xl md:text-6xl max-w-3xl mx-auto text-balance">A standard you can measure.</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-px bg-gold/10">
            {[
              { v: 12480, p: "", s: "+", label: "Arrivals delivered" },
              { v: 4.96, p: "", s: "/5", label: "Average rating", dec: 2 },
              { v: 38, p: "", s: "", label: "Cities worldwide" },
              { v: 99.7, p: "", s: "%", label: "On-time rate", dec: 1 },
            ].map((k, i) => (
              <Reveal key={k.label} delay={i * 0.1}>
                <div className="bg-obsidian p-10 text-center h-full">
                  <div className="font-display text-5xl md:text-6xl gold-text mb-3 shimmer inline-block">
                    <AnimatedCounter value={k.v} prefix={k.p} suffix={k.s} decimals={k.dec ?? 0} />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-mist">{k.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 px-6" style={{ background: "var(--charcoal)" }}>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4">From our guests</div>
          </Reveal>
          <div className="relative h-64">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                className="absolute inset-0 flex flex-col items-center justify-center"
                initial={false}
                animate={{ opacity: i === tIndex ? 1 : 0 }}
                transition={{ duration: 0.8 }}
              >
                <StarRating value={5} size={16} />
                <p className="font-display text-3xl md:text-4xl mt-6 leading-snug italic text-balance">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={t.photo} className="h-10 w-10 rounded-full object-cover" alt="" />
                  <div className="text-left">
                    <div className="text-sm">{t.name}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-mist">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTIndex(i)}
                className="h-1.5 rounded-full bg-gold/20 transition-all"
                style={{ width: i === tIndex ? 32 : 8, background: i === tIndex ? "#C9A84C" : "rgba(201,168,76,0.2)" }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <ShieldCheck className="text-gold mx-auto mb-6" size={28} />
            <h2 className="font-display text-5xl md:text-7xl">Ready when you are.</h2>
            <p className="text-mist text-lg mt-6 max-w-xl mx-auto leading-relaxed">Reserve in minutes. Receive driver details immediately. Arrive as if it were rehearsed.</p>
            <div className="mt-10 flex justify-center gap-4">
              <Link to="/booking"><GoldButton size="lg">Reserve Now <ArrowRight size={14} /></GoldButton></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}