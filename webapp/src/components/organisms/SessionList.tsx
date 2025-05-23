"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Session, SessionListProps, StudentSession } from "@/types/session"
import { useAuth } from "@/contexts/AuthContext"
import { StudentSessionCard } from "@/components/molecules/StudentSessionCard"
import { MentorSessionCard } from "@/components/molecules/MentorSessionCard"

export function SessionList({ sessions, filter = "all" }: SessionListProps) {
  const router = useRouter()
  const [filteredSessions, setFilteredSessions] = useState<Session[]>(sessions)
  const { user } = useAuth()

  useEffect(() => {
    if (sessions.length === 0) return

    let result = [...sessions]

    if (filter === "upcoming") {
      result = result.filter((session) => session.date_time && new Date(session.date_time) > new Date())
    } else if (filter === "completed") {
      result = result.filter((session) => !session.date_time || new Date(session.date_time) < new Date())
    }

    result.sort((a, b) => {
      if (filter === "all") {
        if (a.date_time && b.date_time) {
          return a.date_time > b.date_time ? 1 : -1
        }
      }

      const dateA = a.date_time ? new Date(a.date_time) : new Date(0)
      const dateB = b.date_time ? new Date(b.date_time) : new Date(0)

      const isPastA = dateA < new Date()
      const isPastB = dateB < new Date()

      if (isPastA && isPastB) {
        return dateB.getTime() - dateA.getTime()
      } else {
        return dateA.getTime() - dateB.getTime()
      }
    })

    setFilteredSessions(result)
  }, [sessions, filter])

  if (!filteredSessions || filteredSessions.length === 0) {
    return (
      <div className="text-center py-8 bg-surface-lighter rounded-lg p-6">
        <p className="text-text-secondary">
          {filter === "all"
            ? "No sessions found."
            : filter === "upcoming"
              ? "No upcoming sessions found."
              : "No completed sessions found."}
        </p>
        {filter === "all" && <p className="text-text-secondary mt-2">Schedule a new session to get started.</p>}
        {filter !== "all" && <p className="text-text-secondary mt-2">Try changing the filter to see other sessions.</p>}
      </div>
    )
  }

  const handleJoinSessionMentor = (sessionId: string) => {
    if (!user) return
    router.push(`/meeting/${sessionId}`)
  }

  const handleJoinSessionStudent = (sessionId: string, sessionDate?: string, score?: number) => {
    if (!user) return

    const completed = sessionDate ? new Date(sessionDate) < new Date() : false
    const examPassed = score !== undefined && score >= 70

    if (!completed) {
      router.push(`/meeting/${sessionId}`)
    } else if (examPassed) {
      router.push(`/student/certificates?sessionId=${sessionId}`)
    } else {
      router.push(`/student/exam/${sessionId}`)
    }
  }

  if (!user) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {filteredSessions.map((session) => (
        <div key={session.room_id} className="h-full">
          {user.role === "student" ? (
            <StudentSessionCard
              session={session as StudentSession}
              mentorName={session.owner_id || "Mentor"}
              onJoin={() => handleJoinSessionStudent(session.room_id, session.date_time, (session as StudentSession).score)}
              onViewCertificate={() => router.push(`/student/certificates?sessionId=${session.room_id}`)}
            />
          ) : (
            <MentorSessionCard
              session={session}
              studentName={session.owner_id || "Student"}
              onJoin={() => handleJoinSessionMentor(session.room_id)}
            />
          )}
        </div>
      ))}
    </div>
  )
}
