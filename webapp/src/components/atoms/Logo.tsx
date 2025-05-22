import Link from "next/link"
import { LogoProps } from "@/types/ui"

export function Logo({ className = "", linkClassName = "", size = "default" }: LogoProps) {
    return (
        <Link href="/" className={`font-bold bg-gradient-to-r from-primary-light to-secondary-main bg-clip-text text-transparent ${linkClassName}`}>
            <span className={`font-bold ${size === "default" ? "text-xl" : "text-lg"} ${className}`}>
                MentorCertAI
            </span>
        </Link>
    )
} 