
import { ThemeProvider } from "@/components/theme-provider"

export default function LangLayout({ children, params }: {
    children: React.ReactNode
    params: { lang: string }
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    )
}
