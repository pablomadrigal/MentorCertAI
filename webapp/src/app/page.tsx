"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/atoms/Button"
import { Header } from "@/components/organisms/Header"
import { Footer } from "@/components/organisms/Footer"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-linear-to-br from-primary-dark to-primary-main">
          <div className="absolute inset-0 bg-[url('/brain-circuit.png')] opacity-10 animate-pulse-slow"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white animate-slide-down">
                AI-Powered Mentoring with Blockchain Certification
              </h1>
              <p className="text-xl mb-8 text-text-primary animate-slide-up">
                Enhance your skills with personalized 1-on-1 mentoring sessions and earn verifiable certificates backed
                by blockchain technology.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
                <Link href="/login" passHref>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-linear-to-r from-primary-main to-primary-light text-white hover:from-primary-light hover:to-primary-main transition-all brightness-110 shadow-lg hover:shadow-xl [box-shadow:0_0_10px_rgba(56,189,248,0.2)] hover:[box-shadow:0_0_15px_rgba(56,189,248,0.3)]"
                  >
                    Login as Student
                  </Button>
                </Link>
                <Link href="/mentor/signup" passHref>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-linear-to-r from-secondary-dark to-secondary-main text-white hover:from-secondary-main hover:to-secondary-dark transition-all brightness-110 shadow-lg hover:shadow-xl [box-shadow:0_0_10px_rgba(123,97,255,0.2)] hover:[box-shadow:0_0_15px_rgba(123,97,255,0.3)]"
                  >
                    Become a Mentor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-text-primary animate-fade-in">Platform Features</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-lg shadow-lg overflow-hidden animate-slide-up">
                <div className="bg-linear-to-br from-primary-main to-primary-light p-6 flex flex-col items-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm animate-float">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                      <path d="M9 13a4.5 4.5 0 0 0 3-4" />
                      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
                      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
                      <path d="M6 18a4 4 0 0 1-1.967-.516" />
                      <path d="M12 13h4" />
                      <path d="M12 18h6a2 2 0 0 1 2 2v1" />
                      <path d="M12 8h8" />
                      <path d="M16 8V5a2 2 0 0 1 2-2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center text-white">AI-Powered Mentoring</h3>
                  <p className="text-white text-opacity-90 text-center">
                    Our platform uses AI to match you with the perfect mentor and provide personalized learning
                    recommendations.
                  </p>
                </div>
              </div>

              <div className="rounded-lg shadow-lg overflow-hidden animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="bg-linear-to-br from-secondary-dark to-secondary-main p-6 flex flex-col items-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm animate-float">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center text-white">Blockchain Certification</h3>
                  <p className="text-white text-opacity-90 text-center">
                    Earn verifiable certificates backed by blockchain technology, ensuring the authenticity of your
                    achievements.
                  </p>
                </div>
              </div>

              <div className="rounded-lg shadow-lg overflow-hidden animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <div className="bg-linear-to-br from-primary-dark to-accent-main p-6 flex flex-col items-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm animate-float">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center text-white">1-on-1 Video Sessions</h3>
                  <p className="text-white text-opacity-90 text-center">
                    Connect with mentors through high-quality video sessions for personalized guidance and feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-surface relative overflow-hidden">
          <div className="absolute left-1/2 top-32 bottom-32 w-1 bg-linear-to-b from-secondary-main to-accent-main -z-0"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 relative z-10 bg-surface py-2 animate-fade-in">
              <h2 className="text-4xl font-bold mb-4 text-text-primary inline-block relative">
                How It Works
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-secondary-main to-accent-main"></span>
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Our streamlined process makes it easy to get started, connect with mentors, and earn recognized
                credentials.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              {/* Step 1: Sign Up */}
              <div className="flex flex-col md:flex-row items-center mb-24 relative group animate-slide-up">
                <div className="absolute left-1/2 md:left-auto md:right-[calc(50%-12px)] top-0 transform -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 z-10">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-linear-to-br from-primary-main to-primary-light flex items-center justify-center shadow-lg border-4 border-surface group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl md:text-4xl font-bold text-white">1</span>
                  </div>
                </div>

                <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-16 pt-20 md:pt-0">
                  <div className="bg-surface-lighter rounded-2xl p-6 shadow-lg transform transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light opacity-5 rounded-full -mr-10 -mt-10"></div>

                    <h3 className="text-2xl font-bold text-text-primary mb-4 inline-flex items-center">
                      <span className="bg-linear-to-r from-primary-light to-secondary-main bg-clip-text text-transparent">
                        Sign Up
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 ml-2 text-accent-main"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </h3>

                    <p className="text-text-secondary text-lg mb-4">
                      Create an account or access the platform through a unique invitation link from your organization.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="px-3 py-1 bg-primary-main/20 rounded-full text-sm text-primary-light">
                        Quick Registration
                      </span>
                      <span className="px-3 py-1 bg-secondary-main/20 rounded-full text-sm text-secondary-light">
                        AI Matching
                      </span>
                      <span className="px-3 py-1 bg-accent-main/20 rounded-full text-sm text-accent-main">
                        Personalized Profile
                      </span>
                    </div>

                    <div className="text-sm text-text-secondary italic border-l-2 border-secondary-main pl-3">
                      "The sign-up process was incredibly smooth. In minutes, I was matched with the perfect mentor for
                      my needs." - Sarah K.
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 hidden md:flex justify-center">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl p-4 flex items-center justify-center bg-linear-to-br from-surface-lighter to-surface/50 shadow-lg transform transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-xl">
                    <Image
                      src="/undraw_complete-form_aarh.svg"
                      alt="Sign Up Process"
                      width={280}
                      height={280}
                      className="object-contain transform transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Schedule Sessions */}
              <div className="flex flex-col md:flex-row items-center mb-24 relative group animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="absolute left-1/2 md:left-auto md:right-[calc(50%-12px)] top-0 transform -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 z-10">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-linear-to-br from-secondary-dark to-secondary-main flex items-center justify-center shadow-lg border-4 border-surface group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl md:text-4xl font-bold text-white">2</span>
                  </div>
                </div>

                <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-16 pt-20 md:pt-0">
                  <div className="bg-surface-lighter rounded-2xl p-6 shadow-lg transform transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-secondary-main opacity-5 rounded-full -ml-10 -mt-10"></div>

                    <h3 className="text-2xl font-bold text-text-primary mb-4 inline-flex items-center">
                      <span className="bg-linear-to-r from-secondary-main to-accent-main bg-clip-text text-transparent">
                        Schedule Sessions
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 ml-2 text-accent-main"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </h3>

                    <p className="text-text-secondary text-lg mb-4">
                      Browse available mentors or get matched with the perfect mentor for your needs and schedule 1-on-1
                      sessions.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="px-3 py-1 bg-primary-main/20 rounded-full text-sm text-primary-light">
                        Flexible Timing
                      </span>
                      <span className="px-3 py-1 bg-secondary-main/20 rounded-full text-sm text-secondary-light">
                        Calendar Integration
                      </span>
                      <span className="px-3 py-1 bg-accent-main/20 rounded-full text-sm text-accent-main">
                        Reminder System
                      </span>
                    </div>

                    <div className="text-sm text-text-secondary italic border-l-2 border-secondary-main pl-3">
                      "The scheduling system is so flexible. I can easily find times that work with my busy schedule." -
                      Michael T.
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 hidden md:flex justify-center">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl p-4 flex items-center justify-center bg-linear-to-br from-surface-lighter to-surface/50 shadow-lg transform transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-xl">
                    <Image
                      src="/undraw_live-collaboration_i8an.svg"
                      alt="Schedule Sessions"
                      width={280}
                      height={280}
                      className="object-contain transform transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Earn Certificates */}
              <div className="flex flex-col md:flex-row items-center mb-24 relative group animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <div className="absolute left-1/2 md:left-auto md:right-[calc(50%-12px)] top-0 transform -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 z-10">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-linear-to-br from-accent-dark to-accent-main flex items-center justify-center shadow-lg border-4 border-surface group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl md:text-4xl font-bold text-white">3</span>
                  </div>
                </div>

                <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-16 pt-20 md:pt-0">
                  <div className="bg-surface-lighter rounded-2xl p-6 shadow-lg transform transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-main opacity-5 rounded-full -mr-10 -mt-10"></div>

                    <h3 className="text-2xl font-bold text-text-primary mb-4 inline-flex items-center">
                      <span className="bg-linear-to-r from-accent-main to-primary-light bg-clip-text text-transparent">
                        Earn Certificates
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 ml-2 text-accent-main"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>
                    </h3>

                    <p className="text-text-secondary text-lg mb-4">
                      Complete sessions, pass assessments, and earn blockchain-verified certificates and NFTs to
                      showcase your achievements.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="px-3 py-1 bg-primary-main/20 rounded-full text-sm text-primary-light">
                        Blockchain Verified
                      </span>
                      <span className="px-3 py-1 bg-secondary-main/20 rounded-full text-sm text-secondary-light">
                        NFT Credentials
                      </span>
                      <span className="px-3 py-1 bg-accent-main/20 rounded-full text-sm text-accent-main">
                        Shareable Proof
                      </span>
                    </div>

                    <div className="text-sm text-text-secondary italic border-l-2 border-secondary-main pl-3">
                      "My blockchain certificate has real value. I've already used it to demonstrate my skills to
                      potential employers." - Alex R.
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 hidden md:flex justify-center">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl p-4 flex items-center justify-center bg-linear-to-br from-surface-lighter to-surface/50 shadow-lg transform transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-xl">
                    <Image
                      src="/undraw_certificate_71gt.svg"
                      alt="Earn Certificates"
                      width={280}
                      height={280}
                      className="object-contain transform transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center mt-16 relative z-10 animate-fade-in">
                <Link href="/login" passHref>
                  <Button
                    size="lg"
                    className="bg-linear-to-r from-secondary-dark to-secondary-main text-white hover:from-secondary-main hover:to-secondary-dark transition-all brightness-110 shadow-lg hover:shadow-xl [box-shadow:0_0_10px_rgba(123,97,255,0.2)] hover:[box-shadow:0_0_15px_rgba(123,97,255,0.3)]"
                  >
                    Start Your Journey Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-linear-to-r from-primary-dark to-primary-main">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white animate-fade-in">Ready to Start Your Learning Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-text-primary animate-slide-up">
              Join MentorCertAi today and take your skills to the next level with personalized mentoring and verifiable
              certifications.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
              <Link href="/login" passHref>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-accent-main text-primary-dark hover:bg-accent-light brightness-110 shadow-lg hover:shadow-xl [box-shadow:0_0_10px_rgba(61,220,151,0.2)] hover:[box-shadow:0_0_15px_rgba(61,220,151,0.3)]"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
