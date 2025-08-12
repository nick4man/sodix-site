import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12">
                <Image
                    src="/images/logo.png"
                    alt="Содикс - Строительная компания"
                    width={48}
                    height={48}
                    className="object-contain"
                    priority
                />
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                    Содикс
                </span>
                <span className="text-sm font-normal text-blue-600 -mt-1">
                    Строительная компания
                </span>
            </div>
        </Link>
    )
}
