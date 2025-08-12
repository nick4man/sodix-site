import { AnimatedSection } from "./animated-section";

export const Equipment = () => {
    const equipment = [
        {
            name: "Буровая установка \"Bauer\" BG36",
            image: "https://placehold.co/200x150/e2e8f0/333?text=Bauer+BG36",
            description: "Мощная буровая установка для сложных грунтовых условий"
        },
        {
            name: "Экскаватор Hitachi EX450",
            image: "https://placehold.co/200x150/e2e8f0/333?text=Hitachi+EX450",
            description: "Надежный экскаватор для землеройных работ"
        },
        {
            name: "Буровая установка Liebherr HS845",
            image: "https://placehold.co/200x150/e2e8f0/333?text=Liebherr+HS845",
            description: "Современная установка для глубокого бурения"
        },
        {
            name: "Самосвал Scania Р380",
            image: "https://placehold.co/200x150/e2e8f0/333?text=Scania+P380",
            description: "Грузовой транспорт для перевозки материалов"
        }
    ];

    return (
        <section id="equipment" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <h2 className="section-title">Наш парк техники</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
                    {equipment.map((item, index) => (
                        <AnimatedSection
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-white p-4 rounded-lg shadow-md card-hover">
                                <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="mx-auto mb-2 h-24 object-contain"
                                />
                                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};
