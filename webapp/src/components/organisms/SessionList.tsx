"use client"

import { SessionCard } from "@/components/molecules/SessionCard"
import { useRouter } from "next/navigation"
import { SessionListProps } from "@/types/session"

export function SessionList({ sessions }: SessionListProps) {
    const router = useRouter()

    const handleJoinSession = (sessionId: string) => {
        router.push(`/session/${sessionId}`)
    }

    if (sessions.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-text-secondary">No sessions found.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
                <SessionCard
                    key={session.id}
                    id={session.id.toString()}
                    dateTime={session.dateTime}
                    mentorName={session.mentorName}
                    studentName={session.studentName}
                    subject={session.subject}
                    completed={session.completed}
                    userRole="student"
                    onJoin={() => handleJoinSession(session.id)}
                    title={session.subject}
                    description={session.dateTime}
                    date={session.dateTime}
                    status={session.completed ? "Completed" : "Upcoming"}
                />
            ))}
        </div>
    )
} 