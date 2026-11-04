import type { Metadata } from "next";
import { TopicPage } from "@/components/TopicPage";
import { company } from "@/lib/content";
import { topics } from "@/lib/topics";

const topic = topics.supplies;

export const metadata: Metadata = {
  title: `${topic.label} | ${company.fullName}`,
  description: topic.description,
};

export default function SuppliesPage() {
  return <TopicPage topic={topic} />;
}
