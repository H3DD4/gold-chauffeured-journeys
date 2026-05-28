import { motion } from "framer-motion";
import { Reveal } from "@/components/animated/Reveal";
import { GoldButton } from "@/components/animated/GoldButton";
import { StatusBadge } from "@/components/animated/StatusBadge";
import { StarRating } from "@/components/animated/StarRating";
import { AnimatedCounter } from "@/components/animated/AnimatedCounter";
import { cars, drivers, bookings, clients, owners, earningsBreakdown, platformGrowth, revenueByMonth, getCar, getDriver } from "@/lib/mock-data";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Legend } from "recharts";
import { Search, Plus, Upload, Check, Settings, Bell, MapPin, Calendar, Languages, Sparkles } from "lucide-react";
import { useState } from "react";

export function PageHeader({ kicker, title, action }: { kicker: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">{kicker}</div>
        <h1 className="font-display text-4xl">{title}</h1>
      </div>
      {action}
    </div>
  );
}

/* ------------------------------ OWNER PAGES ------------------------------ */

export function OwnerFleetPage() {
  return (
    <div>
      <PageHeader kicker="My Fleet" title="6 vehicles" action={<GoldButton><Plus size={14} /> Add Vehicle</GoldButton>} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cars.slice(0, 6).map((c, i) => {
          const d = getDriver(c.driverId)!;
          return (
            <Reveal key={c.id} delay={i * 0.06}>
              <div className="glass glass-hover rounded-lg overflow-hidden">
                <div className="relative h-44"><img src={c.images[0]} className="h-full w-full object-cover" alt="" /></div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-mist">{c.make}</div>
                      <div className="font-display text-xl">{c.model}</div>
                    </div>
                    <ToggleSwitch defaultOn={c.available} />
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-gold/10">
                    <img src={d.photo} className="h-7 w-7 rounded-full object-cover" alt="" />
                    <span className="text-xs text-mist">{d.name}</span>
                    <span className="ml-auto font-mono text-gold text-sm">€{c.pricePerHour}/h</span>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

function ToggleSwitch({ defaultOn = true }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn(o => !o)} className="relative h-6 w-11 rounded-full transition-colors" style={{ background: on ? "#C9A84C" : "rgba(255,255,255,0.1)" }}>
      <motion.div animate={{ x: on ? 22 : 2 }} transition={{ type: "spring", stiffness: 500, damping: 28 }} className="absolute top-0.5 h-5 w-5 rounded-full bg-obsidian shadow-md" />
    </button>
  );
}

export function OwnerAddVehiclePage() {
  const [drag, setDrag] = useState(false);
  return (
    <div className="max-w-4xl">
      <PageHeader kicker="Fleet" title="Add New Vehicle" />
      <div className="space-y-6">
        <div className="glass rounded-lg p-6">
          <h3 className="font-display text-xl mb-4">Vehicle Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <SimpleField label="Make" placeholder="Rolls-Royce" />
            <SimpleField label="Model" placeholder="Phantom VIII" />
            <SimpleField label="Year" placeholder="2024" />
            <SimpleField label="Color" placeholder="Obsidian Black" />
            <SimpleField label="Plate" placeholder="LX-1000" />
            <SimpleSelect label="Category" options={["Sedan", "SUV", "Limousine", "Van"]} />
          </div>
        </div>

        <div className="glass rounded-lg p-6">
          <h3 className="font-display text-xl mb-4">Photos</h3>
          <motion.div
            animate={{ scale: drag ? 1.02 : 1, borderColor: drag ? "#C9A84C" : "rgba(201,168,76,0.2)" }}
            onDragOver={e => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={e => { e.preventDefault(); setDrag(false); }}
            className="border-2 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer"
          >
            <Upload size={28} className="text-gold mx-auto mb-3" />
            <div className="text-sm">Drop photos here or click to browse</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-mist mt-2">JPG, PNG · Max 10MB each</div>
          </motion.div>
        </div>

        <div className="glass rounded-lg p-6">
          <h3 className="font-display text-xl mb-4">Assign Chauffeur</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {drivers.slice(0, 6).map((d, i) => (
              <button key={d.id} className={`text-left glass rounded-lg p-4 transition-all ${i === 0 ? "ring-2 ring-gold" : "hover:border-gold/40"}`}>
                <div className="flex items-center gap-3">
                  <img src={d.photo} className="h-12 w-12 rounded-full object-cover" alt="" />
                  <div>
                    <div className="text-sm font-medium">{d.name}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-mist">{d.yearsExperience}y · {d.rating}★</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-lg p-6">
          <h3 className="font-display text-xl mb-4">Pricing</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <SimpleField label="€ / hour" placeholder="180" />
            <SimpleField label="€ / km" placeholder="3" />
            <SimpleField label="Min hours" placeholder="2" />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <GoldButton variant="ghost">Save Draft</GoldButton>
          <GoldButton>Publish Vehicle</GoldButton>
        </div>
      </div>
    </div>
  );
}

export function OwnerBookingsPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];
  const list = filter === "All" ? bookings : bookings.filter(b => b.status === filter);
  return (
    <div>
      <PageHeader kicker="Bookings" title="Manage Reservations" />
      <div className="flex gap-1.5 mb-6">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`relative px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] transition-colors ${filter === f ? "text-obsidian" : "text-mist hover:text-ivory"}`}>
            {filter === f && <motion.span layoutId="bk-pill" className="absolute inset-0 gold-gradient rounded-full" />}
            <span className="relative">{f}</span>
          </button>
        ))}
      </div>
      <div className="glass rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-[0.25em] text-mist border-b border-gold/10">
              <th className="p-4">Ref</th><th>Client</th><th>Vehicle</th><th>Date</th><th>Status</th><th className="text-right pr-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {list.map((b, i) => (
              <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-b border-gold/5 even:bg-white/[0.015] hover:bg-gold/5 transition-colors">
                <td className="p-4 font-mono text-xs text-gold">{b.reference}</td>
                <td>{b.clientName}</td>
                <td className="text-mist text-xs">{getCar(b.carId)?.model}</td>
                <td className="font-mono text-xs">{b.date} {b.time}</td>
                <td><StatusBadge status={b.status} /></td>
                <td className="text-right pr-4 font-mono text-gold">€{b.totalPrice}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function OwnerDriversPage() {
  return (
    <div>
      <PageHeader kicker="Roster" title="My Drivers" action={<GoldButton><Plus size={14} /> Add Driver</GoldButton>} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {drivers.map((d, i) => (
          <Reveal key={d.id} delay={i * 0.06}>
            <div className="glass glass-hover rounded-lg p-6">
              <div className="flex items-center gap-4">
                <img src={d.photo} className="h-16 w-16 rounded-full object-cover border-2 border-gold/40" alt="" />
                <div>
                  <div className="font-display text-xl">{d.name}</div>
                  <StarRating value={d.rating} />
                </div>
              </div>
              <p className="text-mist text-xs italic mt-4 leading-relaxed">"{d.bio}"</p>
              <div className="flex flex-wrap gap-3 mt-4 text-[11px] text-mist">
                <span className="inline-flex items-center gap-1"><Sparkles size={11} className="text-gold" /> {d.yearsExperience}y</span>
                <span className="inline-flex items-center gap-1"><Languages size={11} className="text-gold" /> {d.languages.length} langs</span>
              </div>
              <div className="border-t border-gold/10 mt-5 pt-4 flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-mist">3 upcoming trips</span>
                <button className="text-[10px] uppercase tracking-[0.2em] text-gold hover:underline">Edit</button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function OwnerEarningsPage() {
  return (
    <div className="space-y-6">
      <PageHeader kicker="Earnings" title="Your Performance" />
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="glass rounded-lg p-6 lg:col-span-2">
          <div className="text-[10px] uppercase tracking-[0.25em] text-gold mb-1">Monthly Earnings</div>
          <div className="font-display text-3xl gold-text mb-4"><AnimatedCounter value={58400} prefix="€" /></div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueByMonth}>
              <CartesianGrid stroke="rgba(201,168,76,0.08)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(245,240,232,0.5)" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis stroke="rgba(245,240,232,0.5)" fontSize={11} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1A1A1A", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 6 }} />
              <Bar dataKey="revenue" fill="#C9A84C" radius={[4, 4, 0, 0]} animationDuration={1200} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass rounded-lg p-6">
          <div className="text-[10px] uppercase tracking-[0.25em] text-gold mb-4">By Category</div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={earningsBreakdown} dataKey="value" innerRadius={50} outerRadius={90} animationDuration={1200} stroke="none">
                {earningsBreakdown.map(e => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#1A1A1A", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 6 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {earningsBreakdown.map(e => (
              <div key={e.name} className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: e.color }} /> {e.name}</span>
                <span className="font-mono text-mist">{e.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="glass rounded-lg p-6">
        <div className="text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Payout History</div>
        <table className="w-full text-sm">
          <thead><tr className="text-left text-[10px] uppercase tracking-[0.25em] text-mist border-b border-gold/10"><th className="py-3">Date</th><th>Method</th><th>Reference</th><th className="text-right">Amount</th></tr></thead>
          <tbody>
            {["2026-05-01", "2026-04-01", "2026-03-01", "2026-02-01"].map((d, i) => (
              <tr key={d} className="border-b border-gold/5">
                <td className="py-3 font-mono text-xs">{d}</td>
                <td className="text-mist text-xs">SEPA Bank Transfer</td>
                <td className="font-mono text-xs text-gold">PO-{2000 + i}</td>
                <td className="text-right font-mono text-gold">€{(47200 - i * 8000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------ ADMIN PAGES ------------------------------ */

export function AdminDashboard() {
  const kpis = [
    { label: "Total Users", value: 3640 },
    { label: "Fleet Owners", value: 84 },
    { label: "Active Vehicles", value: 412 },
    { label: "Total Bookings", value: 12480 },
    { label: "Platform Revenue", value: 1248000, prefix: "€" },
  ];
  return (
    <div className="space-y-8">
      <div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">Platform</div>
        <h1 className="font-display text-4xl">Admin Console</h1>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpis.map((k, i) => (
          <Reveal key={k.label} delay={i * 0.06}>
            <div className="glass rounded-lg p-5">
              <div className="text-[10px] uppercase tracking-[0.25em] text-mist mb-2">{k.label}</div>
              <div className="font-display text-2xl gold-text shimmer inline-block">
                <AnimatedCounter value={k.value} prefix={k.prefix} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="glass rounded-lg p-6 lg:col-span-2">
          <div className="text-[10px] uppercase tracking-[0.25em] text-gold mb-4">User Growth</div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={platformGrowth}>
              <CartesianGrid stroke="rgba(201,168,76,0.08)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(245,240,232,0.5)" fontSize={11} />
              <YAxis stroke="rgba(245,240,232,0.5)" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1A1A1A", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 6 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="users" stroke="#C9A84C" strokeWidth={2} animationDuration={1500} />
              <Line type="monotone" dataKey="owners" stroke="#E8C96A" strokeWidth={2} animationDuration={1500} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="glass rounded-lg p-6">
          <div className="text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Recent Activity</div>
          <div className="space-y-3">
            {bookings.slice(0, 5).map((b, i) => (
              <motion.div key={b.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="flex items-center gap-3 text-xs">
                <Bell size={12} className="text-gold shrink-0" />
                <div className="flex-1">
                  <div>{b.clientName} booked <span className="text-gold">{getCar(b.carId)?.model}</span></div>
                  <div className="text-mist text-[10px]">{b.date}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminUsersPage() {
  return (
    <div>
      <PageHeader kicker="Platform" title="Users" />
      <div className="glass rounded-lg overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-gold/10">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist" />
            <input placeholder="Search users…" className="w-full bg-graphite border border-gold/15 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-gold/50" />
          </div>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="text-left text-[10px] uppercase tracking-[0.25em] text-mist border-b border-gold/10"><th className="p-4">Name</th><th>Email</th><th>City</th><th>Bookings</th><th>Joined</th><th>Status</th></tr></thead>
          <tbody>
            {clients.map((u, i) => (
              <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-b border-gold/5 even:bg-white/[0.015] hover:bg-gold/5 transition-colors">
                <td className="p-4">{u.name}</td>
                <td className="text-mist text-xs">{u.email}</td>
                <td className="text-xs"><MapPin size={11} className="inline text-gold mr-1" />{u.city}</td>
                <td className="font-mono text-gold">{u.bookings}</td>
                <td className="font-mono text-xs text-mist">{u.joined}</td>
                <td><StatusBadge status={u.status} /></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminOwnersPage() {
  return (
    <div>
      <PageHeader kicker="Platform" title="Fleet Owners" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {owners.map((o, i) => (
          <Reveal key={o.id} delay={i * 0.08}>
            <div className="glass glass-hover rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-display text-xl">{o.name}</div>
                  <div className="text-xs text-mist mt-1">{o.email}</div>
                </div>
                <StatusBadge status={o.status} />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-gold/10">
                <div><div className="font-mono text-lg text-gold">6</div><div className="text-[9px] uppercase tracking-[0.2em] text-mist">Vehicles</div></div>
                <div><div className="font-mono text-lg text-gold">42</div><div className="text-[9px] uppercase tracking-[0.2em] text-mist">Bookings</div></div>
                <div><div className="font-mono text-lg text-gold">€84k</div><div className="text-[9px] uppercase tracking-[0.2em] text-mist">Revenue</div></div>
              </div>
              {o.status === "Pending" && (
                <div className="flex gap-2 mt-4">
                  <GoldButton size="sm" className="flex-1"><Check size={12} /> Approve</GoldButton>
                  <GoldButton size="sm" variant="ghost" className="flex-1">Reject</GoldButton>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function AdminVehiclesPage() {
  return (
    <div>
      <PageHeader kicker="Moderation" title="All Vehicles" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cars.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.04}>
            <div className="glass glass-hover rounded-lg overflow-hidden">
              <div className="relative h-32">
                <img src={c.images[0]} className="h-full w-full object-cover" alt="" />
                <div className="absolute top-2 right-2">
                  <StatusBadge status={c.approved ? "Active" : "Pending"} />
                </div>
              </div>
              <div className="p-4">
                <div className="font-display text-base">{c.make} {c.model}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-mist mt-1">{c.city} · {c.category}</div>
                {!c.approved && (
                  <div className="flex gap-2 mt-3">
                    <GoldButton size="sm" className="flex-1 !px-2"><Check size={11} /></GoldButton>
                    <GoldButton size="sm" variant="ghost" className="flex-1 !px-2">Reject</GoldButton>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function AdminBookingsPage() {
  return (
    <div>
      <PageHeader kicker="Platform" title="All Bookings" />
      <div className="glass rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-[10px] uppercase tracking-[0.25em] text-mist border-b border-gold/10"><th className="p-4">Ref</th><th>Client</th><th>Vehicle</th><th>Date</th><th>Status</th><th className="text-right pr-4">Amount</th></tr></thead>
          <tbody>
            {bookings.map((b, i) => (
              <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-gold/5 even:bg-white/[0.015] hover:bg-gold/5 transition-colors">
                <td className="p-4 font-mono text-xs text-gold">{b.reference}</td>
                <td>{b.clientName}</td>
                <td className="text-mist text-xs">{getCar(b.carId)?.model}</td>
                <td className="font-mono text-xs">{b.date}</td>
                <td><StatusBadge status={b.status} /></td>
                <td className="text-right pr-4 font-mono text-gold">€{b.totalPrice}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminSettingsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader kicker="Configuration" title="Platform Settings" />
      <div className="glass rounded-lg p-6 space-y-4">
        <h3 className="font-display text-xl">Commission</h3>
        <div className="flex items-center justify-between">
          <div><div className="text-sm">Platform fee per booking</div><div className="text-xs text-mist mt-1">Charged on each completed ride</div></div>
          <div className="flex items-center gap-2"><input defaultValue={15} className="w-16 bg-graphite border border-gold/15 rounded-md px-3 py-2 text-sm text-right font-mono focus:outline-none focus:border-gold/50" /><span className="text-gold font-mono">%</span></div>
        </div>
      </div>
      <div className="glass rounded-lg p-6 space-y-3">
        <h3 className="font-display text-xl mb-2">Feature Flags</h3>
        {[
          { label: "Allow instant booking", desc: "Bookings auto-confirmed without owner approval", on: true },
          { label: "Wedding convoy mode", desc: "Multi-vehicle synchronized bookings", on: true },
          { label: "AI route optimization", desc: "Suggest fastest pickup routes", on: false },
          { label: "Multi-language SMS", desc: "Send confirmations in client's language", on: true },
        ].map(f => (
          <div key={f.label} className="flex items-center justify-between py-2 border-b border-gold/5 last:border-0">
            <div><div className="text-sm">{f.label}</div><div className="text-xs text-mist mt-0.5">{f.desc}</div></div>
            <ToggleSwitch defaultOn={f.on} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <div className="text-[10px] uppercase tracking-[0.25em] text-mist mb-1.5">{label}</div>
      <input placeholder={placeholder} className="w-full bg-graphite border border-gold/15 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-gold/60 focus:shadow-[0_0_0_2px_rgba(201,168,76,0.2)] transition-all" />
    </label>
  );
}
function SimpleSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <div className="text-[10px] uppercase tracking-[0.25em] text-mist mb-1.5">{label}</div>
      <select className="w-full bg-graphite border border-gold/15 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-gold/60 transition-all">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}