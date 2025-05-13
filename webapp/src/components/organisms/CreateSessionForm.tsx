"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "../../app/context/SessionContext"
import { useAuth } from "../../app/context/AuthContext"
import { Button } from "../atoms/Button"
import { Input } from "../atoms/Input"
import { FormField } from "../molecules/FormField"

export function CreateSessionForm() {
  const { createSession } = useSession()
  const { user } = useAuth()
  const [studentId, setStudentId] = useState("")
  const [dateTime, setDateTime] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setIsLoading(true)

    if (!user) {
      setError("You must be logged in to create a session")
      setIsLoading(false)
      return
    }

    try {
      await createSession({
        studentId: Number.parseInt(studentId),
        mentorId: user.id,
        dateTime,
        link: `https://meet.mentorcertai.com/${Date.now()}`,
        completed: false,
      })
      setSuccess(true)
      setStudentId("")
      setDateTime("")
    } catch (err) {
      setError("Failed to create session. Please try again.")
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
        <FormField label="Student ID" htmlFor="studentId">
          <Input
            id="studentId"
            type="number"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            placeholder="Enter student ID"
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating..." : "Schedule Session"}
        </Button>
      </form>
    </div>
  )
}
