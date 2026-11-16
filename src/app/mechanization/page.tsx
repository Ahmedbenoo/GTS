import type { Metadata } from "next";
import { TopicPage } from "@/components/TopicPage";
import { topicMetadata } from "@/lib/site";
import { topics } from "@/lib/topics";

const topic = topics.mechanization;

export const metadata: Metadata = topicMetadata(topic);

export default function MechanizationPage() {
  return <TopicPage topic={topic} />;
}
