import type { Metadata } from "next";
import { TopicPage } from "@/components/TopicPage";
import { topicMetadata } from "@/lib/site";
import { topics } from "@/lib/topics";

const topic = topics.energy;

export const metadata: Metadata = topicMetadata(topic);

export default function EnergyPage() {
  return <TopicPage topic={topic} />;
}
