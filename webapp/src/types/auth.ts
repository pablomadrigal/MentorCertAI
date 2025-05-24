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
  public_key?: string
}

export interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
  isAuthenticated: boolean
  isMentor: boolean
  isStudent: boolean
  publicAddress: string | undefined
}

export interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}