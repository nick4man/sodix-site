
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "./animated-section";
import { getDictionary } from "@/lib/dictionary";
import { 
    Anchor, 
    Building2, 
    Drill, 
    HardHat, 
    Hammer, 
    Mountain, 
    Ruler, 
    Shield, 
    Wrench 
} from "lucide-react";

export const Services = async ({ lang }: { lang: string }) => {
    const dictionary = await getDictionary(lang);
    
    // Получаем только объекты услуг, исключая заголовок секции
    const servicesData = dictionary.services;
    const services = [
        servicesData.sheet_piling,
        servicesData.slurry_wall,
        servicesData.bored_piles,
        servicesData.sfa_piles,
        servicesData.concrete_piles,
        servicesData.metal_structures,
        servicesData.barrettes,
        servicesData.jet_piles,
        servicesData.anchor_systems
    ];
    
    const serviceIcons = [
        Anchor, Building2, Drill, HardHat, Hammer, Mountain, Ruler, Shield, Wrench
    ];

    return (
        <section className="container py-20 bg-gradient-to-b from-gray-50 to-white">
            <AnimatedSection
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    {dictionary.services.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Профессиональные услуги в области строительства нулевого цикла с использованием современного оборудования
                </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => {
                    const IconComponent = serviceIcons[index] || Building2;
                    return (
                        <AnimatedSection
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white shadow-lg">
                                <CardHeader className="text-center pb-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                    <CardTitle className="text-xl font-semibold text-gray-900">
                                        {service.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-gray-600 leading-relaxed">
                                        {service.description}
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:underline transition-all duration-300">
                                            Подробнее →
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    );
                })}
            </div>
        </section>
    )
}
