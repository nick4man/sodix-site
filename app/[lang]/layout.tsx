
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { BackToTop } from "@/components/back-to-top";

export default async function LangLayout({ children, params }: {
    children: React.ReactNode
    params: Promise<{ lang: string }>
}) {
    const resolvedParams = await params;
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SiteHeader lang={resolvedParams.lang} />
            {children}
            <Footer />
            <BackToTop />
        </ThemeProvider>
    )
}
