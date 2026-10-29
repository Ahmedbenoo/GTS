"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pivot } from "./Mark";

const RADIUS = 54;
const CIRC = 2 * Math.PI * RADIUS;

export function Loader({
  onReveal,
  onDone,
}: {
  onReveal: () => void;
  onDone: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"run" | "exit">("run");
  const revealRef = useRef(onReveal);
  const doneRef = useRef(onDone);

  useEffect(() => {
    revealRef.current = onReveal;
    doneRef.current = onDone;
  });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("gts-intro") === "1";
    if (reduceMotion || seen) {
      doneRef.current();
      return;
    }

    let frame = 0;
    let timer = 0;
    const start = performance.now();
    const duration = 2800;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      setProgress(100);
      revealRef.current();
      timer = window.setTimeout(() => setPhase("exit"), 420);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <motion.div
      className="loader"
      role="status"
      aria-live="polite"
      aria-label="جاري فتح الموقع"
      initial={false}
      animate={{
        clipPath:
          phase === "exit" ? "circle(0% at 50% 46%)" : "circle(150% at 50% 46%)",
      }}
      transition={
        phase === "exit"
          ? { duration: 1.05, ease: [0.76, 0, 0.24, 1] }
          : { duration: 0 }
      }
      onAnimationComplete={() => {
        if (phase === "exit") doneRef.current();
      }}
    >
      <div className="loader-core">
        <div className="loader-ring-wrap">
          <svg className="loader-ring" viewBox="0 0 120 120" aria-hidden="true">
            <circle className="ring-track" cx="60" cy="60" r={RADIUS} />
            <circle
              className="ring-value"
              cx="60"
              cy="60"
              r={RADIUS}
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC - (progress / 100) * CIRC}
            />
          </svg>
          <Pivot />
        </div>
        <p className="loader-kicker">GTS Agriculture</p>
        <p className="loader-brand">GTS</p>
        <p className="loader-sub">للاستثمار الزراعي</p>
        <p className="loader-count">{String(progress).padStart(3, "0")}</p>
      </div>
      <div className="loader-line" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
    </motion.div>
  );
}
