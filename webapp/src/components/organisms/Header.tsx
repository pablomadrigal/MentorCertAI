"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../atoms/Button"
import { Logo } from "../atoms/Logo"

// Mock user type
type User = {
  id: number
  name: string
  email: string
  role: "student" | "mentor"
}

export function Header() {
  // Mock user state - in a real app this would come from a proper auth system
  const [user, setUser] = useState<User | null>({
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "student"
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const logout = () => {
    setUser(null)
  }

  return (
    <header className="bg-surface shadow-md border-b border-surface-lighter">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  href={user.role === "student" ? "/student/dashboard" : "/mentor/dashboard"}
                  className="text-text-primary hover:text-primary-light transition-colors"
                >
                  Dashboard
                </Link>
                {user.role === "student" && (
                  <>
                    <Link
                      href="/student/certificates"
                      className="text-text-primary hover:text-primary-light transition-colors"
                    >
                      Certificates
                    </Link>
                    <Link href="/student/nfts" className="text-text-primary hover:text-primary-light transition-colors">
                      NFTs
                    </Link>
                  </>
                )}
                <Button
                  onClick={logout}
                  variant="outline"
                  className="text-secondary-main ring-2 ring-secondary-main hover:bg-secondary-main hover:text-white transition-all duration-300"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/about" className="text-text-primary hover:text-secondary-main transition-colors">
                  About
                </Link>
                <Link href="/features" className="text-text-primary hover:text-secondary-main transition-colors">
                  Features
                </Link>
                <Link href="/login" className="text-text-primary hover:text-secondary-main transition-colors">
                  Login
                </Link>
                <Link href="/mentor/signup" passHref>
                  <Button className="bg-linear-to-r from-secondary-dark to-secondary-main text-white hover:from-secondary-main hover:to-secondary-dark brightness-110">
                    Become a Mentor
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden text-text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <div className="flex flex-col space-y-4">
              {user ? (
                <>
                  <Link
                    href={user.role === "student" ? "/student/dashboard" : "/mentor/dashboard"}
                    className="text-text-primary hover:text-primary-light transition-colors"
                  >
                    Dashboard
                  </Link>
                  {user.role === "student" && (
                    <>
                      <Link
                        href="/student/certificates"
                        className="text-text-primary hover:text-primary-light transition-colors"
                      >
                        Certificates
                      </Link>
                      <Link
                        href="/student/nfts"
                        className="text-text-primary hover:text-primary-light transition-colors"
                      >
                        NFTs
                      </Link>
                    </>
                  )}
                  <Button
                    onClick={logout}
                    variant="outline"
                    className="text-secondary-main ring-2 ring-secondary-main hover:bg-secondary-main hover:text-white transition-all duration-300"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/about" className="text-text-primary hover:text-secondary-main transition-colors">
                    About
                  </Link>
                  <Link href="/features" className="text-text-primary hover:text-secondary-main transition-colors">
                    Features
                  </Link>
                  <Link href="/login" className="text-text-primary hover:text-secondary-main transition-colors">
                    Login
                  </Link>
                  <Link href="/mentor/signup" passHref>
                    <Button className="w-full bg-linear-to-r from-secondary-dark to-secondary-main text-white hover:from-secondary-main hover:to-secondary-dark brightness-110">
                      Become a Mentor
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
