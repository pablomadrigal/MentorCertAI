"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/organisms/Header"
import { Footer } from "@/components/organisms/Footer"
import { ExamComponent } from "@/components/organisms/ExamComponent"
import { ExamData } from "@/types/exam"
import { useApi } from "@/hooks/useApi"
import { ExamResultsComponent } from "@/components/organisms/ExamResultsComponent"
import { SessionByPerson } from "@/types/session"

export default function ExamPage() {
  const params = useParams()
  const sessionId = params.sessionId as string
  const [examData, setExamData] = useState<ExamData | null>(null)
  const [isExamFinished, setIsExamFinished] = useState<boolean>(false)
  const { get: sessionByPersonGet, post, loading, error } = useApi<SessionByPerson[]>()
  const { get, loading: examLoading, error: examError } = useApi<ExamData>()

  useEffect(() => {

    const checkExam = async () => {
      const { data } = await sessionByPersonGet(`/sessions/users?room_id=${sessionId}`)
      const examExists = data && (data[0]?.exam || data[0]?.score);
      if (examExists) {
        setIsExamFinished(true)
      } else {
        await fetchSession()
      }
    }

    const fetchSession = async () => {
      try {
        const { data } = await get(`/exam?room=${sessionId}`)
        console.log(data)
        if (data) setExamData(data)
      } catch (error) {
        console.error("Error fetching session:", error)
      }
    }

    checkExam()

  }, [sessionId, get, sessionByPersonGet])

  if (loading || examLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-main"></div>
      </div>
    )
  }

  if (error || !examData || examError) {
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

  const handleSubmit = async (examData: ExamData, score: number) => {
    console.log(examData)
    const content = { room_id: sessionId, examData, score };
    await post("/exam", content)
    setIsExamFinished(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Certification Exam for {sessionId}</h1>
          <div className="max-w-3xl mx-auto">
            {isExamFinished ? <ExamResultsComponent sessionId={sessionId} /> : <ExamComponent sessionId={sessionId} examData={examData} loading={examLoading} onSubmit={handleSubmit} />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}