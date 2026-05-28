import { motion } from "framer-motion";
import { TrendingUp, Car, Calendar, Star, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { AnimatedCounter } from "@/components/animated/AnimatedCounter";
import { StatusBadge } from "@/components/animated/StatusBadge";
import { Reveal } from "@/components/animated/Reveal";
import { bookings, cars, revenueByMonth, getCar } from "@/lib/mock-data";

const kpis = [
  { icon: TrendingUp, label: "Revenue (MTD)", value: 58400, prefix: "€", color: "#C9A84C" },
  { icon: Calendar, label: "Active Bookings", value: 14, color: "#E8C96A" },
  { icon: Car, label: "Fleet Size", value: 6, color: "#C9A84C" },
  { icon: Star, label: "Avg Rating", value: 4.87, decimals: 2, color: "#E8C96A" },
];

export function OwnerDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">Owner Dashboard</div>
        <h1 className="font-display text-4xl">Good evening, Marcus.</h1>
        <p className="text-mist text-sm mt-2">Here's how your fleet is performing this month.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((k, i) => (
          <Reveal key={k.label} delay={i * 0.08}>
            <div className="glass rounded-lg p-6 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-md bg-gold/10 flex items-center justify-center text-gold">
                  <k.icon size={16} />
                </div>
                <ArrowUpRight size={14} className="text-mist group-hover:text-gold transition-colors" />
              </div>
              <div className="font-display text-3xl gold-text shimmer inline-block">
                <AnimatedCounter value={k.value} prefix={k.prefix} decimals={k.decimals ?? 0} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-mist mt-2">{k.label}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Reveal>
          <div className="glass rounded-lg p-6">
            <div className="flex justify-between items-baseline mb-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-gold">Revenue</div>
                <div className="font-display text-2xl mt-1">Last 6 months</div>
              </div>
              <div className="font-mono text-2xl gold-text">€229,000</div>
            </div>
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
        </Reveal>
        <Reveal delay={0.1}>
          <div className="glass rounded-lg p-6">
            <div className="flex justify-between items-baseline mb-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-gold">Bookings</div>
                <div className="font-display text-2xl mt-1">Trend</div>
              </div>
              <div className="font-mono text-2xl gold-text">305</div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={revenueByMonth}>
                <CartesianGrid stroke="rgba(201,168,76,0.08)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(245,240,232,0.5)" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(245,240,232,0.5)" fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#1A1A1A", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 6 }} />
                <Line type="monotone" dataKey="bookings" stroke="#E8C96A" strokeWidth={2} dot={{ fill: "#C9A84C", r: 4 }} animationDuration={1500} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="glass rounded-lg p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold">Upcoming</div>
              <div className="font-display text-2xl mt-1">Bookings</div>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[0.25em] text-mist border-b border-gold/10">
                <th className="py-3">Ref</th><th>Client</th><th>Vehicle</th><th>Date</th><th>Status</th><th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map((b, i) => (
                <motion.tr key={b.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="border-b border-gold/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 font-mono text-xs text-gold">{b.reference}</td>
                  <td>{b.clientName}</td>
                  <td className="text-mist text-xs">{getCar(b.carId)?.model}</td>
                  <td className="font-mono text-xs">{b.date}</td>
                  <td><StatusBadge status={b.status} /></td>
                  <td className="text-right font-mono text-gold">€{b.totalPrice}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  );
}