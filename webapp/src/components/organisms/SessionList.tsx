"use client"

import { useEffect, useState } from "react"
import { SessionCard } from "../molecules/SessionCard"
import { useRouter } from "next/navigation"

interface Session {
    id: number
    studentId: number
    studentEmail: string
    studentName: string
    mentorId: number
    mentorName: string
    subject: string
    dateTime: string
    link: string
    completed: boolean
}

interface SessionListProps {
    useMockData?: boolean
    mockData?: Session[]
    filter?: "all" | "upcoming" | "completed"
}

// Mock data for sessions
const defaultMockData: Session[] = [
    {
        id: 101,
        studentId: 201,
        studentEmail: "emma@example.com",
        studentName: "Emma Wilson",
        mentorId: 3,
        mentorName: "Bob Johnson",
        subject: "JavaScript Fundamentals",
        dateTime: new Date(Date.now() + 172800000).toISOString(),
        link: "https://meet.mentorcertai.com/mock101",
        completed: false,
    },
    {
        id: 102,
        studentId: 202,
        studentEmail: "david@example.com",
        studentName: "David Miller",
        mentorId: 3,
        mentorName: "Bob Johnson",
        subject: "React Hooks Advanced",
        dateTime: new Date(Date.now() + 86400000).toISOString(),
        link: "https://meet.mentorcertai.com/mock102",
        completed: false,
    },
    {
        id: 103,
        studentId: 203,
        studentEmail: "sophia@example.com",
        studentName: "Sophia Chen",
        mentorId: 3,
        mentorName: "Bob Johnson",
        subject: "API Design Patterns",
        dateTime: new Date(Date.now() - 86400000).toISOString(),
        link: "https://meet.mentorcertai.com/mock103",
        completed: true,
    }
]

export function SessionList({ useMockData = true, mockData = defaultMockData, filter = "all" }: SessionListProps) {
    const router = useRouter()
    const [displaySessions, setDisplaySessions] = useState<Session[]>([])

    useEffect(() => {
        const sessions = mockData || defaultMockData
        let filtered = [...sessions]

        if (filter === "upcoming") {
            filtered = filtered.filter(session => !session.completed)
        } else if (filter === "completed") {
            filtered = filtered.filter(session => session.completed)
        }

        setDisplaySessions(filtered)
    }, [mockData, filter])

    const handleJoinSession = (sessionId: number) => {
        router.push(`/session/${sessionId}`)
    }

    if (displaySessions.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-text-secondary">No sessions found.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displaySessions.map((session) => (
                <SessionCard
                    key={session.id}
                    id={session.id}
                    dateTime={session.dateTime}
                    mentorName={session.mentorName}
                    studentName={session.studentName}
                    subject={session.subject}
                    link={session.link}
                    completed={session.completed}
                    userRole="student"
                    onJoin={() => handleJoinSession(session.id)}
                />
            ))}
        </div>
    )
} 