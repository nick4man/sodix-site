
import { getDictionary } from "@/lib/dictionary";
import { Button } from "./ui/button";
import { AnimatedSection } from "./animated-section";
import { ArrowRight, Phone, Building2 } from "lucide-react";

export const Hero = async ({ lang }: { lang: string }) => {
    const dictionary = await getDictionary(lang);
    return (
        <section className="bg-gradient-hero min-h-screen flex items-center justify-center text-white relative overflow-hidden">
            {/* Полупрозрачный текст-водяной знак на фоне */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-[20rem] md:text-[25rem] lg:text-[30rem] font-black text-white/5 select-none transform -rotate-12 leading-none">
                    ГРОНУЛЕВОГО ЦИКЛАЂЕ
                </div>
            </div>
            
            {/* Дополнительные фоновые элементы */}
            <div className="absolute inset-0">
                <div className="absolute top-20 right-20 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Основной контент */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="max-w-6xl mx-auto">
                    {/* Логотип и название */}
                    <AnimatedSection
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-primary rounded-2xl mb-6 shadow-strong">
                            <Building2 className="w-12 h-12 text-white" />
                        </div>
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
                            ИСКУССТВО{" "}
                            <span className="text-gradient">СТРОИТЕЛЬСТВА</span>
                        </h1>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            НУЛЕВОГО ЦИКЛА
                        </h2>
                    </AnimatedSection>
                    
                    {/* Подзаголовок */}
                    <AnimatedSection
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-12"
                    >
                        <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium">
                            Профессионализм, собственный парк спецтехники и десятки реализованных масштабных проектов по всей России
                        </p>
                    </AnimatedSection>
                    
                    {/* Кнопки */}
                    <AnimatedSection
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                    >
                        <Button 
                            size="lg" 
                            className="bg-gradient-primary hover:shadow-strong text-white px-10 py-5 text-lg font-bold rounded-xl shadow-soft transform hover:scale-105 transition-all duration-300 group"
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            Связаться с нами
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button 
                            variant="outline" 
                            size="lg"
                            className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-5 text-lg font-bold rounded-xl backdrop-blur-sm transition-all duration-300 group"
                        >
                            Наши проекты
                        </Button>
                    </AnimatedSection>
                    
                    {/* Статистика */}
                    <AnimatedSection
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                    >
                        <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                            <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">15+</div>
                            <div className="text-gray-200 font-medium">Лет опыта</div>
                        </div>
                        <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">200+</div>
                            <div className="text-gray-200 font-medium">Реализованных проектов</div>
                        </div>
                        <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                            <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">50+</div>
                            <div className="text-gray-200 font-medium">Специалистов</div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>

            {/* Прокрутка вниз */}
            <AnimatedSection
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-bounce" />
                </div>
            </AnimatedSection>
        </section>
    )
}
