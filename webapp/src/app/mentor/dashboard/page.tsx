"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/organisms/Header"
import { Footer } from "@/components/organisms/Footer"
import { SessionList } from "@/components/organisms/SessionList"
import { CreateSessionForm } from "@/components/organisms/CreateSessionForm"
import { FilterType, Session } from "@/types/session"

export default function MentorDashboard() {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [sessions, setSessions] = useState<Session[]>([])

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(`/api/sessions?filter=${activeFilter}`)
        const data = await response.json()
        setSessions(data)
        setDataLoaded(true)
      } catch (error) {
        console.error('Error fetching sessions:', error)
        setDataLoaded(true)
      }
    }

    fetchSessions()
  }, [activeFilter])

  // Count sessions by type
  const upcomingSessions = sessions.filter((s) => !s.completed).length
  const completedSessions = sessions.filter((s) => s.completed).length

  // Handle filter change
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

      <main className="grow py-8">
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
              <SessionList sessions={sessions} />
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
