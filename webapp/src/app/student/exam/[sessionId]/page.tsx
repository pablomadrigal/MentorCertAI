"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../../../app/context/AuthContext"
import { Header } from "../../../../components/organisms/Header"
import { Footer } from "../../../../components/organisms/Footer"
import { ExamComponent } from "../../../../components/organisms/ExamComponent"

export default function ExamPage({ params }: { params: { sessionId: string } }) {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "student")) {
      router.push("/login")
      return
    }

    const fetchSession = async () => {
      try {
        // In a real app, this would fetch the session from the API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock session data
        setSession({
          id: Number.parseInt(params.sessionId),
          studentId: user?.id || 0,
          mentorId: 1,
          dateTime: new Date().toISOString(),
          completed: true,
        })
      } catch (error) {
        console.error("Error fetching session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchSession()
    }
  }, [user, authLoading, router, params.sessionId])

  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-main"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Session Not Found</h1>
            <p className="mb-8">The session you're looking for doesn't exist or you don't have access to it.</p>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Certification Exam</h1>
          <div className="max-w-3xl mx-auto">
            <ExamComponent sessionId={session.id} studentId={session.studentId} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
