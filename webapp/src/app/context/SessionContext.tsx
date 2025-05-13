"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"

type Session = {
  id: number
  studentId: number
  mentorId: number
  dateTime: string
  link: string
  completed: boolean
}

type Certificate = {
  id: number
  studentId: number
  issueDate: string
  grade: number
}

type NFT = {
  id: number
  certificateId: number
  metadata: {
    name: string
    description: string
    image: string
    attributes: Array<{
      trait_type: string
      value: string
    }>
  }
}

type SessionContextType = {
  sessions: Session[]
  certificates: Certificate[]
  nfts: NFT[]
  fetchSessions: () => Promise<void>
  fetchCertificates: () => Promise<void>
  fetchNFTs: () => Promise<void>
  createSession: (session: Omit<Session, "id">) => Promise<void>
  isLoading: boolean
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<Session[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [nfts, setNFTs] = useState<NFT[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchSessions = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/sessions?${user.role}Id=${user.id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch sessions")
      }
      const data = await response.json()
      setSessions(data)
    } catch (error) {
      console.error("Error fetching sessions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCertificates = async () => {
    if (!user || user.role !== "student") return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/certificates/${user.id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch certificates")
      }
      const data = await response.json()
      setCertificates(data)
    } catch (error) {
      console.error("Error fetching certificates:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchNFTs = async () => {
    if (!user || user.role !== "student") return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/nfts/${user.id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch NFTs")
      }
      const data = await response.json()
      setNFTs(data)
    } catch (error) {
      console.error("Error fetching NFTs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const createSession = async (session: Omit<Session, "id">) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session),
      })

      if (!response.ok) {
        throw new Error("Failed to create session")
      }

      await fetchSessions()
    } catch (error) {
      console.error("Error creating session:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchSessions()
      if (user.role === "student") {
        fetchCertificates()
        fetchNFTs()
      }
    }
  }, [user])

  return (
    <SessionContext.Provider
      value={{
        sessions,
        certificates,
        nfts,
        fetchSessions,
        fetchCertificates,
        fetchNFTs,
        createSession,
        isLoading,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return context
}
