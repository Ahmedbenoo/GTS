import type { Metadata } from "next";
import { PageFrame } from "@/components/PageFrame";

export const metadata: Metadata = {
  title: "طريقة العمل | GTS للاستثمار الزراعي",
};

export default function ProcessPage() {
  return <PageFrame title="طريقة العمل" />;
}
