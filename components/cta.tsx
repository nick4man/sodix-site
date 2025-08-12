import { AnimatedSection } from "./animated-section";
import { Button } from "./ui/button";
import { ArrowRight, Phone, Mail, MessageSquare } from "lucide-react";

export const CTA = () => {
    return (
        <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Фоновые элементы */}
            <div className="absolute inset-0">
                <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <AnimatedSection
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Готовы начать{" "}
                            <span className="text-gradient">проект?</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-8"></div>
                        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Свяжитесь с нами для получения профессиональной консультации, 
                            расчета стоимости и начала работы над вашим проектом
                        </p>
                    </AnimatedSection>

                    {/* Кнопки действий */}
                    <AnimatedSection
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                    >
                        <Button 
                            size="lg" 
                            className="bg-gradient-primary hover:shadow-strong text-white px-10 py-5 text-lg font-bold rounded-xl shadow-soft transform hover:scale-105 transition-all duration-300 group"
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            Позвонить сейчас
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button 
                            variant="outline" 
                            size="lg"
                            className="border-2 border-slate-300/30 text-slate-200 hover:bg-slate-800/50 px-10 py-5 text-lg font-bold rounded-xl backdrop-blur-sm transition-all duration-300 group"
                        >
                            <Mail className="w-5 h-5 mr-2" />
                            Написать письмо
                        </Button>
                    </AnimatedSection>

                    {/* Преимущества */}
                    <AnimatedSection
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Phone className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Быстрый ответ
                            </h3>
                            <p className="text-slate-300">
                                Отвечаем на все запросы в течение 2 часов
                            </p>
                        </div>

                        <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Бесплатная консультация
                            </h3>
                            <p className="text-slate-300">
                                Профессиональная консультация без обязательств
                            </p>
                        </div>

                        <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <ArrowRight className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Начать завтра
                            </h3>
                            <p className="text-slate-300">
                                Можем приступить к работе уже завтра
                            </p>
                        </div>
                    </AnimatedSection>

                    {/* Контактная информация */}
                    <AnimatedSection
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="mt-16 p-8 bg-gradient-primary rounded-3xl shadow-strong max-w-4xl mx-auto"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Свяжитесь с нами любым удобным способом
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div>
                                <div className="text-2xl font-bold text-white mb-2">+7 (495) 123-45-67</div>
                                <div className="text-white/80">Телефон</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white mb-2">info@sodix.org</div>
                                <div className="text-white/80">Email</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white mb-2">24/7</div>
                                <div className="text-white/80">Поддержка</div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};
