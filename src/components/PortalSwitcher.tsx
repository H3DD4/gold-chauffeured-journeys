import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, User, Car, Shield } from "lucide-react";
import { useState } from "react";

const portals = [
  { label: "Client", path: "/", icon: User, desc: "Browse & book" },
  { label: "Fleet Owner", path: "/owner", icon: Car, desc: "Manage fleet" },
  { label: "Admin", path: "/admin", icon: Shield, desc: "Platform" },
] as const;

export function PortalSwitcher() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const current =
    path.startsWith("/admin") ? portals[2] :
    path.startsWith("/owner") ? portals[1] :
    portals[0];

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <div className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          className="glass glass-hover flex items-center gap-3 rounded-full px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-ivory shadow-2xl shadow-black/50"
        >
          <span className="text-gold text-[10px]">DEV</span>
          <span className="h-3 w-px bg-gold/30" />
          <current.icon size={14} className="text-gold" />
          {current.label}
          <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="glass absolute bottom-full right-0 mb-3 w-64 rounded-lg p-2"
            >
              {portals.map(p => {
                const active = current.label === p.label;
                return (
                  <Link
                    key={p.path}
                    to={p.path}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-md p-3 transition-colors ${active ? "bg-gold/10 text-gold" : "hover:bg-white/5 text-ivory"}`}
                  >
                    <p.icon size={16} />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{p.label}</div>
                      <div className="text-[10px] uppercase tracking-[0.15em] text-mist">{p.desc}</div>
                    </div>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}