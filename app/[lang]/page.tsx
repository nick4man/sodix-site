import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Contacts } from "@/components/contacts";

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  return (
    <main>
      <Hero />
      <About lang={lang} />
      <Services lang={lang} />
      <Contacts lang={lang} />
    </main>
  );
}