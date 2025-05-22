export type FilterType = "all" | "upcoming" | "completed"

export interface ApiSession {
  room_id: string
  theme: string
  transcription?: JSON
  owner_id?: string
}

export interface Session {
  id: string
  studentId: string
  studentEmail: string
  studentName: string
  mentorId: number
  mentorName: string
  subject: string
  dateTime: string
  link: string
  completed: boolean
  examPassed?: boolean
}

export interface SessionListProps {
  sessions: Session[]
  filter?: "all" | "upcoming" | "completed"
  loading?: boolean
} 

export interface SessionCardProps {
  dateTime: string
  mentorName?: string
  studentName?: string
  subject?: string
  completed: boolean
  userRole: "student" | "mentor"
  examPassed?: boolean // Nueva propiedad para indicar si el examen fue aprobado
  onJoin: () => void
  onViewCertificate?: () => void // Nueva propiedad para manejar la acción de ver el certificado
}