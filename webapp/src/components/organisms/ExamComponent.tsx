"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/atoms/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"

interface Question {
  id: number
  text: string
  type: "yesno" | "multiple"
  options?: string[]
  correctAnswer: string | number
}

interface ExamComponentProps {
  sessionId: number
  studentId: number
}

export function ExamComponent({ sessionId, studentId }: ExamComponentProps) {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(string | number)[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // In a real app, this would fetch questions from the API
    const fetchQuestions = async () => {
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock questions
        const mockQuestions: Question[] = [
          {
            id: 1,
            text: "Is blockchain technology used for certificate verification?",
            type: "yesno",
            correctAnswer: "yes",
          },
          {
            id: 2,
            text: "Which of the following is NOT a benefit of AI-powered mentoring?",
            type: "multiple",
            options: [
              "Personalized learning paths",
              "Real-time feedback",
              "Replacing human mentors entirely",
              "Adaptive content recommendations",
            ],
            correctAnswer: 2,
          },
          {
            id: 3,
            text: "Can NFTs be used to represent digital certificates?",
            type: "yesno",
            correctAnswer: "yes",
          },
          {
            id: 4,
            text: "Which technology is used to ensure certificate authenticity?",
            type: "multiple",
            options: ["Blockchain", "Machine Learning", "Virtual Reality", "Augmented Reality"],
            correctAnswer: 0,
          },
          {
            id: 5,
            text: "Is continuous learning important for professional development?",
            type: "yesno",
            correctAnswer: "yes",
          },
        ]

        setQuestions(mockQuestions)
        setAnswers(new Array(mockQuestions.length).fill(null))
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching questions:", error)
      }
    }

    fetchQuestions()
  }, [sessionId])

  const handleAnswer = (answer: string | number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Calculate score
      let correctCount = 0
      questions.forEach((question, index) => {
        if (answers[index] === question.correctAnswer) {
          correctCount++
        }
      })

      const score = Math.round((correctCount / questions.length) * 100)

      // In a real app, this would submit the exam results to the API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to results page
      router.push(`/student/exam-results/${sessionId}?score=${score}`)
    } catch (error) {
      console.error("Error submitting exam:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-main"></div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const currentAnswer = answers[currentQuestion]
  const isAnswered = currentAnswer !== null && currentAnswer !== undefined
  const isLastQuestion = currentQuestion === questions.length - 1
  const allAnswered = answers.every((answer) => answer !== null && answer !== undefined)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{question.text}</h3>

            {question.type === "yesno" && (
              <div className="flex space-x-4">
                <Button variant={currentAnswer === "yes" ? "default" : "outline"} onClick={() => handleAnswer("yes")}>
                  Yes
                </Button>
                <Button variant={currentAnswer === "no" ? "default" : "outline"} onClick={() => handleAnswer("no")}>
                  No
                </Button>
              </div>
            )}

            {question.type === "multiple" && question.options && (
              <div className="space-y-2">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-md border cursor-pointer ${
                      currentAnswer === index ? "bg-primary-main text-white" : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleAnswer(index)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
              Previous
            </Button>

            {isLastQuestion ? (
              <Button onClick={handleSubmit} disabled={!allAnswered || isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Exam"}
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!isAnswered}>
                Next
              </Button>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <div className="flex space-x-1">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-8 rounded-full ${
                    index === currentQuestion
                      ? "bg-primary-main"
                      : answers[index] !== null && answers[index] !== undefined
                        ? "bg-primary-light"
                        : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
