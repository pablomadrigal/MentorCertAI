"use client"

import { useEffect, useState } from "react"
import { Header } from "../../../components/organisms/Header"
import { Footer } from "../../../components/organisms/Footer"
import { SessionList } from "../../../components/organisms/SessionList"
import { CreateSessionForm } from "../../../components/organisms/CreateSessionForm"

// Datos de ejemplo para el dashboard
const mockSessions = [
  {
    id: 101,
    studentId: 201,
    studentEmail: "emma@example.com",
    studentName: "Emma Wilson",
    mentorId: 3,
    mentorName: "Bob Johnson",
    subject: "JavaScript Fundamentals",
    dateTime: new Date(Date.now() + 172800000).toISOString(), // 2 días en el futuro
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
    dateTime: new Date(Date.now() + 86400000).toISOString(), // 1 día en el futuro
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
    dateTime: new Date(Date.now() - 86400000).toISOString(), // 1 día en el pasado
    link: "https://meet.mentorcertai.com/mock103",
    completed: true,
  },
  {
    id: 104,
    studentId: 204,
    studentEmail: "james@example.com",
    studentName: "James Taylor",
    mentorId: 3,
    mentorName: "Bob Johnson",
    subject: "Database Optimization",
    dateTime: new Date(Date.now() - 172800000).toISOString(), // 2 días en el pasado
    link: "https://meet.mentorcertai.com/mock104",
    completed: true,
  },
  {
    id: 105,
    studentId: 205,
    studentEmail: "olivia@example.com",
    studentName: "Olivia Martinez",
    mentorId: 3,
    mentorName: "Bob Johnson",
    subject: "UI/UX Best Practices",
    dateTime: new Date(Date.now() + 345600000).toISOString(), // 4 días en el futuro
    link: "https://meet.mentorcertai.com/mock105",
    completed: false,
  },
  {
    id: 106,
    studentId: 206,
    studentEmail: "noah@example.com",
    studentName: "Noah Garcia",
    mentorId: 3,
    mentorName: "Bob Johnson",
    subject: "Mobile App Development",
    dateTime: new Date(Date.now() + 259200000).toISOString(), // 3 días en el futuro
    link: "https://meet.mentorcertai.com/mock106",
    completed: false,
  },
]

// Tipos de filtro para las sesiones
type FilterType = "all" | "upcoming" | "completed"

export default function MentorDashboard() {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [sessions, setSessions] = useState(mockSessions)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSessions(mockSessions)
      setDataLoaded(true)
    }, 500)

    return () => clearTimeout(timer)

  }, [setSessions, mockSessions, setDataLoaded])

  // Contar sesiones por tipo
  const upcomingSessions = sessions.filter((s) => !s.completed).length
  const completedSessions = sessions.filter((s) => s.completed).length

  // Manejar el cambio de filtro
  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter)
  }

  if (!dataLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-main"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Mentor Dashboard</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                <h2 className="text-2xl font-bold">Your Sessions</h2>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleFilterChange("all")}
                    className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${activeFilter === "all"
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-surface-lighter text-text-secondary hover:bg-surface-lighter/80"
                      }`}
                  >
                    All Sessions
                  </button>
                  <button
                    onClick={() => handleFilterChange("upcoming")}
                    className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${activeFilter === "upcoming"
                      ? "bg-secondary-main text-white shadow-md"
                      : "bg-surface-lighter text-text-secondary hover:bg-surface-lighter/80"
                      }`}
                  >
                    {upcomingSessions} Upcoming
                  </button>
                  <button
                    onClick={() => handleFilterChange("completed")}
                    className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${activeFilter === "completed"
                      ? "bg-accent-main text-primary-dark shadow-md"
                      : "bg-surface-lighter text-text-secondary hover:bg-surface-lighter/80"
                      }`}
                  >
                    {completedSessions} Completed
                  </button>
                </div>
              </div>
              <SessionList useMockData={true} mockData={mockSessions} filter={activeFilter} />
            </div>

            <div>
              <CreateSessionForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
