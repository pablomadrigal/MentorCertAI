import { Button } from "../atoms/Button"
import { useState, useRef } from "react"
import supabase from "../../lib/supabase"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Si es un pegado de texto
      const pastedValue = value.slice(0, 6).split("")
      const newOtp = [...otp]
      pastedValue.forEach((char, i) => {
        if (i < 6) newOtp[i] = char
      })
      setOtp(newOtp)
      // Enfocar el último input lleno o el siguiente vacío
      const nextEmptyIndex = newOtp.findIndex(val => !val)
      if (nextEmptyIndex === -1) {
        inputRefs.current[5]?.focus()
      } else {
        inputRefs.current[nextEmptyIndex]?.focus()
      }
    } else {
      // Si es un solo carácter
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmitEmail = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true,
        }
      })

      if (error) throw error

      setShowOtpInput(true)
    } catch (error) {
      console.error('Error:', error)
      alert('Error al enviar el código OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    const otpString = otp.join("")
    if (otpString.length !== 6) {
      alert('Por favor ingrese el código completo')
      return
    }

    try {
      setLoading(true)
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otpString,
        type: 'email'
      })

      if (error) throw error

      onClose()
    } catch (error) {
      console.error('Error:', error)
      alert('Código OTP inválido')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true,
        }
      })

      if (error) throw error

      alert('Código reenviado exitosamente')
    } catch (error) {
      console.error('Error:', error)
      alert('Error al reenviar el código OTP')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-text-primary text-center">
          {showOtpInput ? 'Ingresa el código de verificación' : 'Iniciar Sesión'}
        </h2>
        <div>
          {!showOtpInput ? (
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main"
                required
                disabled={loading}
              />
            </div>
          ) : (
            <div className="mb-6">
              <p className="text-sm text-text-secondary text-center mb-4">
                Hemos enviado un código de verificación a {email}
              </p>
              <div className="flex justify-center gap-2 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => {
                      if (el) inputRefs.current[index] = el
                    }}
                    className="w-12 h-12 text-center text-xl font-semibold 
                             border-2 border-gray-300 rounded-lg 
                             focus:outline-none focus:border-primary-main 
                             focus:ring-2 focus:ring-primary-light/50 
                             bg-white text-text-primary 
                             transition-all duration-200"
                    disabled={loading}
                  />
                ))}
              </div>
              <div className="text-center mb-4">
                <button
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="text-primary-main hover:text-primary-light text-sm font-medium transition-colors"
                >
                  ¿No recibiste el código? Enviar de nuevo
                </button>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-400 text-gray-600 hover:bg-gray-100"
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={showOtpInput ? handleVerifyOtp : handleSubmitEmail}
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? 'Cargando...' : showOtpInput ? 'Verificar' : 'Enviar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}