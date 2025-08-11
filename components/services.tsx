import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MotionDiv } from "./motion";

const services = [
    {
        title: "Web Development",
        description: "We build modern and responsive websites."
    },
    {
        title: "Mobile Development",
        description: "We build cross-platform mobile applications."
    },
    {
        title: "UI/UX Design",
        description: "We design beautiful and user-friendly interfaces."
    }
]

export const Services = () => {
    return (
        <section className="container py-12">
            <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
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