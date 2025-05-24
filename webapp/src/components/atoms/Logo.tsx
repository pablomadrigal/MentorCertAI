import Link from "next/link"
import NextImage from "next/image"
import { LogoProps } from "@/types/ui"

export function Logo({ className = "", linkClassName = "", size = "default" }: LogoProps) {
    return (
        <Link href="/" className={`font-bold flex bg-gradient-to-r from-primary-light to-secondary-main bg-clip-text text-transparent ${linkClassName}`}>
            <NextImage src="/MentorCertAiLogo.png" alt="MentorCertAI" width={32} height={32} />
            <span className={`font-bold ml-2 ${size === "default" ? "text-xl" : "text-lg"} ${className}`}>
                MentorCertAI
            </span>
        </Link>
    )
} 