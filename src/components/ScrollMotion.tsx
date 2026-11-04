"use client";

import { useEffect } from "react";

export function ScrollMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const root = document.documentElement;
    const nodes = document.querySelectorAll(".reveal, .reveal-group > *, .furrow");
    const pending = new Set(nodes);
    let seen: IntersectionObserver;
    const mark = (node: Element) => {
      node.classList.add("is-in");
      if (node instanceof HTMLElement) node.dataset.seen = "1";
      pending.delete(node);
      seen.unobserve(node);
    };
    const scan = () => {
      const limit = window.innerHeight * 0.94;
      pending.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.height > 0 && rect.bottom > 0 && rect.top < limit) mark(node);
      });
    };
    seen = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          mark(entry.target);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
    );

    root.classList.add("motion");
    nodes.forEach((node) => seen.observe(node));
    scan();

    const quote = document.querySelector<HTMLElement>(".quote");
    const drift = document.querySelector<HTMLElement>(".quote-drift");
    let frame = 0;
    const onScroll = () => {
      if (!quote || !drift) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = quote.getBoundingClientRect();
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const y = Math.max(-1, Math.min(1, progress)) * 36 - 18;
        drift.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      });
    };
    const onScrollSeen = () => {
      onScroll();
      scan();
    };
    onScrollSeen();
    window.addEventListener("scroll", onScrollSeen, { passive: true });

    return () => {
      seen.disconnect();
      window.removeEventListener("scroll", onScrollSeen);
      cancelAnimationFrame(frame);
      root.classList.remove("motion");
      document.querySelectorAll(".is-in").forEach((node) => node.classList.remove("is-in"));
      document.querySelectorAll<HTMLElement>("[data-seen]").forEach((node) => {
        delete node.dataset.seen;
      });
      if (drift) drift.style.transform = "";
    };
  }, []);

  return null;
}
