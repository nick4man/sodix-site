
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";

export const MainNav = ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>> }) => {
    return (
        <nav>
            <ul className="flex space-x-4">
                <li>
                    <Link href="/about">{dictionary.header.about}</Link>
                </li>
                <li>
                    <Link href="/services">{dictionary.header.services}</Link>
                </li>
                <li>
                    <Link href="/contacts">{dictionary.header.contacts}</Link>
                </li>
            </ul>
        </nav>
    )
}
