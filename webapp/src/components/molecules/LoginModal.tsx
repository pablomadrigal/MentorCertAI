import { Modal } from "@/components/atoms/Modal"
import { useState } from "react"
import { EmailStep } from "./login/EmailStep"
import { OtpStep } from "./login/OtpStep"
import { SignupStep } from "./login/SignupStep"
import supabase from "@/utils/supabase/client"
import { LoginModalProps } from "@/types/auth"
import { useApi } from "@/hooks/useApi"

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [loading, setLoading] = useState(false)
  const [loginStep, setLoginStep] = useState<"email" | "otp" | "signup">("email")
  const [email, setEmail] = useState("")

  const { get } = useApi<{ publicAddress: string }>()

  const handleEmailSubmit = async (email: string) => {
    try {
      setLoading(true)
      setEmail(email)
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      })
      if (error) throw error
      setLoginStep("otp")
    } catch (error) {
      console.error("Error sending OTP:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (otp: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      })

      if (error) throw error
      if (data.user?.user_metadata.accept_terms) {
        onClose()
      } else {
        setLoginStep("signup")
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      })

      if (error) throw error
    } catch (error) {
      console.error("Error resending OTP:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignupSubmit = async (data: { fullName: string; role: "student" | "mentor"; acceptTerms: boolean }) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.updateUser({
        data: { full_name: data.fullName, accept_terms: data.acceptTerms, role: data.role },
        email,
      })
      await get(`/wallet`)
      await supabase.auth.refreshSession();
      if (error) throw error
      onClose()
    } catch (error) {
      console.error("Error signing up:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStepTitle = () => {
    switch (loginStep) {
      case "otp":
        return "Enter Verification Code"
      case "signup":
        return "Sign Up"
      default:
        return "Login"
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getStepTitle()}>
      {loginStep === "email" && <EmailStep onEmailSubmit={handleEmailSubmit} loading={loading} />}
      {loginStep === "otp" && (
        <OtpStep email={email} onVerify={handleVerifyOtp} onResend={handleResendOtp} loading={loading} />
      )}
      {loginStep === "signup" && <SignupStep onSubmit={handleSignupSubmit} loading={loading} />}
    </Modal>
  )
}