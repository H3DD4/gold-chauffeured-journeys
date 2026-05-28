import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { GoldButton } from "@/components/animated/GoldButton";
import { GoldDust } from "@/components/animated/GoldDust";

export function AuthPage({ mode }: { mode: "login" | "register" }) {
  const isLogin = mode === "login";
  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 flex items-center justify-center overflow-hidden">
      <GoldDust count={20} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 glass rounded-lg p-10 w-full max-w-md"
      >
        <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-3">{isLogin ? "Welcome back" : "Join Arrivée"}</div>
        <h1 className="font-display text-4xl mb-2">{isLogin ? "Sign in." : "Create account."}</h1>
        <p className="text-mist text-sm mb-8">{isLogin ? "Your arrivals await." : "A few seconds. Then quietly chauffeured."}</p>

        <form className="space-y-4">
          {!isLogin && <Field icon={User} type="text" placeholder="Full name" />}
          <Field icon={Mail} type="email" placeholder="Email address" />
          <Field icon={Lock} type="password" placeholder="Password" />
          {isLogin && (
            <div className="text-right">
              <a className="text-[10px] uppercase tracking-[0.25em] text-mist hover:text-gold cursor-pointer">Forgot password?</a>
            </div>
          )}
          <GoldButton type="button" size="lg" className="w-full mt-4">
            {isLogin ? "Sign in" : "Create account"} <ArrowRight size={14} />
          </GoldButton>
        </form>

        <div className="text-center mt-6 text-xs text-mist">
          {isLogin ? "New here?" : "Already with us?"}{" "}
          <Link to={isLogin ? "/register" : "/login"} className="text-gold hover:underline">
            {isLogin ? "Create an account" : "Sign in"}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

function Field({ icon: Icon, ...rest }: { icon: typeof Mail } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center gap-3 bg-graphite border border-gold/15 rounded-md px-4 py-3.5 focus-within:border-gold/60 focus-within:shadow-[0_0_0_2px_rgba(201,168,76,0.2)] transition-all">
      <Icon size={16} className="text-gold/70 shrink-0" />
      <input {...rest} className="bg-transparent w-full focus:outline-none text-sm placeholder:text-mist/40" />
    </div>
  );
}