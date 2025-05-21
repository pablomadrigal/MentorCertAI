export type UserRole = "student" | "mentor"

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
} 