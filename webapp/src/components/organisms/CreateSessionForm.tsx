"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../atoms/Button"
import { Input } from "../atoms/Input"
import { FormField } from "../molecules/FormField"
import { useApi } from "@/hooks/useApi"
import { Session } from "@/types/session"

export function CreateSessionForm() {
    const [studentEmail, setStudentEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [dateTime, setDateTime] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const { post } = useApi<Session[]>()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccess(false)
        setIsLoading(true)

        try {
            const newRoomId = `${Math.random().toString(36).substring(2, 8)}`;
            const temporalSession: Session = {
                room_id: newRoomId,
                theme: subject,
                date_time: dateTime
            }
            const createSessionResponse = await post(`/sessions`, temporalSession)
            if (createSessionResponse.error) {
                setError(createSessionResponse.error)
                setIsLoading(false)
                return
            }

            const temporalUserAtSession = {
                room_id: newRoomId,
                userEmail: studentEmail,
            }

            const createUserAtSessionResponse = await post(`/sessions/users`, temporalUserAtSession)
            if (createUserAtSessionResponse.error) {
                setError(createUserAtSessionResponse.error)
                setIsLoading(false)
                return
            }

            setSuccess(true)
            setStudentEmail("")
            setSubject("")
            setDateTime("")
            setError("")
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