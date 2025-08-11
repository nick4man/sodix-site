
export const About = () => {
    return (
        <section className="container py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-4">About Us</h2>
                    <p className="text-muted-foreground">
                        Sodix is a software development company that specializes in building modern and responsive websites and mobile applications. We also offer UI/UX design services to help you create beautiful and user-friendly interfaces.
                    </p>
                </div>
                <div>
                    <img src="/img/placeholder.jpg" alt="About Us" className="rounded-lg" />
                </div>
            </div>
        </section>
    )
}
