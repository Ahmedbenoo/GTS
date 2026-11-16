import type { Metadata } from "next";
import { TopicPage } from "@/components/TopicPage";
import { topicMetadata } from "@/lib/site";
import { topics } from "@/lib/topics";

const topic = topics.irrigation;

export const metadata: Metadata = topicMetadata(topic);

export default function IrrigationPage() {
  return <TopicPage topic={topic} />;
}
