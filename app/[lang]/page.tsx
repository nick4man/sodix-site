import { Banner } from "@/components/banner";
import { Services } from "@/components/services";
import { About } from "@/components/about";

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  return (
    <main>
      <Banner />
      <About />
      <Services />
    </main>
  );
}