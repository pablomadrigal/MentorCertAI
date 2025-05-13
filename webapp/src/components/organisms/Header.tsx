"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "../../app/context/AuthContext"
import { Button } from "../atoms/Button"

export function Header() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-surface shadow-md border-b border-surface-lighter">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary-light to-secondary-main bg-clip-text text-transparent"
          >
            MentorCertAi
          </Link>

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
                  className="border-secondary-main text-secondary-main hover:bg-secondary-main hover:text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/about" className="text-text-primary hover:text-primary-light transition-colors">
                  About
                </Link>
                <Link href="/features" className="text-text-primary hover:text-primary-light transition-colors">
                  Features
                </Link>
                <Link href="/login" className="text-text-primary hover:text-primary-light transition-colors">
                  Login
                </Link>
                <Link href="/mentor/signup" passHref>
                  <Button className="bg-gradient-to-r from-secondary-dark to-secondary-main text-white hover:from-secondary-main hover:to-secondary-light">
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
                    className="border-secondary-main text-secondary-main hover:bg-secondary-main hover:text-white"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/about" className="text-text-primary hover:text-primary-light transition-colors">
                    About
                  </Link>
                  <Link href="/features" className="text-text-primary hover:text-primary-light transition-colors">
                    Features
                  </Link>
                  <Link href="/login" className="text-text-primary hover:text-primary-light transition-colors">
                    Login
                  </Link>
                  <Link href="/mentor/signup" passHref>
                    <Button className="w-full bg-gradient-to-r from-secondary-dark to-secondary-main text-white hover:from-secondary-main hover:to-secondary-light">
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
