import { getDictionary } from "@/lib/dictionary";

export const About = async ({ lang }: { lang: string }) => {
    const dictionary = await getDictionary(lang);
    return (
        <section className="container py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-4">{dictionary.about.title}</h2>
                    <p className="text-muted-foreground">
                        {dictionary.about.text}
                    </p>
                </div>
                <div>
                    <img src="/img/placeholder.jpg" alt="About Us" className="rounded-lg" />
                </div>
            </div>
        </section>
    )
}