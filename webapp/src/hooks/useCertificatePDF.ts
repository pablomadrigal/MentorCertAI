import { useState } from "react"
import { Certificate } from "@/types/certificate"
import { generateCertificatePDF, generateCertificatePNG } from "@/utils/certificate"

export function useCertificatePDF() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<number | null>(null)
  const [isGeneratingPNG, setIsGeneratingPNG] = useState<number | null>(null)

  const downloadCertificate = async (certificate: Certificate, userName: string, transactionHash?: string) => {
    setIsGeneratingPDF(certificate.id ?? 0)

    try {
      const pdf = await generateCertificatePDF(certificate, userName, transactionHash)
      pdf.save(`certificate-${certificate.id}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Could not generate PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(null)
    }
  }

  const downloadCertificatePNG = async (certificate: Certificate, userName: string, transactionHash?: string) => {
    setIsGeneratingPNG(certificate.id ?? 0)

    try {
      const imgData = await generateCertificatePNG(certificate, userName, transactionHash)
      const link = document.createElement("a")
      link.href = imgData
      link.download = `certificate-${certificate.id}.png`
      link.click()
    } catch (error) {
      console.error("Error generating PNG:", error)
      alert("Could not generate PNG. Please try again.")
    } finally {
      setIsGeneratingPNG(null)
    }
  }

  return {
    isGeneratingPDF,
    isGeneratingPNG,
    downloadCertificate,
    downloadCertificatePNG,
  }
} 