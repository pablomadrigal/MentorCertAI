"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/atoms/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import { ExamComponentProps, MultipleChoiceQuestion } from "@/types/exam"

export function ExamComponent({ examData, loading, onSubmit }: ExamComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (examData) setAnswers(examData.data.reduce((acc, question, index) => ({ ...acc, [index]: "" }), {} as Record<number, string>))
  }, [examData])

  const handleAnswer = (answer: string) => {
    if (examData) {
      examData.data[currentQuestionIndex].userAnswer = answer
    }
  }

  const handleNext = () => {
    if (examData && currentQuestionIndex < examData.data.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmit = async () => {
    if (!examData) return

    setIsSubmitting(true)
    try {
      // Calculate score
      let correctCount = 0
      examData.data.forEach((question, index) => {
        if (answers[index] === question.answer) {
          correctCount++
        }
      })

      const score = Math.round((correctCount / examData.data.length) * 100)
      examData.score = score

      onSubmit(examData)
    } catch (error) {
      console.error("Error submitting exam:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-main"></div>
      </div>
    )
  }

  if (!loading && (!examData || examData.data.length === 0)) {
    return (
      <div className="relative p-px rounded-lg bg-linear-to-r from-primary-light via-secondary-main to-accent-main shadow-md">
        <Card className="relative rounded-[7px] z-10 bg-surface">
          <CardContent className="p-6">
            <p className="text-center text-text-secondary">No questions available.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = examData?.data[currentQuestionIndex]
  const currentAnswer = answers[currentQuestionIndex]
  const isAnswered = currentAnswer !== ""
  const isLastQuestion = currentQuestionIndex === (examData?.data.length ?? 0) - 1
  const allAnswered = Object.values(answers).every((answer) => answer !== "")

  return (
    <div className="relative p-px rounded-lg bg-linear-to-r from-primary-light via-secondary-main to-accent-main shadow-md">
      <Card className="relative rounded-[7px] z-10 bg-surface">
        <CardHeader>
          <CardTitle>
            Question {currentQuestionIndex + 1} of {examData?.data.length ?? 0}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <p className="text-lg font-medium">{question?.question}</p>

            {question?.type === "multiple_choice" && (
              <div className="space-y-3">
                {(question as MultipleChoiceQuestion).options.map((option: string) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${currentAnswer === option
                      ? "border-primary-main bg-primary-main/10"
                      : "border-surface-lighter hover:border-primary-main/50"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {question?.type === "yes_no" && (
              <div className="flex space-x-4">
                <button
                  onClick={() => handleAnswer("yes")}
                  className={`flex-1 p-4 rounded-lg border transition-all duration-300 ${currentAnswer === "yes"
                    ? "border-primary-main bg-primary-main/10"
                    : "border-surface-lighter hover:border-primary-main/50"
                    }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleAnswer("no")}
                  className={`flex-1 p-4 rounded-lg border transition-all duration-300 ${currentAnswer === "no"
                    ? "border-primary-main bg-primary-main/10"
                    : "border-surface-lighter hover:border-primary-main/50"
                    }`}
                >
                  No
                </button>
              </div>
            )}

            <div className="flex justify-between items-center pt-4">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="bg-surface-lighter border border-surface-lighter text-text-primary hover:bg-secondary-main hover:text-white transition-all duration-300"
              >
                Previous
              </Button>

              {isLastQuestion ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!allAnswered || isSubmitting}
                  className="bg-primary-main text-white hover:bg-primary-light/90 hover:brightness-110 transition-all duration-300"
                >
                  {isSubmitting ? "Submitting..." : "Submit Exam"}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className="bg-primary-main text-white hover:bg-primary-light/90 hover:brightness-110 transition-all duration-300"
                >
                  Next
                </Button>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <div className="flex space-x-1">
                {examData?.data.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-8 rounded-full ${index === currentQuestionIndex
                      ? "bg-primary-main"
                      : answers[index] !== ""
                        ? "bg-accent-main"
                        : "bg-gray-200"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
