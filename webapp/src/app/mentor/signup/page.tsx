"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "../../../components/organisms/Header"
import { Footer } from "../../../components/organisms/Footer"
import { Button } from "../../../components/atoms/Button"
import { Input } from "../../../components/atoms/Input"
import { FormField } from "../../../components/molecules/FormField"
import { useAuth } from "../../../app/context/AuthContext"

export default function MentorSignup() {
  const router = useRouter()
  const { login } = useAuth()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; terms?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: { fullName?: string; email?: string; terms?: string } = {}
    let isValid = true

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required"
      isValid = false
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }

    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Registrar al usuario como mentor
      // En una implementación real, aquí se enviarían los datos al backend para crear la cuenta
      console.log("Form submitted:", { fullName, email, acceptTerms })

      // Iniciar sesión automáticamente después del registro
      await login(email, "mentor")

      // Redirigir directamente al dashboard de mentor
      router.push("/mentor/dashboard")
    } catch (error) {
      console.error("Error submitting form:", error)
      // Mostrar un mensaje de error si falla el registro
      alert("There was an error creating your account. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-surface rounded-lg shadow-lg p-8 border border-surface-lighter">
              <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-secondary-main to-accent-main bg-clip-text text-transparent">
                Become a Mentor
              </h1>

              <p className="text-text-secondary mb-8 text-center">
                Join our platform as a mentor and help students achieve their goals through personalized guidance and
                support.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField label="Full Name" htmlFor="fullName" error={errors.fullName}>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-surface-lighter"
                  />
                </FormField>

                <FormField label="Email" htmlFor="email" error={errors.email}>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="bg-surface-lighter"
                  />
                </FormField>

                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="w-4 h-4 border border-surface-lighter rounded bg-surface-lighter focus:ring-2 focus:ring-secondary-main"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="terms" className="text-sm text-text-secondary">
                        I accept the{" "}
                        <span className="text-secondary-main hover:underline cursor-pointer">Terms and Conditions</span>
                      </label>
                    </div>
                  </div>
                  {errors.terms && <p className="text-sm text-error">{errors.terms}</p>}
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-secondary-dark to-secondary-main text-white hover:from-secondary-main hover:to-secondary-dark transition-all brightness-110"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      "Register"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
