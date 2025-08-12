import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/dictionary";
import { AnimatedSection } from "./animated-section";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export const Contacts = async ({ lang }: { lang: string }) => {
    const dictionary = await getDictionary(lang);
    
    const contactInfo = [
        {
            icon: Phone,
            title: "Телефон",
            value: "+7 (495) 123-45-67",
            description: "Пн-Пт: 9:00 - 18:00"
        },
        {
            icon: Mail,
            title: "Email",
            value: "info@sodix.org",
            description: "Ответим в течение 24 часов"
        },
        {
            icon: MapPin,
            title: "Адрес",
            value: "Москва, ул. Строителей, 15",
            description: "Главный офис"
        },
        {
            icon: Clock,
            title: "Режим работы",
            value: "Понедельник - Пятница",
            description: "9:00 - 18:00 (МСК)"
        }
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
                    {dictionary.contacts.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Свяжитесь с нами для обсуждения вашего проекта. Наши специалисты готовы ответить на все вопросы.
                </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Контактная информация */}
                <AnimatedSection
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">
                        Наши контакты
                    </h3>
                    <div className="space-y-6">
                        {contactInfo.map((contact, index) => (
                            <AnimatedSection
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <contact.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">
                                        {contact.title}
                                    </h4>
                                    <p className="text-lg font-medium text-blue-600 mb-1">
                                        {contact.value}
                                    </p>
                                    <p className="text-sm text-gray-600">
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
                    <Card className="border-0 shadow-xl bg-white">
                        <CardHeader className="pb-6">
                            <CardTitle className="text-2xl font-bold text-gray-900">
                                Отправить сообщение
                            </CardTitle>
                            <p className="text-gray-600">
                                Заполните форму ниже, и мы свяжемся с вами в ближайшее время
                            </p>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {dictionary.contacts.form.name}
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="Ваше имя"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {dictionary.contacts.form.email}
                                        </label>
                                        <input 
                                            type="email" 
                                            placeholder="your@email.com"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {dictionary.contacts.form.message}
                                    </label>
                                    <textarea 
                                        placeholder="Опишите ваш проект или задайте вопрос..."
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                                    />
                                </div>
                                <Button 
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                    {dictionary.contacts.form.send}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </AnimatedSection>
            </div>
        </section>
    )
}