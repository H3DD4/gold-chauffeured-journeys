import { useMemo } from "react";

export function GoldDust({ count = 30 }: { count?: number }) {
  const dust = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 10,
        size: 1 + Math.random() * 2.5,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dust.map(d => (
        <span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            bottom: "-10vh",
            width: d.size,
            height: d.size,
            background: "#E8C96A",
            boxShadow: "0 0 4px #C9A84C",
            animation: `float-dust ${d.duration}s linear infinite`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}