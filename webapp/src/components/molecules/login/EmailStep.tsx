import { Button } from "@/components/atoms/Button"
import { Input } from "@/components/atoms/Input"
import { FormField } from "../FormField"
import { useState } from "react"

interface EmailStepProps {
    onEmailSubmit: (email: string) => Promise<void>
    loading: boolean
}

export const EmailStep = ({ onEmailSubmit, loading }: EmailStepProps) => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState<string>()

    const handleEmailChange = (emailTemp: string) => {
        setEmail(emailTemp)
        if (!emailTemp.trim()) {
            setError("Email is required")
        } else if (!/\S+@\S+\.\S+/.test(emailTemp)) {
            setError("Please enter a valid email address")
        } else {
            setError(undefined)
        }
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <FormField label="Email" htmlFor="email" error={error}>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        placeholder="Enter your email address"
                        className="bg-surface-lighter"
                    />
                </FormField>
            </div>

            <Button
                className="w-full bg-linear-to-r from-primary-main to-primary-light text-white hover:from-primary-light hover:to-primary-main"
                onClick={() => onEmailSubmit(email)}
                disabled={loading || !!error}
            >
                {loading ? "Sending..." : "Send Code"}
            </Button>
        </div>
    )
} 