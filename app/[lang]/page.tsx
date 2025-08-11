
import { getDictionary } from "@/lib/dictionary";
import { Header } from "@/components/header";

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  const dictionary = await getDictionary(lang);

  return (
    <main>
      <Header dictionary={dictionary} />
    </main>
  );
}
