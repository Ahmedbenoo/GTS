import type { Metadata } from "next";
import { Cairo, Outfit } from "next/font/google";
import { TitleSync } from "@/components/Language";
import { pageTitles } from "@/lib/page-titles";
import { homeDescription, homeTitle, siteUrl } from "@/lib/site";
import "./globals.css";

const languageBoot = `(function(){try{document.cookie="gts-lang=; Path=/; Max-Age=0";var en=sessionStorage.getItem("gts-lang")==="en";if(en){var d=document.documentElement;d.lang="en";d.dir="ltr"}var p=location.pathname;if(p.length>1&&p.endsWith("/"))p=p.slice(0,-1);var titles=en?${JSON.stringify(pageTitles.en)}:${JSON.stringify(pageTitles.ar)};if(titles[p])document.title=titles[p];var skip=sessionStorage.getItem("gts-intro")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches;if(skip){document.documentElement.classList.add("gts-skip-intro");var s=document.createElement("style");s.textContent=".loader{display:none!important}";document.head.appendChild(s)}}catch(e){}})();`;

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: "%s | GTS للاستثمار الزراعي",
  },
  description: homeDescription,
  applicationName: "GTS للاستثمار الزراعي",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  openGraph: {
    locale: "ar_EG",
    type: "website",
    siteName: "GTS للاستثمار الزراعي",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: languageBoot }} />
      </head>
      <body>
        <TitleSync />
        <noscript>
          <style>{`.loader{display:none !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
