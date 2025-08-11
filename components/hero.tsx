
import { Button } from "./ui/button";

export const Hero = () => {
    return (
        <section className="relative bg-cover bg-center h-[calc(100vh-80px)]" style={{ backgroundImage: "url('/img/placeholder.jpg')" }}>
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative container h-full flex flex-col items-center justify-center text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold">Sodix</h1>
                <p className="mt-4 text-lg md:text-2xl">Профессиональные решения в области строительства нулевого цикла</p>
                <Button className="mt-8">Узнать больше</Button>
            </div>
        </section>
    )
}
