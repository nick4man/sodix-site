import { Banner } from "@/components/banner";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Contacts } from "@/components/contacts";

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  return (
    <main>
      <Banner lang={lang} />
      <About lang={lang} />
      <Services lang={lang} />
      <Contacts lang={lang} />
    </main>
  );
}