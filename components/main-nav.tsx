import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";

export const MainNav = async ({ lang }: { lang: string }) => {
    const dictionary = await getDictionary(lang);
    
    const navItems = [
        { href: `/${lang}#home`, label: "Главная" },
        { href: `/${lang}#about`, label: dictionary.header.about },
        { href: `/${lang}#services`, label: dictionary.header.services },
        { href: `/${lang}#portfolio`, label: dictionary.header.portfolio },
        { href: `/${lang}#contacts`, label: dictionary.header.contacts }
    ];

    return (
        <nav className="hidden md:flex">
            <ul className="flex space-x-8">
                {navItems.map((item) => (
                    <li key={item.href}>
                        <Link 
                            href={item.href}
                            className="relative text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300 group"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}