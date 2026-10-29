import type { Metadata } from "next";
import { PageFrame } from "@/components/PageFrame";

export const metadata: Metadata = {
  title: "الخدمات | GTS للاستثمار الزراعي",
};

export default function ServicesPage() {
  return <PageFrame title="الخدمات" />;
}
