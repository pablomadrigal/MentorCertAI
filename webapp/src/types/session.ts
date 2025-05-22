export type FilterType = "all" | "upcoming" | "completed"

export interface Session {
  room_id: string
  theme: string
  transcription?: JSON
  owner_id?: string
  date_time?: string
}

export interface SessionByPerson {
  room_id: string
  user_id: string
  exam?: JSON
  score?: number
}

export interface StudentSession extends Session {
  user_id: string
  exam?: JSON
  score?: number
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