import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Portfolio } from "@/components/portfolio";
import { Contacts } from "@/components/contacts";

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  return (
    <main>
      <Hero lang={lang} />
      <About lang={lang} />
      <Services lang={lang} />
      <Portfolio lang={lang} />
      <Contacts lang={lang} />
    </main>
  );
}