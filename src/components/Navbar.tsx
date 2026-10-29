"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { company, nav } from "@/lib/content";
import { Logo } from "./Mark";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [soon, setSoon] = useState(0);
  const onHome = pathname === "/";

  function showSoon() {
    setOpen(false);
    setSoon((value) => value + 1);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!soon) return;
    const timer = window.setTimeout(() => setSoon(0), 2400);
    return () => window.clearTimeout(timer);
  }, [soon]);

  return (
    <header className={!onHome || scrolled || open ? "nav nav-on" : "nav"}>
      <a className="nav-brand" href="/">
        <Logo priority />
        <span>
          <strong>GTS</strong>
          <small>للاستثمار الزراعي</small>
        </span>
      </a>

      <nav className="nav-links" aria-label="التنقل الرئيسي">
        {nav.map((item) =>
          item.href === "/" ? (
            <a
              key={item.href}
              href="/"
              className={pathname === "/" ? "is-active" : undefined}
              aria-current={pathname === "/" ? "page" : undefined}
            >
              {item.label}
            </a>
          ) : (
            <button key={item.href} type="button" className="nav-idle" onClick={showSoon}>
              {item.label}
            </button>
          ),
        )}
      </nav>

      <a className="btn btn-gold nav-cta" href="/#contact">
        تواصل معنا
      </a>

      <button
        type="button"
        className={open ? "nav-burger is-open" : "nav-burger"}
        aria-expanded={open}
        aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.nav
            className="nav-menu"
            aria-label="قائمة الجوال"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {nav.map((item, index) =>
              item.href === "/" ? (
                <motion.a
                  key={item.href}
                  href="/"
                  className={pathname === "/" ? "is-active" : undefined}
                  aria-current={pathname === "/" ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index + 0.05 }}
                >
                  <em>{String(index + 1).padStart(2, "0")}</em>
                  {item.label}
                </motion.a>
              ) : (
                <motion.button
                  key={item.href}
                  type="button"
                  className="nav-idle"
                  onClick={showSoon}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index + 0.05 }}
                >
                  <em>{String(index + 1).padStart(2, "0")}</em>
                  {item.label}
                </motion.button>
              ),
            )}
            <a className="btn btn-gold" href="/#contact" onClick={() => setOpen(false)}>
              تواصل معنا
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {soon ? (
          <motion.div
            key={soon}
            className="soon"
            role="status"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <strong>COMING SOON</strong>
            <span>قريبًا</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <span className="sr-only">{company.fullName}</span>
    </header>
  );
}
