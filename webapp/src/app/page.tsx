import Link from "next/link"
import { Header } from "../components/organisms/Header"
import { Footer } from "../components/organisms/Footer"
import { Button } from "../components/atoms/Button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-primary py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                AI-Powered Mentoring with Blockchain Certification
              </h1>
              <p className="text-xl mb-8 text-text-primary">
                Enhance your skills with personalized 1-on-1 mentoring sessions and earn verifiable certificates backed
                by blockchain technology.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/login" passHref>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-transparent border-2 border-secondary-main text-secondary-main hover:bg-secondary-main hover:text-white transition-all"
                  >
                    Login as Student
                  </Button>
                </Link>
                <Link href="/mentor/signup" passHref>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-primary-light text-primary-light hover:bg-primary-light hover:text-primary-dark"
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
            <h2 className="text-3xl font-bold text-center mb-12 text-text-primary">Platform Features</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-br from-primary-main to-primary-light p-6 flex flex-col items-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center text-white">AI-Powered Mentoring</h3>
                  <p className="text-white text-opacity-90 text-center">
                    Our platform uses AI to match you with the perfect mentor and provide personalized learning
                    recommendations.
                  </p>
                </div>
              </div>

              <div className="rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-br from-secondary-dark to-secondary-main p-6 flex flex-col items-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
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

              <div className="rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-br from-primary-light to-secondary-light p-6 flex flex-col items-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
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
        <section className="py-16 bg-surface">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-text-primary">How It Works</h2>

            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center mb-12">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8 flex justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-main to-primary-light rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-secondary-main rounded-full flex items-center justify-center mr-4 text-white font-bold">
                      1
                    </div>
                    <h3 className="text-xl font-bold text-text-primary">Sign Up</h3>
                  </div>
                  <p className="text-text-secondary">
                    Create an account or access the platform through a unique invitation link from your organization.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center mb-12">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pl-8 flex justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-secondary-dark to-secondary-main rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-white"
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
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-secondary-main rounded-full flex items-center justify-center mr-4 text-white font-bold">
                      2
                    </div>
                    <h3 className="text-xl font-bold text-text-primary">Schedule Sessions</h3>
                  </div>
                  <p className="text-text-secondary">
                    Browse available mentors or get matched with the perfect mentor for your needs and schedule 1-on-1
                    sessions.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8 flex justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-light to-secondary-light rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-white"
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
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-secondary-main rounded-full flex items-center justify-center mr-4 text-white font-bold">
                      3
                    </div>
                    <h3 className="text-xl font-bold text-text-primary">Earn Certificates</h3>
                  </div>
                  <p className="text-text-secondary">
                    Complete sessions, pass assessments, and earn blockchain-verified certificates and NFTs to showcase
                    your achievements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary-dark to-primary-main">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Start Your Learning Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-text-primary">
              Join MentorCertAi today and take your skills to the next level with personalized mentoring and verifiable
              certifications.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/login" passHref>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-secondary-main text-white hover:bg-secondary-light transition-colors"
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
