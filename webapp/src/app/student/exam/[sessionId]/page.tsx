"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/organisms/Header"
import { Footer } from "@/components/organisms/Footer"
import { ExamComponent } from "@/components/organisms/ExamComponent"
import { ExamResultsComponent } from "@/components/organisms/ExamResultsComponent"

interface Session {
  id: number;
  studentId: number;
  mentorId: number;
  dateTime: string;
  completed: boolean;
  score?: number;
}

export default function ExamPage() {
  const params = useParams()
  const sessionId = params.sessionId as string
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // In a real app, this would fetch the session from the API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock session data - replace with actual API call
        setSession({
          id: Number.parseInt(sessionId),
          studentId: 0,
          mentorId: 1,
          dateTime: new Date().toISOString(),
          completed: false, // This should come from the API
          score: undefined
        })
      } catch (error) {
        console.error("Error fetching session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSession()
  }, [sessionId])

  if (isLoading) {
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
        <main className="grow py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Session Not Found</h1>
            <p className="mb-8">The session you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Certification Exam for {sessionId}</h1>
          <div className="max-w-3xl mx-auto">
            {session.completed ? (
              <ExamResultsComponent sessionId={session.id} />
            ) : (
              <ExamComponent sessionId={session.id} studentId={session.studentId} />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}