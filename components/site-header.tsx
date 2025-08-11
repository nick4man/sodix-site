import { Logo } from "./logo";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";

export const SiteHeader = ({ lang }: { lang: string }) => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <Logo />
                <MainNav lang={lang} />
                <MobileNav />
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}