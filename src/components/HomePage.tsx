"use client";

import { useEffect, useState } from "react";
import { Contact } from "./Contact";
import { Footer, WhatsFloat } from "./Footer";
import { Hero } from "./Hero";
import { Loader } from "./Loader";
import { Navbar } from "./Navbar";
import { Marquee, Process, Quote, Services, Systems, Why } from "./Sections";

export function HomePage() {
  const [showLoader, setShowLoader] = useState(true);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("gts-intro") === "1";
    if (reduceMotion || seen) setShowLoader(false);
  }, []);

  useEffect(() => {
    if (!showLoader) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [showLoader]);

  return (
    <>
      {showLoader ? (
        <Loader
          onReveal={() => {
            sessionStorage.setItem("gts-intro", "1");
            setBooted(true);
          }}
          onDone={() => setShowLoader(false)}
        />
      ) : null}
      <Navbar />
      <main>
        <Hero active={booted} />
        <Marquee />
        <Services />
        <Quote />
        <Why />
        <Systems />
        <Process />
        <Contact />
      </main>
      <Footer />
      <WhatsFloat />
    </>
  );
}
