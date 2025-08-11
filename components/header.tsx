
import { getDictionary } from "@/lib/dictionary";
import { MainNav } from "./main-nav";

export const Header = async ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>> }) => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <MainNav dictionary={dictionary} />
        </header>
    )
}
