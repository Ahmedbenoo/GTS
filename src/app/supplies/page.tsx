import type { Metadata } from "next";
import { TopicPage } from "@/components/TopicPage";
import { topicMetadata } from "@/lib/site";
import { topics } from "@/lib/topics";

const topic = topics.supplies;

export const metadata: Metadata = topicMetadata(topic);

export default function SuppliesPage() {
  return <TopicPage topic={topic} />;
}
