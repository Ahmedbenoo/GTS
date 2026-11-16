"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { pageTitles, type PagePath } from "@/lib/page-titles";

const LANG_KEY = "gts-lang";

function pagePath(pathname: string): PagePath {
  const path = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  if (path in pageTitles.ar) return path as PagePath;
  return "/";
}

function savedLocale(): "ar" | "en" {
  try {
    return sessionStorage.getItem(LANG_KEY) === "en" ? "en" : "ar";
  } catch {
    return "ar";
  }
}

export function applyLanguage(locale: "ar" | "en") {
  const root = document.documentElement;
  root.lang = locale === "en" ? "en" : "ar";
  root.dir = locale === "en" ? "ltr" : "rtl";
  try {
    sessionStorage.setItem(LANG_KEY, locale);
  } catch {
    /* private mode */
  }
  document.cookie = `${LANG_KEY}=; Path=/; Max-Age=0`;
  const path = pagePath(window.location.pathname);
  const title = pageTitles[locale][path];
  if (document.title !== title) document.title = title;
}

export function LangToggle() {
  return (
    <button
      type="button"
      className="lang-toggle"
      aria-label="عربي / English"
      onClick={() => applyLanguage(document.documentElement.dir === "ltr" ? "ar" : "en")}
    >
      <span className="gts-ar">EN</span>
      <span className="gts-en">عربي</span>
    </button>
  );
}

export function TitleSync() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const locale = savedLocale();
    const root = document.documentElement;
    root.lang = locale === "en" ? "en" : "ar";
    root.dir = locale === "en" ? "ltr" : "rtl";
    const title = pageTitles[locale][pagePath(pathname)];
    if (document.title !== title) document.title = title;
  }, [pathname]);

  useEffect(() => {
    let writing = false;
    const apply = () => {
      if (writing) return;
      const locale = document.documentElement.dir === "ltr" ? "en" : "ar";
      const title = pageTitles[locale][pagePath(pathname)];
      if (document.title === title) return;
      writing = true;
      document.title = title;
      writing = false;
    };
    apply();
    const titleNode = document.querySelector("title");
    if (!titleNode) return;
    const watch = new MutationObserver(apply);
    watch.observe(titleNode, { childList: true, characterData: true, subtree: true });
    return () => watch.disconnect();
  }, [pathname]);

  return null;
}
