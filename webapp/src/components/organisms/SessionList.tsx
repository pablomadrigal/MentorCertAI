"use client"

import { SessionCard } from "@/components/molecules/SessionCard"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Session, SessionListProps } from "@/types/session"
import { useAuth } from "@/contexts/AuthContext"

export function SessionList({ sessions, filter = "all" }: SessionListProps) {
  const router = useRouter()
  const [filteredSessions, setFilteredSessions] = useState<Session[]>(sessions)
  const { user } = useAuth()


  // Aplicar filtros cuando cambian las sesiones o el filtro
  useEffect(() => {
    if (sessions.length === 0) return

    let result = [...sessions]

    // Aplicar filtro según el tipo seleccionado
    if (filter === "upcoming") {
      result = result.filter((session) => !session.completed)
    } else if (filter === "completed") {
      result = result.filter((session) => session.completed)
    }

    // Ordenar sesiones: primero las próximas, luego las pasadas
    result.sort((a, b) => {
      // Si el filtro es específico, no necesitamos ordenar por estado
      if (filter === "all") {
        // Primero ordenar por estado (no completadas primero)
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1
        }
      }

      // Luego ordenar por fecha
      const dateA = new Date(a.dateTime)
      const dateB = new Date(b.dateTime)

      if (a.completed) {
        // Para sesiones completadas, mostrar las más recientes primero
        return dateB.getTime() - dateA.getTime()
      } else {
        // Para sesiones próximas, mostrar las más cercanas primero
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

  // Modificar la función handleJoinSession para manejar tanto sesiones como exámenes y certificados
  const handleJoinSession = (sessionId: string, completed: boolean, examPassed?: boolean) => {
    // Si la sesión está completada, el examen ha sido aprobado y el usuario es estudiante, ir a certificados
    if (completed && examPassed && user?.role === "student") {
      router.push(`/student/certificates?sessionId=${sessionId}`)
    }
    // Si la sesión está completada y el usuario es estudiante, ir al examen
    else if (completed && user?.role === "student") {
      router.push(`/student/exam/${sessionId}`)
    } else {
      // De lo contrario, ir a la sesión de video
      router.push(`/session/${sessionId}`)
    }
  }

  // Modificar el return para incluir la propiedad examPassed
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {filteredSessions.map((session) => (
        <div key={session.id} className="h-full">
          {" "}
          {/* Altura fija para cada contenedor de card */}
          <SessionCard
            dateTime={session.dateTime}
            completed={session.completed}
            examPassed={session.examPassed} // Añadir la propiedad examPassed
            subject={session.subject}
            studentName={session.studentName}
            mentorName={session.mentorName}
            userRole={user?.role || "student"}
            onJoin={() => handleJoinSession(session.id, session.completed, session.examPassed)}
            onViewCertificate={() => router.push(`/student/certificates?sessionId=${session.id}`)} // Añadir manejador para ver certificado
          />
        </div>
      ))}
    </div>
  )
}
