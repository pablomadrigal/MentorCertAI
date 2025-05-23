"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/organisms/Header"
import { Footer } from "@/components/organisms/Footer"
import { ExamComponent } from "@/components/organisms/ExamComponent"
import { ExamData } from "@/types/exam"
import { useAuth } from "@/contexts/AuthContext"
import { useApi } from "@/hooks/useApi"

export default function ExamPage() {
  const params = useParams()
  const sessionId = params.sessionId as string
  const [examData, setExamData] = useState<ExamData | null>(null)
  const { user } = useAuth()
  const { get, post, loading, error } = useApi<ExamData>()

  useEffect(() => {


    //PASO #1 Revisar el endpoint GET /sessions/users?room_id=${sessionId}
    //Si el examen existe y tiene score, entonces cargar el componente de resultados setIsExamFinished(true) 

    //PASO #2 Si el examen no existe, entonces cargar el examen desde el endpoint GET /exam?room=${sessionId}
    const fetchSession = async () => {
      try {
        const { data } = await get(`exam?room=${sessionId}`)
        if (data) setExamData(data)
      } catch (error) {
        console.error("Error fetching session:", error)
      }
    }

    fetchSession()
  }, [sessionId, user?.sub, get])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-main"></div>
      </div>
    )
  }

  if (error || !examData) {
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

  const handleSubmit = async (examData: ExamData) => {
    console.log(examData)
    await post('/exam', examData)
    //cambias la variable isExamFinished a true
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Certification Exam for {sessionId}</h1>
          <div className="max-w-3xl mx-auto">
            {/* Si isExamFinished es true, entonces cargar el componente de resultados, si no lo esta cargar el componente de examen */}
            <ExamComponent sessionId={sessionId} examData={examData} loading={loading} onSubmit={handleSubmit} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}