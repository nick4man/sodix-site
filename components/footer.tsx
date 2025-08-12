import { Logo } from "./logo"
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-8">
            <div className="container mx-auto px-6 text-center">
                <p>&copy; 2024 ООО СК "Содикс". Все права защищены.</p>
                <p className="text-sm mt-2">Сайт разработан с любовью</p>
            </div>
        </footer>
    )
}