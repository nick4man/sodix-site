
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
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <h2 className="section-title">Наши услуги</h2>
                
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
                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 card-hover">
                                    <h3 className="font-bold text-xl mb-4 text-gray-900">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        {service.description}
                                    </p>
                                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </AnimatedSection>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
