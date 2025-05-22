export type UserRole = "student" | "mentor"

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
} 

export interface CreateUserIfNotExistsProps {
  mentorId: string;
  newUserEmail: string;
}