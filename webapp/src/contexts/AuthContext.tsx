"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContextType, UserProfile, UserRole } from "@/types/auth"
import supabase from "@/utils/supabase/client"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setUser(session.user.user_metadata as UserProfile)
            }
            setLoading(false)
        })

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session) {
                setUser(session.user.user_metadata as UserProfile)
            } else {
                setUser(null)
            }
            setLoading(false)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const signOut = async () => {
        await supabase.auth.signOut()
        setUser(null)
    }

    const value = {
        user,
        loading,
        signOut,
        isAuthenticated: !!user,
        isMentor: user?.role === UserRole.MENTOR,
        isStudent: user?.role === UserRole.STUDENT,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
} 