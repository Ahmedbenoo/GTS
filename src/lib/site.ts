import type { Metadata } from "next";
import { company, phones, services } from "@/lib/content";

/** Set NEXT_PUBLIC_SITE_URL to the real domain before publishing. */
const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelHost = (process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || "").replace(
  /^https?:\/\//,
  "",
);
export const siteUrl = (configured || (vercelHost ? `https://${vercelHost}` : "http://localhost:3010")).replace(
  /\/$/,
  "",
);

export const homeTitle = "GTS للاستثمار الزراعي | ري محوري وتنقيط وميكنة";

export const homeDescription =
  "شركة جي تي إس للاستثمار الزراعي في مدينة 6 أكتوبر. توريد وتركيب وصيانة الري المحوري والتنقيط والرش، وقطع الغيار، ولوحات التحكم، والمولدات.";

export const publicPaths = ["/", "/irrigation", "/energy", "/supplies", "/mechanization"] as const;

export function topicMetadata(topic: { label: string; href: string; description: string }): Metadata {
  const title = `${topic.label} | ${company.fullName}`;
  return {
    title: topic.label,
    description: topic.description,
    alternates: { canonical: topic.href },
    openGraph: {
      title,
      description: topic.description,
      url: topic.href,
      locale: "ar_EG",
      type: "website",
      siteName: company.fullName,
    },
  };
}

export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: company.fullName,
        url: siteUrl,
        inLanguage: "ar",
        description: homeDescription,
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#business`,
        name: company.fullName,
        alternateName: ["جي تي إس", "GTS"],
        description: homeDescription,
        url: siteUrl,
        image: `${siteUrl}/opengraph-image.jpg`,
        logo: `${siteUrl}/gts-logo.png`,
        telephone: phones[0].tel,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address.note
            ? `${company.address.line}، ${company.address.note}`
            : company.address.line,
          addressLocality: company.address.city,
          addressRegion: "الجيزة",
          addressCountry: "EG",
        },
        areaServed: [
          { "@type": "City", name: "مدينة 6 أكتوبر" },
          { "@type": "Country", name: "مصر" },
        ],
        sameAs: [company.facebook],
        contactPoint: phones.map((phone, index) => ({
          "@type": "ContactPoint",
          telephone: phone.tel,
          contactType: index === phones.length - 1 ? "sales" : "customer service",
          availableLanguage: ["Arabic", "English"],
          areaServed: "EG",
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "خدمات الهندسة الزراعية",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.text,
            },
          })),
        },
      },
    ],
  };
}

export function breadcrumbJsonLd(label: string, href: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: label, item: `${siteUrl}${href}` },
    ],
  };
}
