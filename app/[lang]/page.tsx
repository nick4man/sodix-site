import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Portfolio } from "@/components/portfolio";
import { Equipment } from "@/components/equipment";
import { Contacts } from "@/components/contacts";
import { ReactTest } from "@/components/react-test";
import { ReactFeatures } from "@/components/react-features";

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
      <section id="react-test" className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">Тестирование React</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ReactTest />
            <ReactFeatures />
          </div>
        </div>
      </section>
      <section id="services">
        <Services lang={resolvedParams.lang} />
      </section>
      <section id="projects">
        <Portfolio lang={resolvedParams.lang} />
      </section>
      <section id="equipment">
        <Equipment />
      </section>
      <section id="contact">
        <Contacts lang={resolvedParams.lang} />
      </section>
    </main>
  );
}