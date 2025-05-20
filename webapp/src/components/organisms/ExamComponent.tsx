"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../components/atoms/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/atoms/Card"

// Define types based on the JSON format
interface BaseQuestion {
  type: string
  question: string
  answer: string | number
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple_choice"
  options: string[]
}

interface YesNoQuestion extends BaseQuestion {
  type: "yes_no"
  answer: "yes" | "no"
}

type Question = MultipleChoiceQuestion | YesNoQuestion

interface ExamData {
  success: boolean
  data: Question[]
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
    // Load questions from JSON file
    const fetchQuestions = async () => {
      try {
        setIsLoading(true)

        // In a real implementation, this would load a session-specific JSON file
        // For now, we use a static URL for the example
        const response = await fetch("/api/exams/example")

        if (!response.ok) {
          throw new Error("Failed to fetch exam questions")
        }

        const examData: ExamData = await response.json()

        if (!examData.success || !examData.data || !Array.isArray(examData.data)) {
          throw new Error("Invalid exam data format")
        }

        setQuestions(examData.data)
        setAnswers(new Array(examData.data.length).fill(null))
      } catch (error) {
        console.error("Error fetching questions:", error)
        // Use example questions in case of error
        const fallbackQuestions: Question[] = [
          {
            type: "multiple_choice",
            question: "What technology will be used starting in January?",
            options: ["AI algorithms", "Blockchain certificates", "Traditional paper documents", "Cloud storage"],
            answer: "Blockchain certificates",
          },
          {
            type: "yes_no",
            question: "Is blockchain technology used for certificate verification?",
            answer: "yes",
          },
          {
            type: "multiple_choice",
            question: "Which of the following is NOT a benefit of AI-powered mentoring?",
            options: [
              "Personalized learning paths",
              "Real-time feedback",
              "Replacing human mentors entirely",
              "Adaptive content recommendations",
            ],
            answer: "Replacing human mentors entirely",
          },
          {
            type: "yes_no",
            question: "Can NFTs be used to represent digital certificates?",
            answer: "yes",
          },
          {
            type: "multiple_choice",
            question: "Which technology is used to ensure certificate authenticity?",
            options: ["Blockchain", "Machine Learning", "Virtual Reality", "Augmented Reality"],
            answer: "Blockchain",
          },
        ]
        setQuestions(fallbackQuestions)
        setAnswers(new Array(fallbackQuestions.length).fill(null))
      } finally {
        setIsLoading(false)
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
        if (answers[index] === question.answer) {
          correctCount++
        }
      })

      const score = Math.round((correctCount / questions.length) * 100)

      // In a real app, this would send the exam results to the API
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

  if (questions.length === 0) {
    return (
      <div className="relative p-px rounded-lg bg-linear-to-r from-primary-light via-secondary-main to-accent-main shadow-md">
        <Card className="w-full rounded-[7px]">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-text-secondary mb-4">No exam questions available for this session.</p>
              <Button onClick={() => router.push("/student/dashboard")}>Return to Dashboard</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const currentAnswer = answers[currentQuestion]
  const isAnswered = currentAnswer !== null && currentAnswer !== undefined
  const isLastQuestion = currentQuestion === questions.length - 1
  const allAnswered = answers.every((answer) => answer !== null && answer !== undefined)

  return (
    <div className="relative p-px rounded-lg bg-linear-to-r from-primary-light via-secondary-main to-accent-main shadow-md">
      <Card className="w-full rounded-[7px]">
        <CardHeader>
          <CardTitle>
            Question {currentQuestion + 1} of {questions.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">{question.question}</h3>

              {question.type === "yes_no" && (
                <div className="flex space-x-4">
                  <Button
                    className={`border border-surface-lighter ${currentAnswer === "yes" ? "bg-accent-main text-primary-dark hover:bg-accent-light" : "bg-surface-lighter hover:bg-surface-lighter/80"}`}
                    onClick={() => handleAnswer("yes")}
                  >
                    Yes
                  </Button>
                  <Button
                    className={`border border-surface-lighter ${currentAnswer === "no" ? "bg-accent-main text-primary-dark hover:bg-accent-light" : "bg-surface-lighter hover:bg-surface-lighter/80"}`}
                    onClick={() => handleAnswer("no")}
                  >
                    No
                  </Button>
                </div>
              )}

              {question.type === "multiple_choice" && (
                <div className="space-y-2">
                  {(question as MultipleChoiceQuestion).options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-md border border-surface-lighter cursor-pointer ${currentAnswer === option
                        ? "bg-accent-main text-primary-dark"
                        : "bg-surface-lighter hover:bg-surface-lighter/80"
                        }`}
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="bg-surface-lighter border border-surface-lighter text-text-primary hover:bg-secondary-main hover:text-white transition-all duration-300"
              >
                Previous
              </Button>

              {isLastQuestion ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!allAnswered || isSubmitting}
                  className="bg-secondary-main text-white hover:bg-secondary-light transition-all duration-300"
                >
                  {isSubmitting ? "Submitting..." : "Submit Exam"}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className="bg-secondary-main text-white hover:bg-secondary-light transition-all duration-300"
                >
                  Next
                </Button>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <div className="flex space-x-1">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-8 rounded-full ${index === currentQuestion
                      ? "bg-primary-main"
                      : answers[index] !== null && answers[index] !== undefined
                        ? "bg-accent-main"
                        : "bg-gray-200"
                      }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
