import { Footer, WhatsFloat } from "./Footer";
import { Navbar } from "./Navbar";

export function PageFrame({ title }: { title: string }) {
  return (
    <>
      <Navbar />
      <main>
        <section className="page-blank" aria-label={title} />
      </main>
      <Footer />
      <WhatsFloat />
    </>
  );
}
