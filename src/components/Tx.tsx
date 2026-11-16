import { enOf } from "@/lib/en-map";

export function Tx({ text }: { text: string }) {
  return (
    <>
      <span className="gts-ar">{text}</span>
      <span className="gts-en">{enOf(text)}</span>
    </>
  );
}
