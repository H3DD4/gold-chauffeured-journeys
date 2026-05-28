import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { PortalSwitcher } from "@/components/PortalSwitcher";
import { Bell, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/fleet", label: "Fleet" },
  { to: "/booking", label: "Book" },
  { to: "/my-bookings", label: "My Rides" },
] as const;

export function ClientLayout() {
  const path = useRouterState({ select: s => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["rgba(10,10,10,0)", "rgba(10,10,10,0.85)"]);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <div className="min-h-screen text-ivory" style={{ background: "var(--obsidian)" }}>
      <motion.header
        style={{ backgroundColor: bg }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? "backdrop-blur-xl border-b border-gold/10" : ""}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-display text-xl tracking-[0.3em] text-ivory hover:text-gold transition-colors">
            ARRIVÉE<span className="text-gold">.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            {links.map(l => {
              const active = l.to === "/" ? path === "/" : path.startsWith(l.to);
              return (
                <Link key={l.to} to={l.to} className="relative text-[11px] uppercase tracking-[0.28em] text-ivory/70 hover:text-ivory transition-colors py-1">
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <button className="relative text-ivory/70 hover:text-gold transition-colors">
              <Bell size={16} />
              <span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-gold pulse-gold" />
            </button>
            <Link to="/login" className="text-[11px] uppercase tracking-[0.28em] text-ivory/70 hover:text-gold transition-colors">
              Sign In
            </Link>
          </div>
          <button className="md:hidden text-ivory" onClick={() => setMobile(!mobile)}>
            {mobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobile && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="md:hidden overflow-hidden bg-obsidian border-t border-gold/10">
            <div className="flex flex-col px-6 py-4 gap-3">
              {links.map(l => (
                <Link key={l.to} to={l.to} onClick={() => setMobile(false)} className="text-sm uppercase tracking-[0.2em] py-2">{l.label}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-gold/10 mt-32" style={{ background: "var(--charcoal)" }}>
        <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-12">
          <div>
            <div className="font-display text-xl tracking-[0.3em]">ARRIVÉE<span className="text-gold">.</span></div>
            <p className="text-mist text-sm mt-4 leading-relaxed">Chauffeured arrivals for those who notice the details.</p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-gold mb-4">Service</h4>
            <ul className="space-y-2 text-sm text-mist">
              <li>Airport Transfers</li><li>Gala & Events</li><li>Wedding Convoys</li><li>Corporate</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-gold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-mist">
              <li>About</li><li>Drivers</li><li>Cities</li><li>Press</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-gold mb-4">Newsletter</h4>
            <p className="text-sm text-mist mb-3">Quiet updates, never spam.</p>
            <div className="flex">
              <input
                placeholder="your@email.com"
                className="flex-1 bg-graphite border border-gold/20 px-3 py-2 text-sm rounded-l-sm focus:outline-none focus:ring-2 focus:ring-gold transition-shadow"
              />
              <button className="gold-gradient text-obsidian px-4 text-xs uppercase tracking-[0.2em] rounded-r-sm">Join</button>
            </div>
          </div>
        </div>
        <div className="border-t border-gold/10 py-6 text-center text-[10px] uppercase tracking-[0.3em] text-mist">
          © 2026 Arrivée — Crafted in obsidian & gold
        </div>
      </footer>

      <PortalSwitcher />
    </div>
  );
}