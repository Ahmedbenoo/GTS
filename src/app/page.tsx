import { HomePage } from "@/components/HomePage";
import { company, phones } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.fullName,
  description: company.intro,
  url: company.facebook,
  telephone: phones.map((phone) => phone.tel),
  address: {
    "@type": "PostalAddress",
    streetAddress: "ميدان النجدة، المحور المركزي، بجوار النيابة الإدارية",
    addressLocality: "6th of October City",
    addressCountry: "EG",
  },
  sameAs: [company.facebook],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  );
}
