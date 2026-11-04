import { Footer, WhatsFloat } from "./Footer";
import { ScrollMotion } from "./ScrollMotion";
import { Navbar } from "./Navbar";

export function PageFrame({ title }: { title: string }) {
  return (
    <>
      <Navbar />
      <main>
        <section className="page-blank">
          <div className="wrap">
            <h1>{title}</h1>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsFloat />
      <ScrollMotion />
    </>
  );
}
