"use client";

import { useState, type FormEvent } from "react";
import { company, phones, services, whatsappLink } from "@/lib/content";
import { enOf } from "@/lib/en-map";
import { FacebookIcon } from "./Mark";
import { Tx } from "./Tx";

const copy = {
  ar: {
    name: "الاسم",
    namePh: "اسمك",
    mobile: "الموبايل",
    service: "الخدمة",
    message: "رسالتك",
    messagePh: "المساحة، المحصول، أو نوع العطل",
    general: "استفسار عام",
    nameError: "اكتب الاسم.",
    mobileError: "اكتب رقم موبايل صحيح.",
    sent: "واتساب هيفتح بالرسالة جاهزة. لو المتصفح منع النافذة، اضغط الزر تاني.",
    submit: "إرسال عبر واتساب",
    lines: ["طلب تواصل من موقع GTS", "الاسم", "الموبايل", "الخدمة", "الرسالة"],
  },
  en: {
    name: "Name",
    namePh: "Your name",
    mobile: "Mobile",
    service: "Service",
    message: "Your message",
    messagePh: "Area, crop, or the fault",
    general: "General inquiry",
    nameError: "Enter your name.",
    mobileError: "Enter a valid mobile number.",
    sent: "WhatsApp will open with the message ready. If the browser blocked the window, press the button again.",
    submit: "Send via WhatsApp",
    lines: ["Contact request from the GTS website", "Name", "Mobile", "Service", "Message"],
  },
} as const;

function ContactForm({ lang }: { lang: "ar" | "en" }) {
  const t = copy[lang];
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const mobile = String(data.get("mobile") || "").trim();
    const service = String(data.get("service") || t.general).trim();
    const message = String(data.get("message") || "").trim();
    const digits = mobile.replace(/\D/g, "");

    if (name.length < 2) {
      setError(t.nameError);
      return;
    }
    if (digits.length < 10) {
      setError(t.mobileError);
      return;
    }

    setError("");
    setSent(true);
    const url = whatsappLink(
      [
        t.lines[0],
        `${t.lines[1]}: ${name}`,
        `${t.lines[2]}: ${mobile}`,
        `${t.lines[3]}: ${service}`,
        `${t.lines[4]}: ${message || "—"}`,
      ].join("\n"),
    );
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form className={`contact-form gts-lang-${lang}`} onSubmit={onSubmit}>
      <label>
        {t.name}
        <input name="name" autoComplete="name" required placeholder={t.namePh} />
      </label>
      <label>
        {t.mobile}
        <input
          name="mobile"
          autoComplete="tel"
          inputMode="tel"
          required
          placeholder="01xxxxxxxxx"
        />
      </label>
      <label>
        {t.service}
        <select name="service" defaultValue={lang === "ar" ? services[0].title : enOf(services[0].title)}>
          {services.map((service) => {
            const label = lang === "ar" ? service.title : enOf(service.title);
            return (
              <option key={service.num} value={label}>
                {label}
              </option>
            );
          })}
          <option value={t.general}>{t.general}</option>
        </select>
      </label>
      <label>
        {t.message}
        <textarea name="message" rows={4} placeholder={t.messagePh} />
      </label>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      {sent ? (
        <p className="form-note" role="status">
          {t.sent}
        </p>
      ) : null}
      <button className="btn btn-gold" type="submit">
        {t.submit}
      </button>
    </form>
  );
}

export function Contact() {
  return (
    <section className="section section-dark contact" id="contact">
      <div className="wrap contact-grid reveal-group">
        <div>
          <p className="kicker"><Tx text="تواصل" /></p>
          <span className="furrow" aria-hidden="true" />
          <h2 className="h2 contact-title">
            <Tx text="سيبلنا مشكلتك وهنرد عليك بالحل المناسب" />
          </h2>
          <p className="lead">
            <span className="gts-ar">
              المقر في {company.address.city}، {company.address.line}، {company.address.note}.
            </span>
            <span className="gts-en">
              The office is in 6th of October City, El Nagda Square — Central Axis, beside the Administrative Prosecution.
            </span>
          </p>
          <ul className="contact-list">
            {phones.map((phone) => (
              <li key={phone.tel}>
                <span><Tx text={phone.label} /></span>
                <a href={`tel:${phone.tel}`}>
                  <span className="num" dir="ltr">
                    {phone.display}
                  </span>
                </a>
              </li>
            ))}
            <li>
              <span><Tx text="العنوان" /></span>
              <a
                className="contact-address"
                href={company.address.maps}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Tx text={company.address.city} />
                <br />
                <Tx text={company.address.line} />
              </a>
            </li>
            <li>
              <span><Tx text="السوشيال ميديا" /></span>
              <div className="socials">
                <a
                  href={company.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="فيسبوك · Facebook"
                >
                  <FacebookIcon />
                </a>
              </div>
            </li>
          </ul>
        </div>

        <ContactForm lang="ar" />
        <ContactForm lang="en" />
      </div>
    </section>
  );
}
