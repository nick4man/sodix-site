export const Banner = () => {
    return (
        <section
            className="relative h-[560px] bg-cover bg-center flex items-center justify-center text-white"
            style={{ backgroundImage: "url(/img/placeholder.jpg)" }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 text-center">
                <h1 className="text-5xl font-bold">Sodix</h1>
                <p className="text-xl mt-4">Your partner in software development</p>
            </div>
        </section>
    )
}