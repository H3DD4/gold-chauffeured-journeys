import { Link, useParams } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Calendar, Check, Languages, MapPin, Sparkles, Star, Users, Clock } from "lucide-react";
import { cars, drivers, getCar, getDriver } from "@/lib/mock-data";
import { GoldButton } from "@/components/animated/GoldButton";
import { Reveal } from "@/components/animated/Reveal";
import { StarRating } from "@/components/animated/StarRating";
import { AnimatedCounter } from "@/components/animated/AnimatedCounter";

export function CarDetailPage() {
  const { carId } = useParams({ from: "/_client/fleet/$carId" });
  const car = getCar(carId)!;
  const driver = getDriver(car.driverId)!;
  const [imgIdx, setImgIdx] = useState(0);
  const [hours, setHours] = useState(4);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pickup, setPickup] = useState("");
  const [dest, setDest] = useState("");
  const total = car.pricePerHour * hours;
  const similar = cars.filter(c => c.id !== car.id && c.category === car.category).slice(0, 6);

  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <Link to="/fleet" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-mist hover:text-gold transition-colors mb-8">
          <ArrowLeft size={14} /> Back to Fleet
        </Link>

        <div className="grid lg:grid-cols-[1fr_400px] gap-10">
          <div>
            {/* Gallery */}
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden glass">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIdx}
                  src={car.images[imgIdx]}
                  alt=""
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute top-4 left-4 rounded-full bg-obsidian/70 px-3 py-1 backdrop-blur text-[10px] uppercase tracking-[0.25em] text-gold border border-gold/30">
                {car.category}
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              {car.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`h-16 w-24 rounded overflow-hidden transition-all ${i === imgIdx ? "ring-2 ring-gold" : "opacity-60 hover:opacity-100"}`}
                >
                  <img src={img} className="h-full w-full object-cover" alt="" />
                </button>
              ))}
            </div>

            {/* Specs */}
            <Reveal>
              <div className="mt-10">
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold">{car.make} · {car.year}</div>
                <h1 className="font-display text-5xl md:text-6xl mt-2">{car.model}</h1>
                <div className="flex items-center gap-4 mt-4 text-mist text-sm">
                  <span className="inline-flex items-center gap-1.5"><Star size={14} className="fill-gold text-gold" /> {car.rating.toFixed(2)} ({car.reviews})</span>
                  <span className="text-gold/30">·</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {car.city}</span>
                  <span className="text-gold/30">·</span>
                  <span className="inline-flex items-center gap-1.5"><Users size={14} /> Seats {car.capacity}</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/10 mt-10 rounded-lg overflow-hidden">
                {[
                  { label: "Year", val: car.year },
                  { label: "Color", val: car.color },
                  { label: "Plate", val: car.plate },
                  { label: "Capacity", val: car.capacity + " guests" },
                ].map(s => (
                  <div key={s.label} className="bg-obsidian p-5">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-mist mb-1">{s.label}</div>
                    <div className="font-mono text-sm text-ivory">{s.val}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10">
                <h3 className="font-display text-2xl mb-5">On board</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {car.features.map((f, i) => (
                    <motion.div
                      key={f}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-3 text-sm text-ivory"
                    >
                      <Check size={14} className="text-gold" /> {f}
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Driver */}
            <Reveal delay={0.2}>
              <div className="mt-12 glass rounded-lg p-6">
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-4">Your Chauffeur</div>
                <div className="flex flex-col sm:flex-row gap-5">
                  <img src={driver.photo} className="h-24 w-24 rounded-full object-cover border-2 border-gold/40" alt="" />
                  <div className="flex-1">
                    <h3 className="font-display text-2xl">{driver.name}</h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <StarRating value={driver.rating} />
                      <span className="font-mono text-sm text-gold">{driver.rating.toFixed(2)}</span>
                    </div>
                    <p className="text-mist text-sm mt-3 leading-relaxed italic">"{driver.bio}"</p>
                    <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-xs text-mist">
                      <span className="inline-flex items-center gap-1.5"><Sparkles size={12} className="text-gold" /> {driver.yearsExperience} yrs experience</span>
                      <span className="inline-flex items-center gap-1.5"><Languages size={12} className="text-gold" /> {driver.languages.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Booking panel */}
          <aside>
            <div className="lg:sticky lg:top-28">
              <div className="glass rounded-lg p-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <div className="font-mono text-3xl text-gold">€<AnimatedCounter value={car.pricePerHour} /></div>
                  <div className="text-xs text-mist uppercase tracking-[0.2em]">/ hour</div>
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-mist mb-6">€{car.pricePerKm}/km · {hours}h minimum</div>

                <div className="space-y-3">
                  <Field icon={Calendar} label="Date"><input type="date" value={date} onChange={e => setDate(e.target.value)} className="bg-transparent w-full text-sm focus:outline-none [color-scheme:dark]" /></Field>
                  <Field icon={Clock} label="Pickup time"><input type="time" value={time} onChange={e => setTime(e.target.value)} className="bg-transparent w-full text-sm focus:outline-none [color-scheme:dark]" /></Field>
                  <Field icon={MapPin} label="Pickup"><input placeholder="Address, hotel, terminal…" value={pickup} onChange={e => setPickup(e.target.value)} className="bg-transparent w-full text-sm placeholder:text-mist/40 focus:outline-none" /></Field>
                  <Field icon={MapPin} label="Destination"><input placeholder="Where to?" value={dest} onChange={e => setDest(e.target.value)} className="bg-transparent w-full text-sm placeholder:text-mist/40 focus:outline-none" /></Field>
                  <Field icon={Clock} label="Duration">
                    <div className="flex items-center gap-2 w-full">
                      <input type="range" min={1} max={12} value={hours} onChange={e => setHours(Number(e.target.value))} className="flex-1 accent-[#C9A84C]" />
                      <span className="font-mono text-sm text-gold w-12 text-right">{hours}h</span>
                    </div>
                  </Field>
                </div>

                <div className="border-t border-gold/10 mt-6 pt-4 space-y-1.5">
                  <Row label={`Base · ${hours}h`} value={`€${total}`} />
                  <Row label="Service" value="Included" muted />
                  <Row label="VAT 20%" value={`€${(total * 0.2).toFixed(0)}`} muted />
                  <div className="border-t border-gold/10 mt-3 pt-3 flex items-baseline justify-between">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-mist">Total</span>
                    <span className="font-mono text-2xl text-gold">€{(total * 1.2).toFixed(0)}</span>
                  </div>
                </div>

                <Link to="/booking" className="block mt-6">
                  <GoldButton size="lg" className="w-full">Reserve Now</GoldButton>
                </Link>
                <p className="text-[10px] uppercase tracking-[0.2em] text-mist text-center mt-3">Free cancellation up to 24h</p>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar */}
        <div className="mt-24">
          <Reveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2">Similar in {car.category}</div>
                <h2 className="font-display text-3xl md:text-4xl">More to consider</h2>
              </div>
            </div>
          </Reveal>
          <div className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-6 px-6">
            {similar.map(c => (
              <Link key={c.id} to="/fleet/$carId" params={{ carId: c.id }} className="snap-start shrink-0 w-72 group">
                <div className="glass glass-hover rounded-lg overflow-hidden transition-all">
                  <img src={c.images[0]} className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                  <div className="p-4">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-mist">{c.make}</div>
                    <div className="font-display text-lg">{c.model}</div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-mist">{c.city}</div>
                      <div className="font-mono text-gold">€{c.pricePerHour}/h</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, children }: { icon: typeof Calendar; label: string; children: React.ReactNode }) {
  return (
    <label className="block group">
      <div className="text-[10px] uppercase tracking-[0.25em] text-mist mb-1.5">{label}</div>
      <div className="flex items-center gap-2 bg-graphite border border-gold/15 rounded-md px-3 py-2.5 focus-within:border-gold/60 focus-within:shadow-[0_0_0_2px_rgba(201,168,76,0.2)] transition-all">
        <Icon size={14} className="text-gold/70 shrink-0" />
        {children}
      </div>
    </label>
  );
}
function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return <div className="flex justify-between items-center text-sm"><span className={muted ? "text-mist" : "text-ivory"}>{label}</span><span className={`font-mono ${muted ? "text-mist" : "text-ivory"}`}>{value}</span></div>;
}