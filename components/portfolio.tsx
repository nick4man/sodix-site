
import { getDictionary } from "@/lib/dictionary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "./animated-section";
import { MapPin, Calendar, Building2 } from "lucide-react";

export const Portfolio = async ({ lang }: { lang: string }) => {
    const dictionary = await getDictionary(lang);
    const projects = [
        {
            title: "Жилой комплекс 'Северный'",
            description: "Устройство шпунтового ограждения и буронабивных свай для многоэтажного жилого комплекса в Москве",
            location: "Москва, Россия",
            year: "2023",
            type: "Жилой комплекс",
            image: "/img/project1.jpg"
        },
        {
            title: "Торговый центр 'Мегаполис'",
            description: "Строительство фундамента на буронабивных сваях для крупного торгового центра",
            location: "Санкт-Петербург, Россия",
            year: "2023",
            type: "Торговый центр",
            image: "/img/project2.jpg"
        },
        {
            title: "Офисный комплекс 'Бизнес-Парк'",
            description: "Устройство 'стены в грунте' и анкерных систем для подпорных сооружений",
            location: "Екатеринбург, Россия",
            year: "2022",
            type: "Офисный комплекс",
            image: "/img/project3.jpg"
        },
        {
            title: "Мостовой переход через реку",
            description: "Устройство свай по технологии SFA для мостового перехода",
            location: "Новосибирск, Россия",
            year: "2022",
            type: "Инфраструктура",
            image: "/img/project4.jpg"
        },
        {
            title: "Промышленный завод 'ТехноПром'",
            description: "Строительство фундамента на железобетонных сваях для промышленного предприятия",
            location: "Казань, Россия",
            year: "2021",
            type: "Промышленность",
            image: "/img/project5.jpg"
        },
        {
            title: "Метро 'Подземный город'",
            description: "Устройство барретт и струйной цементации для станции метрополитена",
            location: "Самара, Россия",
            year: "2021",
            type: "Метро",
            image: "/img/project6.jpg"
        }
    ];

    return (
        <section className="container py-20 bg-gray-900 text-white">
            <AnimatedSection
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    {dictionary.portfolio.title}
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Реализованные проекты по всей России с использованием передовых технологий
                </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <AnimatedSection
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gray-800 hover:bg-gray-700 overflow-hidden">
                            <div className="h-48 bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                                <Building2 className="w-16 h-16 text-white/80" />
                            </div>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                                    {project.title}
                                </CardTitle>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>{project.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{project.year}</span>
                                    </div>
                                </div>
                                <div className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                                    {project.type}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 leading-relaxed mb-4">
                                    {project.description}
                                </p>
                                <button className="text-blue-400 hover:text-blue-300 font-medium text-sm group-hover:underline transition-all duration-300">
                                    Подробнее о проекте →
                                </button>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                ))}
            </div>
            
            <AnimatedSection
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-center mt-16"
            >
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Все проекты
                </button>
            </AnimatedSection>
        </section>
    )
}
