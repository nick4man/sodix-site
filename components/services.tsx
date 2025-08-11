
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MotionDiv } from "./motion";
import { getDictionary } from "@/lib/dictionary";

export const Services = async ({ lang }: { lang: string }) => {
    const dictionary = await getDictionary(lang);
    const services = [
        {
            title: dictionary.services.web.title,
            description: dictionary.services.web.description
        },
        {
            title: dictionary.services.mobile.title,
            description: dictionary.services.mobile.description
        },
        {
            title: dictionary.services.design.title,
            description: dictionary.services.design.description
        }
    ]

    return (
        <section className="container py-12">
            <h2 className="text-3xl font-bold text-center mb-8">{dictionary.services.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <MotionDiv
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{service.description}</p>
                            </CardContent>
                        </Card>
                    </MotionDiv>
                ))}
            </div>
        </section>
    )
}
