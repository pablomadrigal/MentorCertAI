"use client"

import { useSession } from "../../app/context/SessionContext"
import { useAuth } from "../../app/context/AuthContext"
import { SessionCard } from "../molecules/SessionCard"
import { useRouter } from "next/navigation"

export function SessionList() {
  const { sessions, isLoading } = useSession()
  const { user } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-gray-200 animate-pulse rounded-lg"></div>
        ))}
      </div>
    )
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text-secondary">No sessions found.</p>
      </div>
    )
  }

  const handleJoinSession = (sessionId: number) => {
    // In a real app, this would navigate to the video call
    router.push(`/session/${sessionId}`)
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          id={session.id}
          dateTime={session.dateTime}
          link={session.link}
          completed={session.completed}
          userRole={user?.role || "student"}
          onJoin={() => handleJoinSession(session.id)}
        />
      ))}
    </div>
  )
}
