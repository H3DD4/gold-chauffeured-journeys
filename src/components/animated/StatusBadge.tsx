import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  Pending: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
  Confirmed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  "En Route": "bg-blue-500/10 text-blue-300 border-blue-500/30",
  Completed: "bg-gold/10 text-gold border-gold/30",
  Cancelled: "bg-red-500/10 text-red-300 border-red-500/30",
  Active: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  VIP: "bg-gold/15 text-gold border-gold/40",
  New: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  Suspended: "bg-red-500/10 text-red-300 border-red-500/30",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const variant = styles[status] ?? "bg-white/5 text-ivory border-white/15";
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] font-medium", variant, className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}