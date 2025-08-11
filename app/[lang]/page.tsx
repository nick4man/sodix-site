
import { Banner } from "@/components/banner";
import { Services } from "@/components/services";

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  return (
    <main>
      <Banner />
      <Services />
    </main>
  );
}
