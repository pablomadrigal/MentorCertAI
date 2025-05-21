"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../atoms/Button"
import { Input } from "../atoms/Input"
import { FormField } from "../molecules/FormField"
import { User } from "@/types/user"

export function LoginForm() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            // Mock login - in a real app, this would be an API call
            const mockUser: User = {
                id: 1,
                name: "John Doe",
                email: email,
                role: "student",
            }

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Store user in localStorage
            localStorage.setItem("user", JSON.stringify(mockUser))

            // Redirect based on role
            router.push(mockUser.role === "student" ? "/student/dashboard" : "/mentor/dashboard")
        } catch (error) {
            setError("Invalid email or password")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-md w-full mx-auto p-6 bg-surface rounded-lg shadow-lg border border-surface-lighter">
            <h2 className="text-2xl font-bold mb-6 text-center text-text-primary">Login</h2>

            {error && <div className="mb-4 p-3 bg-error/10 border border-error text-error rounded-md">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <FormField label="Email" htmlFor="email" error={error}>
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

                <FormField label="Password" htmlFor="password">
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                        className="bg-surface-lighter border-surface-lighter text-text-primary"
                    />
                </FormField>

                <Button
                    type="submit"
                    className="w-full bg-linear-to-r from-secondary-dark to-secondary-main text-white hover:from-secondary-main hover:to-secondary-light brightness-110 shadow-md"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing in..." : "Sign In"}
                </Button>
            </form>
        </div>
    )
} 