"use client"

import { useEffect, useState } from "react"
import { Header } from "../../../components/organisms/Header"
import { Footer } from "../../../components/organisms/Footer"
import { VideoCallComponent } from "../../../components/organisms/VideoCallComponent"

export default function SessionPage({ params }: { params: { sessionId: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {

    const fetchSession = async () => {
      try {
        // In a real app, this would fetch the session from the API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock session data
        setSession({
          id: Number.parseInt(params.sessionId),
          studentId: 2,
          mentorId: 1,
          dateTime: new Date().toISOString(),
          completed: false,
        })
      } catch (error) {
        console.error("Error fetching session:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSession()

  }, [params.sessionId])

  const handleEndCall = async () => {
    try {
      // In a real app, this would update the session in the API
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("Error ending call:", error)
    }
  }

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
          <h1 className="text-3xl font-bold mb-8">Video Session</h1>
          <div className="max-w-4xl mx-auto">
            <VideoCallComponent sessionId={session.id} onEnd={handleEndCall} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
