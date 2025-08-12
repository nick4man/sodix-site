
import { getDictionary } from "@/lib/dictionary";
import { Button } from "./ui/button";
import { AnimatedSection } from "./animated-section";

export const Hero = async ({ lang }: { lang: string }) => {
    const dictionary = await getDictionary(lang);
    return (
        <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
            {/* Градиентный фон */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900" />
            
            {/* Анимированные геометрические фигуры */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-500" />
            </div>

            {/* Основной контент */}
            <div className="relative z-10 container mx-auto px-4 text-center text-white">
                <AnimatedSection
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent mb-6">
                        {dictionary.hero.title}
                    </h1>
                </AnimatedSection>
                
                <AnimatedSection
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-12"
                >
                    <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                        {dictionary.hero.subtitle}
                    </p>
                </AnimatedSection>
                
                <AnimatedSection
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                        Узнать больше
                    </Button>
                    <Button 
                        variant="outline" 
                        size="lg"
                        className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm"
                    >
                        Наши проекты
                    </Button>
                </AnimatedSection>
            </div>

            {/* Прокрутка вниз */}
            <AnimatedSection
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
                </div>
            </AnimatedSection>
        </section>
    )
}
