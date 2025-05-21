import { useAuth } from "@/contexts/AuthContext"
import { UserRole } from "@/types/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
    children: React.ReactNode
    allowedRoles?: UserRole[]
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { user, loading, isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                router.push("/login")
            } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
                router.push("/unauthorized")
            }
        }
    }, [loading, isAuthenticated, user, allowedRoles, router])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated || (allowedRoles && user && !allowedRoles.includes(user.role))) {
        return null
    }

    return <>{children}</>
} 