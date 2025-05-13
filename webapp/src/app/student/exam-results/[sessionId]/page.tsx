"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "../../../../app/context/AuthContext"
import { Header } from "../../../../components/organisms/Header"
import { Footer } from "../../../../components/organisms/Footer"
import { Button } from "../../../../components/atoms/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/atoms/Card"
import { NFTDisplayComponent } from "../../../../components/organisms/NFTDisplayComponent"

export default function ExamResultsPage({ params }: { params: { sessionId: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const score = Number.parseInt(searchParams.get("score") || "0")
  const passed = score >= 70

  const { user, isLoading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [certificate, setCertificate] = useState<any>(null)
  const [nft, setNft] = useState<any>(null)

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "student")) {
      router.push("/login")
      return
    }

    const fetchResults = async () => {
      try {
        // In a real app, this would fetch the certificate and NFT from the API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (passed) {
          // Mock certificate data
          setCertificate({
            id: Math.floor(Math.random() * 1000),
            studentId: user?.id || 0,
            issueDate: new Date().toISOString(),
            grade: score,
          })

          // Mock NFT data
          setNft({
            id: Math.floor(Math.random() * 1000),
            certificateId: Math.floor(Math.random() * 1000),
            metadata: {
              name: "MentorCertAi Achievement",
              description:
                "This NFT certifies the successful completion of a mentoring session and passing the certification exam.",
              image: "/placeholder.svg?key=bazmm",
              attributes: [
                {
                  trait_type: "Course",
                  value: "Advanced Mentoring",
                },
                {
                  trait_type: "Grade",
                  value: `${score}%`,
                },
                {
                  trait_type: "Date",
                  value: new Date().toLocaleDateString(),
                },
                {
                  trait_type: "Student",
                  value: user?.name || "Student",
                },
              ],
            },
          })
        }
      } catch (error) {
        console.error("Error fetching results:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchResults()
    }
  }, [user, authLoading, router, params.sessionId, score, passed])

  if (authLoading || isLoading) {
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
          <h1 className="text-3xl font-bold mb-8 text-center">Exam Results</h1>

          <div className="max-w-3xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-center">Your Score: {score}%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 rounded-full border-8 border-primary-main flex items-center justify-center">
                    <span className="text-3xl font-bold">{score}%</span>
                  </div>
                </div>

                <div className="text-center mb-6">
                  {passed ? (
                    <div className="text-success font-bold text-xl">Congratulations! You passed the exam.</div>
                  ) : (
                    <div className="text-error font-bold text-xl">Unfortunately, you did not pass the exam.</div>
                  )}
                </div>

                <div className="flex justify-center">
                  <Button onClick={() => router.push("/student/dashboard")} variant="outline" className="mr-4">
                    Back to Dashboard
                  </Button>

                  {!passed && (
                    <Button onClick={() => router.push(`/student/exam/${params.sessionId}`)}>Retry Exam</Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {passed && certificate && nft && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-center">Your Certificate</h2>
                  <div className="bg-surface p-8 rounded-lg shadow-md">
                    <div className="border-8 border-gray-200 p-8 rounded-lg">
                      <div className="text-center">
                        <h3 className="text-3xl font-bold mb-2">Certificate of Completion</h3>
                        <p className="text-lg mb-8">This certifies that</p>
                        <p className="text-2xl font-bold mb-8">{user?.name || "Student"}</p>
                        <p className="text-lg mb-8">
                          has successfully completed the mentoring session and passed the certification exam with a
                          score of {score}%.
                        </p>
                        <p className="text-lg mb-2">Date: {new Date().toLocaleDateString()}</p>
                        <p className="text-lg">Certificate ID: {certificate.id}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-center">
                      <Button>Download Certificate</Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-center">Your NFT</h2>
                  <NFTDisplayComponent nft={nft} />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
