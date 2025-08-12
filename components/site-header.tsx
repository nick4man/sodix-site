import { Logo } from "./logo";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { Button } from "./ui/button";

export const SiteHeader = ({ lang }: { lang: string }) => {
    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-md">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Logo />
                <MainNav lang={lang} />
                <MobileNav />
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <Button 
                        size="sm"
                        className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 transition duration-300"
                    >
                        Контакты
                    </Button>
                </div>
            </nav>
        </header>
    )
}