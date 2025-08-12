
import { getDictionary } from "@/lib/dictionary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MotionDiv } from "./motion";

export const Portfolio = async ({ lang }: { lang: string }) => {
    const dictionary = await getDictionary(lang);
    const projects = [
        {
            title: "Project 1",
            description: "Description of project 1"
        },
        {
            title: "Project 2",
            description: "Description of project 2"
        },
        {
            title: "Project 3",
            description: "Description of project 3"
        }
    ]

    return (
        <section className="container py-12">
            <h2 className="text-3xl font-bold text-center mb-8">{dictionary.portfolio.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <MotionDiv
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>{project.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{project.description}</p>
                            </CardContent>
                        </Card>
                    </MotionDiv>
                ))}
            </div>
        </section>
    )
}
