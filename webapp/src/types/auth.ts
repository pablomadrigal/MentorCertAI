export enum UserRole {
  STUDENT = "student",
  MENTOR = "mentor"
}

export interface UserProfile {
  sub: string
  email: string
  full_name: string
  role: UserRole
  accept_terms: boolean
}

export interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
  isAuthenticated: boolean
  isMentor: boolean
  isStudent: boolean
} 

export interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}