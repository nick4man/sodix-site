import { getDictionary } from "@/lib/dictionary";
import { MotionDiv } from "./motion";
import { Award, Users, MapPin, Clock, CheckCircle } from "lucide-react";

export const About = async ({ lang }: { lang: string }) => {
    const dictionary = await getDictionary(lang);
    
    const stats = [
        { icon: Award, value: "15+", label: "Лет опыта" },
        { icon: Users, value: "50+", label: "Специалистов" },
        { icon: MapPin, value: "25+", label: "Городов" },
        { icon: Clock, value: "200+", label: "Проектов" }
    ];
    
    const features = [
        "Собственный парк спецтехники",
        "Сертифицированные специалисты",
        "Современные технологии строительства",
        "Гарантия качества работ",
        "Соблюдение сроков выполнения",
        "Работа по всей России"
    ];

    return (
        <section className="container py-20 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Левая колонка - текст */}
                <MotionDiv
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {dictionary.about.title}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                        {dictionary.about.text}
                    </p>
                    
                    {/* Особенности */}
                    <div className="space-y-4 mb-8">
                        {features.map((feature, index) => (
                            <MotionDiv
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3"
                            >
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                            </MotionDiv>
                        ))}
                    </div>
                    
                    <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        Узнать больше о компании
                    </button>
                </MotionDiv>
                
                {/* Правая колонка - статистика и изображение */}
                <MotionDiv
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    {/* Статистика */}
                    <div className="grid grid-cols-2 gap-6">
                        {stats.map((stat, index) => (
                            <MotionDiv
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {stat.label}
                                </div>
                            </MotionDiv>
                        ))}
                    </div>
                    
                    {/* Изображение или дополнительная информация */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
                        <h3 className="text-2xl font-bold mb-4">
                            Наша миссия
                        </h3>
                        <p className="text-blue-100 leading-relaxed">
                            Создавать надежные и долговечные фундаменты для будущих поколений, 
                            используя инновационные технологии и профессиональный подход к каждому проекту.
                        </p>
                    </div>
                </MotionDiv>
            </div>
        </section>
    )
}