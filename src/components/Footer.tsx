import { company, nav, phones, whatsappLink } from "@/lib/content";
import { enOf } from "@/lib/en-map";
import { Logo, FacebookIcon, WhatsAppIcon } from "./Mark";
import { Tx } from "./Tx";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid reveal-group">
        <div>
          <a className="nav-brand" href="/">
            <Logo />
            <span className="sr-only"><Tx text={company.fullName} /></span>
          </a>
          <p><Tx text={company.tagline} /></p>
        </div>
        <div>
          <p className="footer-label"><Tx text="الصفحات" /></p>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}><Tx text={item.label} /></a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-label"><Tx text="التواصل" /></p>
          <ul>
            {phones.map((phone) => (
              <li key={phone.tel}>
                <a href={`tel:${phone.tel}`}>
                  <Tx text={phone.label} />
                  {": "}
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
                  aria-label="فيسبوك · Facebook"
                >
                  <FacebookIcon />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          <Tx text="جميع الحقوق محفوظة ل" /> <Tx text={company.fullName} />{" "}
          <span className="num">© 2026</span>
        </p>
      </div>
    </footer>
  );
}

const waText = "مرحبًا، حابب أستفسر عن خدمات GTS للاستثمار الزراعي.";

export function WhatsFloat() {
  return (
    <>
      <a
        className="wa-float gts-lang-ar"
        href={whatsappLink(waText)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل عبر واتساب"
      >
        <WhatsAppIcon />
      </a>
      <a
        className="wa-float gts-lang-en"
        href={whatsappLink(enOf(waText))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact on WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </>
  );
}
