export type FilterType = "all" | "upcoming" | "completed"

export interface Session {
  id: string
  studentId: number
  studentEmail: string
  studentName: string
  mentorId: number
  mentorName: string
  subject: string
  dateTime: string
  link: string
  completed: boolean
}

export interface SessionListProps {
  sessions: Session[]
} 