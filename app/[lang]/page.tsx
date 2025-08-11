import { Banner } from "@/components/banner";

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  return (
    <main>
      <Banner />
    </main>
  );
}