import React, { useEffect, useRef, useState } from "react";

/**
 * Holiday cursor: a small red->green dot that follows the pointer.
 * Shows automatically in December or if NEXT_PUBLIC_HOLIDAY_CURSOR=1.
 * Disabled on touch devices (no hover).
 */
export default function HolidayCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isDec = new Date().getMonth() === 11; // December (0-based)
    const forced = process?.env?.NEXT_PUBLIC_HOLIDAY_CURSOR === "1";
    const canHover =
      typeof window !== "undefined" ? !window.matchMedia?.("(hover: none)").matches : false;

    console.log("HolidayCursor:", { isDec, forced, canHover });

    setEnabled((isDec || forced) && canHover);
    if (!((isDec || forced) && canHover)) return;

    const el = dotRef.current;
    // make visible immediately for easier testing (still hides when not hovered)
    setTimeout(() => { if (el) el.style.opacity = "0.9"; }, 50);

    function onMove(e: PointerEvent) {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (el) el.style.opacity = "1";
    }

    function loop() {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (el) {
        el.style.transform = `translate3d(${pos.current.x - 12}px, ${pos.current.y - 12}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    }

    window.addEventListener("pointermove", onMove);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed z-[9999] w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-green-500 shadow-2xl opacity-0 transition-opacity duration-200"
    />
  );
}