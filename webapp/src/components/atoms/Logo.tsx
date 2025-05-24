import Link from "next/link"
import NextImage from "next/image"
import { LogoProps } from "@/types/ui"

export function Logo({ className = "", linkClassName = "", size = "default" }: LogoProps) {
    return (
        <Link href="/" className={`font-bold flex items-center ${linkClassName}`}>
            <div className="bg-white rounded-full p-1">
                <NextImage src="/MentorCertAiLogo.png" alt="MentorCertAI" width={32} height={32} />
            </div>
            <span className={`font-bold ml-2 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 bg-clip-text text-transparent ${size === "default" ? "text-xl" : "text-lg"} ${className}`}>
                MentorCertAI
            </span>
        </Link>
    )
} 