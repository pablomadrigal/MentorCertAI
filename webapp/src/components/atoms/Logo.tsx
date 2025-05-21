import Link from "next/link"
import { LogoProps } from "@/types/ui"

export function Logo({ className, linkClassName, size = "default" }: LogoProps) {
    return (
        <Link href="/" className={linkClassName}>
            <div className={`flex items-center space-x-2 ${className}`}>
                <div className={`relative ${size === "default" ? "h-8 w-8" : "h-6 w-6"}`}>
                    <img src="/logo.svg" alt="MentorCertAI Logo" className="w-full h-full" />
                </div>
                <span className={`font-bold ${size === "default" ? "text-xl" : "text-lg"}`}>
                    MentorCertAI
                </span>
            </div>
        </Link>
    )
} 