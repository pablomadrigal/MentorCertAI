import { Button } from "@/components/atoms/Button"
import { Input } from "@/components/atoms/Input"
import { FormField } from "../FormField"
import { useState } from "react"
import { UserRole } from "@/types/auth"

interface SignupStepProps {
    onSubmit: (data: { fullName: string; role: UserRole; acceptTerms: boolean }) => Promise<void>
    loading: boolean
}

export const SignupStep = ({ onSubmit, loading }: SignupStepProps) => {
    const [fullName, setFullName] = useState("")
    const [role, setRole] = useState<UserRole>(UserRole.STUDENT)
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [error, setError] = useState<string>()

    const handleSubmit = () => {
        if (!fullName.trim()) {
            setError("Full name is required")
            return
        }
        onSubmit({ fullName, role, acceptTerms })
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <FormField label="Full Name" htmlFor="fullName" error={error}>
                    <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="bg-surface-lighter"
                    />
                </FormField>
            </div>

            <div className="space-y-2">
                <FormField label="I am a:" htmlFor="role">
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                checked={role === UserRole.STUDENT}
                                onChange={() => setRole(UserRole.STUDENT)}
                                className="h-4 w-4 text-secondary-main"
                            />
                            <span className="text-text-primary">Student</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                checked={role === UserRole.MENTOR}
                                onChange={() => setRole(UserRole.MENTOR)}
                                className="h-4 w-4 text-secondary-main"
                            />
                            <span className="text-text-primary">Mentor</span>
                        </label>
                    </div>
                </FormField>
            </div>

            <div className="space-y-2">
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            type="checkbox"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                            className="w-4 h-4 border border-surface-lighter rounded bg-surface-lighter focus:ring-2 focus:ring-secondary-main"
                        />
                    </div>
                    <div className="ml-3">
                        <label htmlFor="terms" className="text-sm text-text-secondary">
                            I accept the{" "}
                            <span className="text-secondary-main hover:underline cursor-pointer">Terms and Conditions</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <Button
                    onClick={handleSubmit}
                    disabled={loading || !acceptTerms || !!error || !fullName.trim()}
                    className="w-full bg-linear-to-r from-secondary-dark to-secondary-main text-white hover:from-secondary-main hover:to-secondary-dark transition-all brightness-110"
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                            Processing...
                        </div>
                    ) : (
                        "Register"
                    )}
                </Button>
            </div>
        </div>
    )
} 