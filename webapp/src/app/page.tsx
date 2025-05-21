"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Header } from "@/components/organisms/Header"
import { LandingPage } from "@/components/pages/LandingPage"
import { StudentDashboard } from "@/components/pages/StudentDashboard"
import { MentorDashboard } from "@/components/pages/MentorDashboard"

export default function Home() {
  const { isAuthenticated, isStudent, isMentor, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-main"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      {isAuthenticated ? (
        isStudent ? (
          <StudentDashboard />
        ) : isMentor ? (
          <MentorDashboard />
        ) : null
      ) : (
        <LandingPage />
      )}
    </div>
  )
}
