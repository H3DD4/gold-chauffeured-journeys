import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Star, Filter, MapPin, Users } from "lucide-react";
import { cars, drivers } from "@/lib/mock-data";
import { Reveal } from "@/components/animated/Reveal";

const categories = ["All", "Sedan", "SUV", "Limousine", "Van"] as const;

export function FleetPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [city, setCity] = useState("All");
  const [pax, setPax] = useState(0);

  const cities = useMemo(() => ["All", ...Array.from(new Set(cars.map(c => c.city)))], []);
  const filtered = useMemo(
    () => cars.filter(c => (cat === "All" || c.category === cat) && (city === "All" || c.city === city) && c.capacity >= pax),
    [cat, city, pax]
  );

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <Reveal>
          <div className="mb-12">
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4">The Fleet</div>
            <h1 className="font-display text-5xl md:text-7xl">{filtered.length} cars, <span className="gold-text italic">one standard</span>.</h1>
            <p className="text-mist text-lg mt-6 max-w-2xl">Every vehicle paired with a chauffeur we know personally. Browse, pick, reserve.</p>
          </div>
        </Reveal>

        {/* Filters */}
        <Reveal delay={0.1}>
          <div className="glass rounded-lg p-5 mb-10 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gold">
              <Filter size={12} /> Filter
            </div>
            <div className="h-5 w-px bg-gold/20" />
            <div className="flex gap-1.5 flex-wrap">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`relative px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.2em] transition-colors ${
                    cat === c ? "text-obsidian" : "text-mist hover:text-ivory"
                  }`}
                >
                  {cat === c && (
                    <motion.span layoutId="cat-pill" className="absolute inset-0 gold-gradient rounded-full" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                  )}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
            <div className="h-5 w-px bg-gold/20 hidden md:block" />
            <select value={city} onChange={e => setCity(e.target.value)} className="bg-graphite border border-gold/15 rounded-md px-3 py-1.5 text-xs text-ivory focus:outline-none focus:border-gold/50">
              {cities.map(c => <option key={c} value={c}>{c === "All" ? "All cities" : c}</option>)}
            </select>
            <div className="flex items-center gap-2">
              <Users size={12} className="text-mist" />
              <select value={pax} onChange={e => setPax(Number(e.target.value))} className="bg-graphite border border-gold/15 rounded-md px-3 py-1.5 text-xs text-ivory focus:outline-none focus:border-gold/50">
                {[0, 2, 4, 6, 7].map(n => <option key={n} value={n}>{n === 0 ? "Any guests" : `${n}+ guests`}</option>)}
              </select>
            </div>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c, i) => {
            const d = drivers.find(x => x.id === c.driverId)!;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (i % 6) * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link to="/fleet/$carId" params={{ carId: c.id }} className="group block">
                  <div className="glass glass-hover rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-60 overflow-hidden">
                      <img src={c.images[0]} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60" />
                      {c.available && (
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 backdrop-blur">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-gold" />
                          <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-300">Available</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 rounded-full bg-obsidian/70 px-2.5 py-1 backdrop-blur text-[9px] uppercase tracking-[0.2em] text-gold border border-gold/30">
                        {c.category}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                        <img src={d.photo} className="h-8 w-8 rounded-full object-cover border border-gold/40" alt="" />
                        <div className="text-[10px] uppercase tracking-[0.2em] text-ivory">{d.name}</div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.25em] text-mist">{c.make}</div>
                          <h3 className="font-display text-xl mt-0.5">{c.model}</h3>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-lg text-gold">€{c.pricePerHour}</div>
                          <div className="text-[9px] uppercase tracking-[0.2em] text-mist">/hour</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gold/10">
                        <div className="flex items-center gap-2 text-xs text-mist">
                          <Star size={12} className="fill-gold text-gold" /> {c.rating.toFixed(2)}
                          <span className="text-mist/40">·</span>
                          <MapPin size={11} /> {c.city}
                        </div>
                        <div className="text-[10px] text-mist">Seats {c.capacity}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-mist">No cars match these filters.</div>
        )}
      </div>
    </div>
  );
}