import { AnimatedSection } from "./animated-section";
import { 
    Drill, 
    HardHat, 
    Shield, 
    Zap, 
    Building2, 
    Cog, 
    Ruler, 
    CheckCircle 
} from "lucide-react";

export const Technologies = () => {
    const technologies = [
        {
            icon: Drill,
            title: "Современное оборудование",
            description: "Используем новейшие буровые установки и спецтехнику для выполнения работ любой сложности",
            color: "from-primary to-orange-500"
        },
        {
            icon: HardHat,
            title: "Безопасность превыше всего",
            description: "Строгое соблюдение всех норм безопасности и охраны труда на каждом объекте",
            color: "from-orange-500 to-yellow-500"
        },
        {
            icon: Shield,
            title: "Контроль качества",
            description: "Многоуровневая система контроля качества на всех этапах выполнения работ",
            color: "from-yellow-500 to-orange-400"
        },
        {
            icon: Zap,
            title: "Инновационные решения",
            description: "Внедряем передовые технологии и методики для повышения эффективности",
            color: "from-orange-400 to-primary"
        },
        {
            icon: Building2,
            title: "Опыт и экспертиза",
            description: "15+ лет опыта в строительстве нулевого цикла по всей России",
            color: "from-primary to-yellow-500"
        },
        {
            icon: Cog,
            title: "Техническая поддержка",
            description: "Полное техническое сопровождение проекта от проектирования до сдачи",
            color: "from-yellow-500 to-orange-500"
        }
    ];

    const stats = [
        { value: "99.8%", label: "Успешных проектов" },
        { value: "24/7", label: "Техподдержка" },
        { value: "ISO", label: "Сертификация" },
        { value: "15+", label: "Лет опыта" }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-white to-slate-50">
            <div className="container mx-auto px-4">
                <AnimatedSection
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Наши{" "}
                        <span className="text-gradient">технологии</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6"></div>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Используем передовые технологии и современное оборудование для обеспечения высочайшего качества работ
                    </p>
                </AnimatedSection>

                {/* Технологии */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {technologies.map((tech, index) => (
                        <AnimatedSection
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="group p-8 bg-white rounded-2xl shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-2 border border-slate-100">
                                <div className={`w-16 h-16 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                                    <tech.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors duration-300">
                                    {tech.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {tech.description}
                                </p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* Статистика */}
                <AnimatedSection
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="bg-gradient-primary rounded-3xl p-12 text-white shadow-strong"
                >
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold mb-4">
                            Почему выбирают нас?
                        </h3>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Наша репутация построена на качестве, надежности и соблюдении сроков
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <AnimatedSection
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-black mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-white/80 font-medium">
                                    {stat.label}
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Сертификаты и лицензии */}
                <AnimatedSection
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <div className="bg-white rounded-2xl p-8 shadow-soft border border-slate-100 max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <CheckCircle className="w-8 h-8 text-primary" />
                            <h3 className="text-2xl font-bold text-slate-900">
                                Сертификаты и лицензии
                            </h3>
                        </div>
                        <p className="text-slate-600 text-lg leading-relaxed mb-6">
                            Компания имеет все необходимые сертификаты, лицензии и допуски для выполнения строительных работ. 
                            Мы работаем в соответствии с международными стандартами качества ISO.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium">
                                ISO 9001:2015
                            </div>
                            <div className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium">
                                ISO 14001:2015
                            </div>
                            <div className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium">
                                OHSAS 18001:2007
                            </div>
                            <div className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium">
                                Лицензия МЧС
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};
