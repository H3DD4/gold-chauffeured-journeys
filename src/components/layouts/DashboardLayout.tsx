import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { PortalSwitcher } from "@/components/PortalSwitcher";
import { Bell, ChevronLeft, Search, type LucideIcon } from "lucide-react";

export type NavItem = { to: string; label: string; icon: LucideIcon; exact?: boolean };

export function DashboardLayout({
  brand, subtitle, nav, userName, userRole,
}: {
  brand: string; subtitle: string; nav: NavItem[]; userName: string; userRole: string;
}) {
  const path = useRouterState({ select: s => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full text-ivory" style={{ background: "var(--obsidian)" }}>
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sticky top-0 h-screen border-r border-gold/10 flex flex-col overflow-hidden"
        style={{ background: "var(--charcoal)" }}
      >
        <div className="flex items-center justify-between px-5 py-6 border-b border-gold/10">
          {!collapsed && (
            <div>
              <div className="font-display text-lg tracking-[0.25em]">{brand}</div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-gold mt-1">{subtitle}</div>
            </div>
          )}
          <button onClick={() => setCollapsed(c => !c)} className="text-mist hover:text-gold transition-colors">
            <ChevronLeft size={16} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-hide">
          {nav.map(item => {
            const active = item.exact ? path === item.to : path === item.to || path.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                  active ? "bg-gold/10 text-gold" : "text-ivory/70 hover:bg-white/5 hover:text-ivory"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1 bottom-1 w-0.5 bg-gold rounded-r"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon size={16} className="shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="border-t border-gold/10 p-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full gold-gradient flex items-center justify-center text-obsidian font-bold text-xs">
                {userName.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div className="min-w-0">
                <div className="text-sm truncate">{userName}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-mist">{userRole}</div>
              </div>
            </div>
          </div>
        )}
      </motion.aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-gold/10" style={{ background: "rgba(10,10,10,0.7)" }}>
          <div className="flex items-center gap-4 px-8 py-4">
            <div className="relative flex-1 max-w-md">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist" />
              <input
                placeholder="Search bookings, vehicles, drivers…"
                className="w-full bg-graphite border border-gold/15 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <button className="relative text-mist hover:text-gold transition-colors">
              <Bell size={16} />
              <motion.span
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 4 }}
                className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-gold pulse-gold"
              />
            </button>
          </div>
        </header>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>

      <PortalSwitcher />
    </div>
  );
}