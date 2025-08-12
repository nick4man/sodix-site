import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/dictionary";
import { AnimatedSection } from "./animated-section";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const Contacts = async ({ lang }: { lang: string }) => {
    const dictionary = await getDictionary(lang);
    
    const contactInfo = [
        {
            icon: Phone,
            title: "Телефон",
            value: "8 (495) 767-77-18",
            description: "Пн-Пт: 9:00 - 18:00"
        },
        {
            icon: Mail,
            title: "Email",
            value: "sksodiks@gmail.com",
            description: "Ответим в течение 24 часов"
        },
        {
            icon: MapPin,
            title: "Адрес",
            value: "125364 г. Москва ул. Свободы д. 50 пом. 14",
            description: "Главный офис"
        }
    ];

    return (
        <section className="py-20 bg-gray-800 text-white">
            <div className="container mx-auto px-6">
                <h2 className="section-title text-white">Контакты</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Контактная информация */}
                    <AnimatedSection
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold mb-4">Свяжитесь с нами</h3>
                        <p className="mb-8 text-gray-300">
                            Готовы обсудить ваш проект? Заполните форму, и мы свяжемся с вами в ближайшее время.
                        </p>
                        
                        <div className="space-y-6">
                            {contactInfo.map((contact, index) => (
                                <AnimatedSection
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1">
                                        <contact.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">
                                            {contact.title}
                                        </h4>
                                        <p className="text-lg font-medium text-amber-400 mb-1">
                                            {contact.value}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {contact.description}
                                        </p>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </AnimatedSection>
                    
                    {/* Форма обратной связи */}
                    <AnimatedSection
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input 
                                    type="text" 
                                    placeholder="Ваше имя" 
                                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                                />
                                <input 
                                    type="email" 
                                    placeholder="Ваш Email" 
                                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                                />
                            </div>
                            <textarea 
                                placeholder="Ваше сообщение" 
                                rows={5} 
                                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-white resize-none"
                            />
                            <Button 
                                type="submit"
                                className="w-full bg-amber-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-amber-600 transition duration-300 flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                Отправить сообщение
                            </Button>
                        </form>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    )
}