import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Portfolio } from "@/components/portfolio";
import { Contacts } from "@/components/contacts";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  return (
    <main>
      <section id="home">
        <Hero lang={resolvedParams.lang} />
      </section>
      <section id="about">
        <About lang={resolvedParams.lang} />
      </section>
      <section id="services">
        <Services lang={resolvedParams.lang} />
      </section>
      <section id="portfolio">
        <Portfolio lang={resolvedParams.lang} />
      </section>
      <section id="contacts">
        <Contacts lang={resolvedParams.lang} />
      </section>
    </main>
  );
}