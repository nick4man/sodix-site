
import { getDictionary } from "@/lib/dictionary";
import { Button } from "./ui/button";
import Image from "next/image";

export const Hero = async ({ lang }: { lang: string }) => {
    const dictionary = await getDictionary(lang);
    return (
        <section className="relative h-[calc(100vh-80px)]">
            <Image
                src="/img/placeholder.jpg"
                alt="Sodix"
                layout="fill"
                objectFit="cover"
                className="z-0"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative container h-full flex flex-col items-center justify-center text-center text-white z-10">
                <h1 className="text-4xl md:text-6xl font-bold">{dictionary.hero.title}</h1>
                <p className="mt-4 text-lg md:text-2xl">{dictionary.hero.subtitle}</p>
                <Button className="mt-8">Узнать больше</Button>
            </div>
        </section>
    )
}
