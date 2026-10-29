"use client";

import { useState, type FormEvent } from "react";
import { company, phones, services, whatsappLink } from "@/lib/content";
import { FacebookIcon } from "./Mark";

export function Contact() {
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const mobile = String(data.get("mobile") || "").trim();
    const service = String(data.get("service") || "استفسار عام").trim();
    const message = String(data.get("message") || "").trim();
    const digits = mobile.replace(/\D/g, "");

    if (name.length < 2) {
      setError("اكتب الاسم.");
      return;
    }
    if (digits.length < 10) {
      setError("اكتب رقم موبايل صحيح.");
      return;
    }

    setError("");
    setSent(true);
    const url = whatsappLink(
      [
        "طلب تواصل من موقع GTS",
        `الاسم: ${name}`,
        `الموبايل: ${mobile}`,
        `الخدمة: ${service}`,
        `الرسالة: ${message || "—"}`,
      ].join("\n"),
    );
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="section section-dark contact" id="contact">
      <div className="wrap contact-grid">
        <div>
          <p className="kicker">تواصل</p>
          <h2 className="h2 contact-title">قولنا نوع الأرض، ونرجعلك بالنظام المناسب.</h2>
          <p className="lead">
            المقر في {company.address.city}، {company.address.line}،{" "}
            {company.address.note}.
          </p>
          <ul className="contact-list">
            {phones.map((phone) => (
              <li key={phone.tel}>
                <span>{phone.label}</span>
                <a href={`tel:${phone.tel}`}>
                  <span className="num" dir="ltr">
                    {phone.display}
                  </span>
                </a>
              </li>
            ))}
            <li>
              <span>العنوان</span>
              <a
                className="contact-address"
                href={company.address.maps}
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.address.city}
                <br />
                {company.address.line}
              </a>
            </li>
            <li>
              <span>السوشيال ميديا</span>
              <div className="socials">
                <a
                  href={company.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="فيسبوك"
                >
                  <FacebookIcon />
                </a>
              </div>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
          <label>
            الاسم
            <input name="name" autoComplete="name" required placeholder="اسمك" />
          </label>
          <label>
            الموبايل
            <input
              name="mobile"
              autoComplete="tel"
              inputMode="tel"
              required
              placeholder="01xxxxxxxxx"
            />
          </label>
          <label>
            الخدمة
            <select name="service" defaultValue="الري المحوري">
              {services.map((service) => (
                <option key={service.num} value={service.title}>
                  {service.title}
                </option>
              ))}
              <option value="استفسار عام">استفسار عام</option>
            </select>
          </label>
          <label>
            رسالتك
            <textarea name="message" rows={4} placeholder="المساحة، المحصول، أو نوع العطل" />
          </label>
          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : null}
          {sent ? (
            <p className="form-note" role="status">
              واتساب هيفتح بالرسالة جاهزة. لو المتصفح منع النافذة، اضغط الزر تاني.
            </p>
          ) : null}
          <button className="btn btn-gold" type="submit">
            إرسال عبر واتساب
          </button>
        </form>
      </div>
    </section>
  );
}
