import { motion } from "framer-motion";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
};

export const GoldButton = forwardRef<HTMLButtonElement, Props>(function GoldButton(
  { variant = "primary", size = "md", className, children, ...rest },
  ref,
) {
  const sizes = {
    sm: "px-4 py-2 text-[10px] tracking-[0.2em]",
    md: "px-6 py-3 text-xs tracking-[0.22em]",
    lg: "px-9 py-4 text-sm tracking-[0.28em]",
  };
  const base = "relative inline-flex items-center justify-center gap-2 font-medium uppercase rounded-sm transition-colors overflow-hidden";
  const variants = {
    primary: "gold-gradient text-[#0A0A0A] shimmer hover:brightness-110",
    ghost: "border border-gold/40 text-ivory hover:border-gold hover:text-gold",
    outline: "border border-ivory/20 text-ivory hover:border-gold hover:text-gold",
  };
  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(base, sizes[size], variants[variant], className)}
      {...(rest as never)}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );
});