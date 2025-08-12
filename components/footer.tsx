import { Logo } from "./logo"
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Основной контент */}
            <div className="container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* О компании */}
                    <div className="lg:col-span-2">
                        <Logo />
                        <p className="mt-4 text-gray-300 leading-relaxed max-w-md">
                            Sodix — ведущая строительная компания в области нулевого цикла. 
                            Мы создаем надежные фундаменты для будущих поколений, используя 
                            передовые технологии и профессиональный подход.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors duration-300">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors duration-300">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors duration-300">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Услуги */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Услуги</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="#" className="hover:text-white transition-colors duration-300">Шпунтовое ограждение</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-300">Стена в грунте</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-300">Буронабивные сваи</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-300">Сваи SFA</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-300">Металлоконструкции</a></li>
                        </ul>
                    </div>

                    {/* Контакты */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Контакты</h3>
                        <div className="space-y-3 text-gray-300">
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-blue-400" />
                                <span>+7 (495) 123-45-67</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-blue-400" />
                                <span>info@sodix.org</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-blue-400" />
                                <span>Москва, ул. Строителей, 15</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Нижняя часть */}
            <div className="border-t border-gray-800">
                <div className="container py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © 2025 Sodix. Все права защищены.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
                            <a href="#" className="hover:text-white transition-colors duration-300">Политика конфиденциальности</a>
                            <a href="#" className="hover:text-white transition-colors duration-300">Условия использования</a>
                            <a href="#" className="hover:text-white transition-colors duration-300">Карта сайта</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}