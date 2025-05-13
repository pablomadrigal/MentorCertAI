"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../../app/context/AuthContext"
import { useSession } from "../../../app/context/SessionContext"
import { Header } from "../../../components/organisms/Header"
import { Footer } from "../../../components/organisms/Footer"
import { SessionList } from "../../../components/organisms/SessionList"
import { CreateSessionForm } from "../../../components/organisms/CreateSessionForm"

export default function MentorDashboard() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const { fetchSessions } = useSession()

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "mentor")) {
      router.push("/login")
    } else if (user) {
      fetchSessions()
    }
  }, [user, authLoading, router, fetchSessions])

  if (authLoading) {
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
              <h2 className="text-2xl font-bold mb-4">Your Sessions</h2>
              <SessionList />
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
