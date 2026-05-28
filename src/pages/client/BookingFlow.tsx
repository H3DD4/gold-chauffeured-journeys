import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Calendar, Clock, MapPin, Car, User, CreditCard, Check, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { cars, drivers } from "@/lib/mock-data";
import { GoldButton } from "@/components/animated/GoldButton";
import { GoldDust } from "@/components/animated/GoldDust";

const steps = [
  { label: "Trip", icon: MapPin },
  { label: "Vehicle", icon: Car },
  { label: "Details", icon: User },
  { label: "Payment", icon: CreditCard },
];

export function BookingFlow() {
  const [step, setStep] = useState(0);
  const [carId, setCarId] = useState(cars[0].id);
  const car = cars.find(c => c.id === carId)!;
  const driver = drivers.find(d => d.id === car.driverId)!;
  const [done, setDone] = useState(false);
  const [ref, setRef] = useState("");
  const [typed, setTyped] = useState("");

  const next = () => setStep(s => Math.min(3, s + 1));
  const prev = () => setStep(s => Math.max(0, s - 1));
  const submit = () => {
    const r = "ARV-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    setRef(r);
    setDone(true);
  };

  useEffect(() => {
    if (!done) return;
    let i = 0;
    const tick = setInterval(() => {
      i++;
      setTyped(ref.slice(0, i));
      if (i >= ref.length) clearInterval(tick);
    }, 80);
    return () => clearInterval(tick);
  }, [done, ref]);

  if (done) return <SuccessScreen reference={typed} fullRef={ref} car={car} driver={driver} />;

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="mx-auto max-w-3xl">
        {/* Stepper */}
        <div className="mb-12">
          <div className="flex justify-between mb-3">
            {steps.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center gap-2 flex-1">
                <motion.div
                  animate={{
                    scale: i === step ? 1.15 : 1,
                    backgroundColor: i < step ? "#C9A84C" : i === step ? "#C9A84C" : "rgba(255,255,255,0.05)",
                    color: i <= step ? "#0A0A0A" : "rgba(245,240,232,0.5)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="h-10 w-10 rounded-full flex items-center justify-center border border-gold/30"
                >
                  {i < step ? <Check size={16} /> : <s.icon size={16} />}
                </motion.div>
                <div className={`text-[10px] uppercase tracking-[0.25em] transition-colors ${i === step ? "text-gold" : "text-mist"}`}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className="h-1 bg-graphite rounded-full overflow-hidden">
            <motion.div className="h-full gold-gradient" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: "easeOut" }} />
          </div>
        </div>

        <div className="relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait" custom={step}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {step === 0 && <StepTrip />}
              {step === 1 && <StepVehicle carId={carId} setCarId={setCarId} />}
              {step === 2 && <StepDetails />}
              {step === 3 && <StepPayment total={car.pricePerHour * 4 * 1.2} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between mt-10">
          <GoldButton variant="ghost" onClick={prev} disabled={step === 0} className={step === 0 ? "opacity-30 pointer-events-none" : ""}>
            <ArrowLeft size={14} /> Back
          </GoldButton>
          {step < 3 ? (
            <GoldButton onClick={next}>Continue <ArrowRight size={14} /></GoldButton>
          ) : (
            <GoldButton onClick={submit}>Confirm & Pay <Sparkles size={14} /></GoldButton>
          )}
        </div>
      </div>
    </div>
  );
}

function StepTrip() {
  return (
    <div>
      <h2 className="font-display text-4xl mb-2">When & where?</h2>
      <p className="text-mist mb-8">The basics of your arrival.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <FieldBlock icon={Calendar} label="Date"><input type="date" className="bg-transparent w-full focus:outline-none [color-scheme:dark]" /></FieldBlock>
        <FieldBlock icon={Clock} label="Pickup time"><input type="time" className="bg-transparent w-full focus:outline-none [color-scheme:dark]" /></FieldBlock>
        <FieldBlock icon={MapPin} label="Pickup address"><input placeholder="Hotel, airport, address…" className="bg-transparent w-full focus:outline-none placeholder:text-mist/40" /></FieldBlock>
        <FieldBlock icon={MapPin} label="Destination"><input placeholder="Where to?" className="bg-transparent w-full focus:outline-none placeholder:text-mist/40" /></FieldBlock>
        <FieldBlock icon={Clock} label="Duration (hours)"><input type="number" defaultValue={4} min={1} max={12} className="bg-transparent w-full focus:outline-none" /></FieldBlock>
        <FieldBlock icon={User} label="Guests"><input type="number" defaultValue={2} min={1} max={7} className="bg-transparent w-full focus:outline-none" /></FieldBlock>
      </div>
    </div>
  );
}

function StepVehicle({ carId, setCarId }: { carId: string; setCarId: (id: string) => void }) {
  return (
    <div>
      <h2 className="font-display text-4xl mb-2">Pick your vehicle</h2>
      <p className="text-mist mb-8">Each comes with its dedicated chauffeur.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {cars.slice(0, 6).map(c => {
          const d = drivers.find(x => x.id === c.driverId)!;
          const selected = c.id === carId;
          return (
            <button
              key={c.id}
              onClick={() => setCarId(c.id)}
              className={`text-left glass rounded-lg overflow-hidden transition-all ${selected ? "ring-2 ring-gold shadow-[0_0_30px_rgba(201,168,76,0.3)]" : "hover:border-gold/30"}`}
            >
              <div className="relative h-32">
                <img src={c.images[0]} className="h-full w-full object-cover" alt="" />
                {selected && <div className="absolute top-2 right-2 h-7 w-7 rounded-full gold-gradient flex items-center justify-center text-obsidian"><Check size={14} /></div>}
              </div>
              <div className="p-4">
                <div className="font-display text-lg">{c.model}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-mist">{c.make}</div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gold/10">
                  <img src={d.photo} className="h-6 w-6 rounded-full object-cover" alt="" />
                  <span className="text-xs text-mist">{d.name}</span>
                  <span className="ml-auto font-mono text-gold text-sm">€{c.pricePerHour}/h</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepDetails() {
  return (
    <div>
      <h2 className="font-display text-4xl mb-2">Your details</h2>
      <p className="text-mist mb-8">So your chauffeur knows who to greet.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <FieldBlock icon={User} label="Full name"><input placeholder="Your name" className="bg-transparent w-full focus:outline-none placeholder:text-mist/40" /></FieldBlock>
        <FieldBlock icon={User} label="Email"><input type="email" placeholder="you@email.com" className="bg-transparent w-full focus:outline-none placeholder:text-mist/40" /></FieldBlock>
        <FieldBlock icon={User} label="Phone"><input type="tel" placeholder="+33 6 …" className="bg-transparent w-full focus:outline-none placeholder:text-mist/40" /></FieldBlock>
        <FieldBlock icon={Sparkles} label="Special requests"><input placeholder="Champagne, music, etc." className="bg-transparent w-full focus:outline-none placeholder:text-mist/40" /></FieldBlock>
      </div>
    </div>
  );
}

function StepPayment({ total }: { total: number }) {
  return (
    <div>
      <h2 className="font-display text-4xl mb-2">Payment</h2>
      <p className="text-mist mb-8">Encrypted. Charged after the ride is confirmed.</p>
      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        <div className="glass rounded-lg p-6 space-y-4">
          <FieldBlock icon={CreditCard} label="Card number"><input placeholder="4242 4242 4242 4242" className="bg-transparent w-full focus:outline-none placeholder:text-mist/40 font-mono" /></FieldBlock>
          <div className="grid grid-cols-3 gap-3">
            <FieldBlock icon={Calendar} label="Expiry"><input placeholder="MM/YY" className="bg-transparent w-full focus:outline-none placeholder:text-mist/40 font-mono" /></FieldBlock>
            <FieldBlock icon={CreditCard} label="CVC"><input placeholder="123" className="bg-transparent w-full focus:outline-none placeholder:text-mist/40 font-mono" /></FieldBlock>
            <FieldBlock icon={User} label="ZIP"><input placeholder="75001" className="bg-transparent w-full focus:outline-none placeholder:text-mist/40 font-mono" /></FieldBlock>
          </div>
          <FieldBlock icon={User} label="Cardholder"><input placeholder="Name on card" className="bg-transparent w-full focus:outline-none placeholder:text-mist/40" /></FieldBlock>
        </div>
        <div className="glass rounded-lg p-6">
          <div className="text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Summary</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-mist">Vehicle</span><span>Selected</span></div>
            <div className="flex justify-between"><span className="text-mist">Chauffeur</span><span>Included</span></div>
            <div className="flex justify-between"><span className="text-mist">Duration</span><span>4h</span></div>
          </div>
          <div className="border-t border-gold/10 mt-4 pt-4">
            <div className="text-[10px] uppercase tracking-[0.25em] text-mist mb-1">Total</div>
            <div className="font-mono text-3xl gold-text">€{total.toFixed(0)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldBlock({ icon: Icon, label, children }: { icon: typeof Calendar; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[10px] uppercase tracking-[0.25em] text-mist mb-1.5">{label}</div>
      <div className="flex items-center gap-2 bg-graphite border border-gold/15 rounded-md px-3 py-3 focus-within:border-gold/60 focus-within:shadow-[0_0_0_2px_rgba(201,168,76,0.2)] transition-all">
        <Icon size={14} className="text-gold/70 shrink-0" />
        {children}
      </div>
    </label>
  );
}

function SuccessScreen({ reference, fullRef, car, driver }: { reference: string; fullRef: string; car: typeof cars[number]; driver: typeof drivers[number] }) {
  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 flex items-center justify-center overflow-hidden">
      <GoldDust count={60} />
      <Confetti />
      <div className="relative z-10 max-w-xl text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="mx-auto mb-8 h-24 w-24 rounded-full border-2 border-gold flex items-center justify-center">
          <svg viewBox="0 0 50 50" className="h-12 w-12">
            <motion.path
              d="M 12 25 L 22 35 L 38 17"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
          </svg>
        </motion.div>
        <h1 className="font-display text-5xl md:text-6xl">Your arrival is composed.</h1>
        <p className="text-mist mt-4">{driver.name} will be at the wheel of your {car.model}.</p>
        <div className="glass rounded-lg p-6 mt-8 inline-block">
          <div className="text-[10px] uppercase tracking-[0.3em] text-mist mb-1">Booking reference</div>
          <div className="font-mono text-3xl gold-text">
            {reference}<span className="animate-pulse">{reference.length < fullRef.length ? "▎" : ""}</span>
          </div>
        </div>
        <div className="mt-10 flex justify-center gap-3">
          <Link to="/my-bookings"><GoldButton>View My Rides</GoldButton></Link>
          <Link to="/"><GoldButton variant="ghost">Home</GoldButton></Link>
        </div>
      </div>
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 50 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0">
      {pieces.map(i => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.5;
        const color = i % 2 ? "#C9A84C" : "#0A0A0A";
        return (
          <motion.span
            key={i}
            initial={{ y: -20, x: `${left}vw`, opacity: 1, rotate: 0 }}
            animate={{ y: "110vh", rotate: 720, opacity: 0 }}
            transition={{ duration: 3 + Math.random() * 2, delay, ease: "easeIn" }}
            className="absolute top-0 h-3 w-1.5 rounded-sm"
            style={{ background: color, border: color === "#0A0A0A" ? "1px solid #C9A84C" : "none" }}
          />
        );
      })}
    </div>
  );
}