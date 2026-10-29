import type { Metadata } from "next";
import { Cairo, Outfit } from "next/font/google";
import "./globals.css";

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
  title: "GTS للاستثمار الزراعي",
  description: "حلول زراعية متكاملة تحت سقف واحد",
  applicationName: "GTS للاستثمار الزراعي",
  openGraph: {
    title: "GTS للاستثمار الزراعي",
    description: "حلول زراعية متكاملة تحت سقف واحد",
    locale: "ar_EG",
    type: "website",
    siteName: "GTS للاستثمار الزراعي",
  },
  twitter: {
    card: "summary_large_image",
    title: "GTS للاستثمار الزراعي",
    description: "حلول زراعية متكاملة تحت سقف واحد",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${outfit.variable}`}>
      <body>
        <noscript>
          <style>{`.loader{display:none !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
