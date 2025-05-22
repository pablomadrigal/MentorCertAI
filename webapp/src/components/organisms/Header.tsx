"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../atoms/Button"
import { Logo } from "../atoms/Logo"
import { useAuth } from "@/contexts/AuthContext"
import { LoginModal } from "../molecules/LoginModal"

export function Header() {
  const { signOut, isAuthenticated, isMentor, isStudent } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <header className="bg-surface shadow-md border-b border-surface-lighter">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link
                  href="/"
                  className="text-text-primary hover:text-primary-light transition-colors"
                >
                  Dashboard
                </Link>
                {isStudent && (
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
                {isMentor && (
                  <Link href="/meeting" className="text-text-primary hover:text-primary-light transition-colors">
                    Meeting
                  </Link>
                )}
                <Button
                  onClick={signOut}
                  variant="outline"
                  className="text-secondary-main ring-2 ring-secondary-main hover:bg-secondary-main hover:text-white transition-all duration-300"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-gradient-to-r from-[#1a9e6e] to-[#4eeeb0] text-primary-dark hover:from-[#4eeeb0] hover:to-[#1a9e6e] transition-all brightness-110 shadow-md hover:shadow-lg [box-shadow:0_0_15px_rgba(61,220,151,0.3)] hover:[box-shadow:0_0_20px_rgba(61,220,151,0.5)]"
                >
                  Login
                </Button>
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
              {isAuthenticated ? (
                <>
                  <Link
                    href="/"
                    className="text-text-primary hover:text-primary-light transition-colors"
                  >
                    Dashboard
                  </Link>
                  {isStudent && (
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
                  {isMentor && (
                    <Link href="/meeting" className="text-text-primary hover:text-primary-light transition-colors">
                      Meeting
                    </Link>
                  )}
                  <Button
                    onClick={signOut}
                    variant="outline"
                    className="text-secondary-main ring-2 ring-secondary-main hover:bg-secondary-main hover:text-white transition-all duration-300"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="text-text-primary hover:text-secondary-main transition-colors"
                  >
                    Login
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  )
}
