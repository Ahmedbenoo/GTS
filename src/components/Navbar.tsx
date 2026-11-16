"use client";

import { useEffect, useState, type AnimationEvent } from "react";
import { usePathname } from "next/navigation";
import { company, nav } from "@/lib/content";
import { LangToggle } from "./Language";
import { Logo } from "./Mark";
import { Tx } from "./Tx";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [phase, setPhase] = useState<"closed" | "open" | "closing">("closed");
  const onHome = pathname === "/";
  const menuVisible = phase !== "closed";

  function closeMenu() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPhase(reduce ? "closed" : "closing");
  }

  function toggleMenu() {
    if (phase === "open") closeMenu();
    else setPhase("open");
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuVisible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuVisible]);

  useEffect(() => {
    if (phase !== "open") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  function onMenuAnimationEnd(event: AnimationEvent<HTMLElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.animationName !== "menu-out") return;
    setPhase((value) => (value === "closing" ? "closed" : value));
  }

  return (
    <>
      <header
        className={[
          "nav",
          !onHome || scrolled || menuVisible ? "nav-on" : "",
          menuVisible ? "nav-cover" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <a className="nav-brand" href="/">
          <Logo />
          <span className="sr-only"><Tx text={company.fullName} /></span>
        </a>

        <nav className="nav-links" aria-label="التنقل الرئيسي · Main">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={active ? "is-active" : undefined}
                aria-current={active ? "page" : undefined}
              >
                <Tx text={item.label} />
              </a>
            );
          })}
        </nav>

        <div className="nav-end">
          <LangToggle />
          <a className="btn btn-gold nav-cta" href="/#contact">
            <Tx text="تواصل معنا" />
          </a>
          <button
            type="button"
            className={menuVisible ? "nav-burger is-open" : "nav-burger"}
            aria-expanded={phase === "open"}
            aria-label={phase === "open" ? "إغلاق القائمة · Close menu" : "فتح القائمة · Open menu"}
            onClick={toggleMenu}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {menuVisible ? (
        <nav
          className={phase === "closing" ? "nav-menu is-closing" : "nav-menu is-open"}
          aria-label="قائمة الجوال · Menu"
          onAnimationEnd={onMenuAnimationEnd}
        >
          {nav.map((item, index) => {
            const active = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={active ? "is-active" : undefined}
                aria-current={active ? "page" : undefined}
                onClick={closeMenu}
              >
                <em>{String(index + 1).padStart(2, "0")}</em>
                <Tx text={item.label} />
              </a>
            );
          })}
          <a
            className="btn btn-gold"
            href="/#contact"
            onClick={closeMenu}
          >
            <Tx text="تواصل معنا" />
          </a>
        </nav>
      ) : null}

    </>
  );
}
