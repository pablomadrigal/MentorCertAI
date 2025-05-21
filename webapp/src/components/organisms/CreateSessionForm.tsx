"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../atoms/Button"
import { Input } from "../atoms/Input"
import { FormField } from "../molecules/FormField"

export function CreateSessionForm() {
    const [studentEmail, setStudentEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [dateTime, setDateTime] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccess(false)
        setIsLoading(true)

        try {
            // Mock session creation
            await new Promise(resolve => setTimeout(resolve, 1000))

            // In a real app, this would be an API call
            const mockSession = {
                studentEmail,
                mentorId: 1,
                dateTime,
                subject,
                link: `https://meet.mentorcertai.com/${Date.now()}`,
                completed: false,
            }

            console.log("Created mock session:", mockSession)
            setSuccess(true)
            setStudentEmail("")
            setSubject("")
            setDateTime("")
        } catch (err) {
            setError("Failed to create session. Please try again.")
            console.error("Error creating session:", err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="p-6 bg-surface rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Schedule New Session</h2>

            {error && <div className="mb-4 p-3 bg-error/10 border border-error text-error rounded-md">{error}</div>}

            {success && (
                <div className="mb-4 p-3 bg-success/10 border border-success text-success rounded-md">
                    Session created successfully!
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Student Email" htmlFor="studentEmail">
                    <Input
                        id="studentEmail"
                        type="email"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        required
                        placeholder="student@example.com"
                    />
                </FormField>

                <FormField label="Subject" htmlFor="subject">
                    <Input
                        id="subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        placeholder="e.g., JavaScript Fundamentals"
                    />
                </FormField>

                <FormField label="Date & Time" htmlFor="dateTime">
                    <Input
                        id="dateTime"
                        type="datetime-local"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        required
                    />
                </FormField>

                <Button
                    type="submit"
                    className="w-full bg-linear-to-r from-secondary-dark to-secondary-main text-white hover:from-secondary-main hover:to-secondary-dark transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg brightness-110"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating..." : "Create Session"}
                </Button>
            </form>
        </div>
    )
} 