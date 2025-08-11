import { Logo } from "./logo"

export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <Logo />
                    <p className="mt-4 text-muted-foreground">© 2025 Sodix. All rights reserved.</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold">Links</h3>
                    <ul className="mt-4 space-y-2">
                        <li><a href="/about" className="hover:underline">About</a></li>
                        <li><a href="/services" className="hover:underline">Services</a></li>
                        <li><a href="/contacts" className="hover:underline">Contacts</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold">Social</h3>
                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="hover:text-gray-400">Facebook</a>
                        <a href="#" className="hover:text-gray-400">Twitter</a>
                        <a href="#" className="hover:text-gray-400">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}