
import { getDictionary } from "@/lib/dictionary";
import { AnimatedSection } from "./animated-section";
import { MapPin, Calendar, Building2 } from "lucide-react";

export const Portfolio = async ({ lang }: { lang: string }) => {
    const dictionary = await getDictionary(lang);
    const projects = [
        {
            title: "МВК «Ахмат Тауэр»",
            description: "Устройство шпунтового ограждения котлована.",
            location: "Москва, Россия",
            year: "2023",
            type: "Коммерческий центр",
            image: "https://placehold.co/600x400/333/fff?text=Ахмат+Тауэр"
        },
        {
            title: "ЖК «Резиденции архитекторов»",
            description: "Монтаж металлоконструкций и демонтаж.",
            location: "Москва, Россия",
            year: "2023",
            type: "Жилой комплекс",
            image: "https://placehold.co/600x400/333/fff?text=Резиденции+Архитекторов"
        },
        {
            title: "Метро «Рассказовка»",
            description: "Устройство «стены в грунте» и распорной системы.",
            location: "Москва, Россия",
            year: "2022",
            type: "Инфраструктура",
            image: "https://placehold.co/600x400/333/fff?text=Метро+Рассказовка"
        },
        {
            title: "Торговый центр «Мегаполис»",
            description: "Строительство фундамента на буронабивных сваях для крупного торгового центра",
            location: "Санкт-Петербург, Россия",
            year: "2023",
            type: "Торговый центр",
            image: "https://placehold.co/600x400/333/fff?text=Мегаполис"
        },
        {
            title: "Офисный комплекс «Бизнес-Парк»",
            description: "Устройство «стены в грунте» и анкерных систем для подпорных сооружений",
            location: "Екатеринбург, Россия",
            year: "2022",
            type: "Офисный комплекс",
            image: "https://placehold.co/600x400/333/fff?text=Бизнес+Парк"
        },
        {
            title: "Промышленный завод «ТехноПром»",
            description: "Строительство фундамента на железобетонных сваях для промышленного предприятия",
            location: "Казань, Россия",
            year: "2021",
            type: "Промышленность",
            image: "https://placehold.co/600x400/333/fff?text=ТехноПром"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="section-title">Реализованные объекты</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <AnimatedSection
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg group card-hover">
                                <img 
                                    src={project.image} 
                                    alt={project.title}
                                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="p-6">
                                    <h3 className="font-bold text-xl mb-2 text-gray-900">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            <span>{project.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{project.year}</span>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs rounded-full font-medium">
                                            {project.type}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    )
}
