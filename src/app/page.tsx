import { HomePage } from "@/components/HomePage";
import { homeJsonLd } from "@/lib/site";

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd()) }}
      />
      <HomePage />
    </>
  );
}
