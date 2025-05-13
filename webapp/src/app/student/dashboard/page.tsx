"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../../app/context/AuthContext"
import { useSession } from "../../../app/context/SessionContext"
import { Header } from "../../../components/organisms/Header"
import { Footer } from "../../../components/organisms/Footer"
import { SessionList } from "../../../components/organisms/SessionList"

export default function StudentDashboard() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const { fetchSessions } = useSession()

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "student")) {
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
          <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Your Sessions</h2>
              <SessionList />
            </div>

            <div>
              <div className="bg-surface p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Your Progress</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Completed Sessions</p>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-primary-main rounded-full" style={{ width: "60%" }}></div>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>3/5</span>
                      <span>60%</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-text-secondary mb-1">Certificates Earned</p>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-secondary-main rounded-full" style={{ width: "40%" }}></div>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>2/5</span>
                      <span>40%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
