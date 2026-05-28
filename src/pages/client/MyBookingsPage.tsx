import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Download, ArrowRight, Check } from "lucide-react";
import { bookings, getCar, getDriver } from "@/lib/mock-data";
import { StatusBadge } from "@/components/animated/StatusBadge";
import { GoldButton } from "@/components/animated/GoldButton";
import { Reveal } from "@/components/animated/Reveal";

function Countdown({ date, time }: { date: string; time: string }) {
  const target = new Date(`${date}T${time}`).getTime();
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = target - now;
  if (diff <= 0) return <span className="font-mono text-xs text-mist">Underway</span>;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return <span className="font-mono text-xs text-gold">{d}d {h.toString().padStart(2, "0")}h {m.toString().padStart(2, "0")}m</span>;
}

const timelineSteps = ["Confirmed", "Driver Assigned", "En Route", "Completed"];
function Timeline({ status }: { status: string }) {
  const idx = status === "Pending" ? 0 : status === "Confirmed" ? 1 : status === "En Route" ? 2 : status === "Completed" ? 3 : 0;
  return (
    <div className="flex items-center gap-2 mt-4">
      {timelineSteps.map((s, i) => (
        <div key={s} className="flex items-center gap-2 flex-1">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, backgroundColor: i <= idx ? "#C9A84C" : "rgba(255,255,255,0.08)" }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 400 }}
            className="h-6 w-6 rounded-full flex items-center justify-center shrink-0"
          >
            {i <= idx ? <Check size={12} className="text-obsidian" /> : <span className="text-[10px] text-mist">{i + 1}</span>}
          </motion.div>
          {i < timelineSteps.length - 1 && (
            <div className="flex-1 h-px bg-graphite overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: i < idx ? "100%" : "0%" }} transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }} className="h-full bg-gold" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function MyBookingsPage() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const upcoming = bookings.filter(b => b.status === "Confirmed" || b.status === "En Route" || b.status === "Pending");
  const past = bookings.filter(b => b.status === "Completed" || b.status === "Cancelled");
  const list = tab === "upcoming" ? upcoming : past;

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-3">Your account</div>
          <h1 className="font-display text-5xl md:text-6xl mb-10">My Rides</h1>
        </Reveal>

        <div className="flex gap-1 mb-8 border-b border-gold/10">
          {(["upcoming", "past"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className="relative px-6 py-3 text-xs uppercase tracking-[0.25em] text-mist hover:text-ivory transition-colors">
              <span className={tab === t ? "text-gold" : ""}>{t === "upcoming" ? `Upcoming · ${upcoming.length}` : `Past · ${past.length}`}</span>
              {tab === t && <motion.span layoutId="tab-underline" className="absolute -bottom-px left-0 right-0 h-0.5 bg-gold" />}
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {list.map((b, i) => {
            const car = getCar(b.carId)!;
            const driver = getDriver(car.driverId)!;
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass glass-hover rounded-lg p-6 transition-all"
              >
                <div className="grid md:grid-cols-[200px_1fr_auto] gap-6">
                  <img src={car.images[0]} className="h-32 md:h-full w-full object-cover rounded-md" alt="" />
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <StatusBadge status={b.status} />
                      <span className="font-mono text-[10px] text-mist">{b.reference}</span>
                    </div>
                    <h3 className="font-display text-2xl">{car.make} {car.model}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <img src={driver.photo} className="h-6 w-6 rounded-full object-cover" alt="" />
                      <span className="text-xs text-mist">with {driver.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-mist">
                      <span className="inline-flex items-center gap-1.5"><Calendar size={12} /> {b.date}</span>
                      <span className="inline-flex items-center gap-1.5"><Clock size={12} /> {b.time}</span>
                      <span className="inline-flex items-center gap-1.5"><MapPin size={12} /> {b.pickup} → {b.destination}</span>
                    </div>
                    {tab === "upcoming" && <Timeline status={b.status} />}
                  </div>
                  <div className="flex md:flex-col items-end justify-between gap-3">
                    <div className="text-right">
                      <div className="font-mono text-2xl text-gold">€{b.totalPrice}</div>
                      {tab === "upcoming" && (
                        <div className="mt-1 text-right"><Countdown date={b.date} time={b.time} /></div>
                      )}
                    </div>
                    {tab === "past" ? (
                      <GoldButton variant="ghost" size="sm"><Download size={12} /> Receipt</GoldButton>
                    ) : (
                      <Link to="/fleet/$carId" params={{ carId: car.id }}><GoldButton size="sm">Details <ArrowRight size={12} /></GoldButton></Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}