import { company, nav, phones, whatsappLink } from "@/lib/content";
import { Logo, FacebookIcon, WhatsAppIcon } from "./Mark";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <a className="nav-brand" href="/">
            <Logo />
            <span>
              <strong>GTS</strong>
              <small>للاستثمار الزراعي</small>
            </span>
          </a>
          <p>{company.tagline}</p>
        </div>
        <div>
          <p className="footer-label">الصفحات</p>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-label">التواصل</p>
          <ul>
            {phones.map((phone) => (
              <li key={phone.tel}>
                <a href={`tel:${phone.tel}`}>
                  {phone.label}:{" "}
                  <span className="num" dir="ltr">
                    {phone.display}
                  </span>
                </a>
              </li>
            ))}
            <li>
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
      </div>
      <div className="wrap footer-base">
        <p>© 2026 {company.fullName}. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}

export function WhatsFloat() {
  return (
    <a
      className="wa-float"
      href={whatsappLink("مرحبًا، حابب أستفسر عن خدمات GTS للاستثمار الزراعي.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
    >
      <WhatsAppIcon />
    </a>
  );
}
