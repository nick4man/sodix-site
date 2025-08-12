
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";

export default async function LangLayout({ children, params }: {
    children: React.ReactNode
    params: Promise<{ lang: string }>
}) {
    const resolvedParams = await params;
    return (
        <>
            <SiteHeader lang={resolvedParams.lang} />
            {children}
            <Footer />
            <BackToTop />
        </>
    )
}
