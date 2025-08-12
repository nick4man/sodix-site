import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";

export const MainNav = async ({ lang }: { lang: string }) => {
    const dictionary = await getDictionary(lang);
    
    const navItems = [
        { href: `/${lang}#about`, label: "О компании" },
        { href: `/${lang}#services`, label: "Услуги" },
        { href: `/${lang}#projects`, label: "Проекты" },
        { href: `/${lang}#equipment`, label: "Техника" }
    ];

    return (
        <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
                <Link 
                    key={item.href}
                    href={item.href}
                    className="text-gray-600 hover:text-amber-500 transition duration-300 font-medium"
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}