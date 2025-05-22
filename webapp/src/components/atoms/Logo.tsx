import Link from "next/link"
import { LogoProps } from "@/types/ui"

export function Logo({ className, linkClassName, size = "default" }: LogoProps) {
    return (
        <Link href="/" className={linkClassName}>
            <div className={`flex items-center space-x-2 ${className}`}>
                <span className={`font-bold ${size === "default" ? "text-xl" : "text-lg"}`}>
                    MentorCertAI
                </span>
            </div>
        </Link>
    )
} 