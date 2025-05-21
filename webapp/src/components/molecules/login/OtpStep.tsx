import { Button } from "@/components/atoms/Button"
import { useState, useRef } from "react"

interface OtpStepProps {
    email: string
    onVerify: (otp: string) => Promise<void>
    onResend: () => Promise<void>
    loading: boolean
}

export const OtpStep = ({ email, onVerify, onResend, loading }: OtpStepProps) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    return (
        <div className="space-y-4">
            <p className="text-sm text-text-secondary text-center">
                We&apos;ve sent a verification code to {email}
            </p>

            <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        ref={(el) => {
                            if (el) inputRefs.current[index] = el
                        }}
                        className="w-12 h-12 text-center text-xl font-semibold border-2 border-surface-lighter rounded-lg focus:outline-none focus:border-primary-main focus:ring-2 focus:ring-primary-light/50 bg-white text-accent-foreground transition-all duration-200"
                        disabled={loading}
                    />
                ))}
            </div>

            <div className="text-center">
                <button
                    onClick={onResend}
                    disabled={loading}
                    className="text-primary-main hover:text-primary-light text-sm font-medium transition-colors"
                >
                    Didn&apos;t receive the code? Send again
                </button>
            </div>

            <Button
                className="w-full bg-linear-to-r from-primary-main to-primary-light text-white hover:from-primary-light hover:to-primary-main"
                onClick={() => onVerify(otp.join(""))}
                disabled={loading}
            >
                {loading ? "Verifying..." : "Verify Code"}
            </Button>
        </div>
    )
} 