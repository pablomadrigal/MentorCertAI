"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../atoms/Button"
import { Input } from "../atoms/Input"
import { FormField } from "../molecules/FormField"

// Mock user type
type User = {
    id: number
    name: string
    email: string
    role: "student" | "mentor"
}

export function LoginForm() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [role, setRole] = useState<"student" | "mentor">("student")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            // Mock login
            await new Promise(resolve => setTimeout(resolve, 1000))

            // In a real app, this would be an API call
            const mockUser: User = {
                id: 1,
                name: "John Doe",
                email,
                role
            }

            console.log("Logged in as:", mockUser)
            router.push(role === "student" ? "/student/dashboard" : "/mentor/dashboard")
        } catch (err) {
            setError("Failed to login. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-md w-full mx-auto p-6 bg-surface rounded-lg shadow-lg border border-surface-lighter">
            <h2 className="text-2xl font-bold mb-6 text-center text-text-primary">Login</h2>

            {error && <div className="mb-4 p-3 bg-error/10 border border-error text-error rounded-md">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Email" htmlFor="email">
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        className="bg-surface-lighter border-surface-lighter text-text-primary"
                    />
                </FormField>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">I am a:</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                checked={role === "student"}
                                onChange={() => setRole("student")}
                                className="h-4 w-4 text-secondary-main"
                            />
                            <span className="text-text-primary">Student</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                checked={role === "mentor"}
                                onChange={() => setRole("mentor")}
                                className="h-4 w-4 text-secondary-main"
                            />
                            <span className="text-text-primary">Mentor</span>
                        </label>
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-linear-to-r from-secondary-dark to-secondary-main text-white hover:from-secondary-main hover:to-secondary-light brightness-110 shadow-md"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </Button>
            </form>
        </div>
    )
} 