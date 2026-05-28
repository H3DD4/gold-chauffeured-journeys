import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function StarRating({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <div className="inline-flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, type: "spring", stiffness: 400, damping: 20 }}
        >
          <Star
            size={size}
            className={i < Math.round(value) ? "fill-[#C9A84C] text-[#C9A84C]" : "text-ivory/20"}
          />
        </motion.span>
      ))}
    </div>
  );
}