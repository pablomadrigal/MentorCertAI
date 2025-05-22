export interface BaseQuestion {
  type: string
  question: string
  answer: string | number
  userAnswer?: string | number
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple_choice"
  options: string[]
}

export interface YesNoQuestion extends BaseQuestion {
  type: "yes_no"
  answer: "yes" | "no"
}

export type Question = MultipleChoiceQuestion | YesNoQuestion

export interface ExamData {
  success: boolean
  data: Question[]
  score?: number
}

export interface ExamComponentProps {
  sessionId: string
  examData: ExamData
  loading: boolean
  onSubmit: (examData: ExamData) => void
} 