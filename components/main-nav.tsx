import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";

export const MainNav = async ({ lang }: { lang: string }) => {
    const dictionary = await getDictionary(lang);
    return (
        <nav>
            <ul className="flex space-x-4">
                <li>
                    <Link href={`/${lang}/about`}>{dictionary.header.about}</Link>
                </li>
                <li>
                    <Link href={`/${lang}/services`}>{dictionary.header.services}</Link>
                </li>
                <li>
                    <Link href={`/${lang}/contacts`}>{dictionary.header.contacts}</Link>
                </li>
            </ul>
        </nav>
    )
}