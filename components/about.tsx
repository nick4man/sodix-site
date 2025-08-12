import { getDictionary } from "@/lib/dictionary";
import { AnimatedSection } from "./animated-section";
import { Award, Users, MapPin, Clock, CheckCircle, Building2, Shield, Zap } from "lucide-react";

export const About = async ({ lang }: { lang: string }) => {
    const dictionary = await getDictionary(lang);
    
    const stats = [
        { icon: Award, value: "15+", label: "Лет опыта", color: "text-amber-500" },
        { icon: Users, value: "50+", label: "Специалистов", color: "text-yellow-500" },
        { icon: MapPin, value: "25+", label: "Городов", color: "text-orange-500" },
        { icon: Clock, value: "200+", label: "Проектов", color: "text-amber-600" }
    ];
    
    const features = [
        { text: "Собственный парк спецтехники", icon: Building2 },
        { text: "Сертифицированные специалисты", icon: Shield },
        { text: "Современные технологии строительства", icon: Zap },
        { text: "Гарантия качества работ", icon: CheckCircle },
        { text: "Соблюдение сроков выполнения", icon: Clock },
        { text: "Работа по всей России", icon: MapPin }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="section-title">О компании</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Левая колонка - текст */}
                    <AnimatedSection
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-lg mb-6">
                            <strong className="text-2xl text-amber-600">«Sodix»</strong> — это десятки крупных объектов, широкий спектр строительных услуг, компетентность и заслуженная репутация.
                        </p>
                        
                        <p className="mb-6 text-gray-700 leading-relaxed">
                            Нашу компанию основали люди с внушительным опытом работы в строительстве. Профессионализм сотрудников и собственный парк спецтехники позволил компании реализовать ряд масштабных проектов в различных субъектах Российской Федерации.
                        </p>
                        
                        <p className="mb-6 text-gray-700 leading-relaxed">
                            Мы выполняем все работы, необходимые при строительстве нулевого цикла: устройство буронабивных и буросекущих свай, шпунтовых ограждений, «стены в грунте», монтаж и демонтаж распорных систем котлованов и металлоконструкций любой сложности.
                        </p>
                        
                        <p className="text-gray-700 leading-relaxed">
                            Используя многолетний опыт и делая ставку на качество, мы заслужили доверие партнеров и уверенно развиваемся на российском рынке.
                        </p>
                    </AnimatedSection>
                    
                    {/* Правая колонка - изображение */}
                    <AnimatedSection
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <img 
                            src="https://placehold.co/600x400/e2e8f0/333333?text=Команда+Sodix" 
                            alt="Команда Sodix" 
                            className="rounded-lg shadow-xl w-full"
                        />
                    </AnimatedSection>
                </div>
                
                {/* Особенности */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <AnimatedSection
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-xl text-gray-900 mb-2">
                                    {feature.text}
                                </h3>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
                
                {/* Статистика */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <AnimatedSection
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100 shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    )
}