
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)

        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <Button
            variant="outline"
            size="icon"
            className={`fixed bottom-4 right-4 transition-opacity ${isVisible ? "opacity-100" : "opacity-0"}`}
            onClick={scrollToTop}
        >
            <ArrowUp className="h-4 w-4" />
        </Button>
    )
}
