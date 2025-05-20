import Link from "next/link"

interface LogoProps {
    className?: string
    linkClassName?: string
    size?: "default" | "small"
}

export function Logo({ className = "", linkClassName = "", size = "default" }: LogoProps) {
    const sizeClass = size === "small" ? "text-xl" : "text-2xl"

    return (
        <Link
            href="/"
            className={`${sizeClass} font-bold bg-linear-to-r from-primary-light to-secondary-main bg-clip-text text-transparent ${linkClassName}`}
        >
            <span className={className}>MentorCertAi</span>
        </Link>
    )
} 