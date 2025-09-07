"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/** Floating parallax card: moves opposite to pointer */
export default function FloatingParallaxCard() {
  const ref = useRef<HTMLDivElement | null>(null);

  // raw deltas (mouse pos relative to center of the card)
  const dx = useMotionValue(0);
  const dy = useMotionValue(0);

  // soften with springs
  const x = useSpring(dx, { stiffness: 120, damping: 15, mass: 0.2 });
  const y = useSpring(dy, { stiffness: 120, damping: 15, mass: 0.2 });

  // translate opposite to pointer (negative multiplier)
  const STRENGTH = 20; // px of max travel
  const tx = useTransform(x, (v) => (-v / 2) * (STRENGTH / 100)); // scale from %
  const ty = useTransform(y, (v) => (-v / 2) * (STRENGTH / 100));

  // tiny tilt for depth
  const rotX = useTransform(y, (v) => v * -0.05);
  const rotY = useTransform(x, (v) => v * 0.05);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    // deltas in percent of half-size (so -100..100)
    const px = ((e.clientX - cx) / (r.width / 2)) * 100;
    const py = ((e.clientY - cy) / (r.height / 2)) * 100;
    dx.set(Math.max(-100, Math.min(100, px)));
    dy.set(Math.max(-100, Math.min(100, py)));
  }

  function handleLeave() {
    dx.set(0);
    dy.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        translateX: tx, // opposite motion
        translateY: ty,
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-150 rounded-2xl overflow-hidden 
                 border border-white/10 bg-white/5 backdrop-blur 
                 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]"
    >
      <Image
        src="/res/SankalpNaik-removebg-preview.png"             // <-- your image path
        alt="Profile"
        fill                                // fill parent
        className="object-cover select-none pointer-events-none"
        priority
      />
      {/* Optional soft vignette to emphasize depth */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
    </motion.div>
  );
}
