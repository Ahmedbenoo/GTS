import type { Metadata } from "next";
import { PageFrame } from "@/components/PageFrame";

export const metadata: Metadata = {
  title: "الأنظمة | GTS للاستثمار الزراعي",
};

export default function SystemsPage() {
  return <PageFrame title="الأنظمة" />;
}
