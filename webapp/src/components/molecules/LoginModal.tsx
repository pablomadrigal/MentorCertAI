import { Button } from "../atoms/Button"
import { useState } from "react"
import supabase from "../../lib/supabase"
interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState("")

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
  }
  const handleSubmitEmail = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true,
        }
      })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-text-primary">Iniciar Sesión</h2>
        <div>
          <div className="mb-4">
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
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-text-secondary"
            >
              Cancelar
            </Button>
            <Button
              type="button" 
              variant="outline"
              onClick={handleSubmitEmail}
              className="border-gray-300 text-text-secondary"
            >
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}