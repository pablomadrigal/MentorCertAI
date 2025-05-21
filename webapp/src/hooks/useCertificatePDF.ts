import { useState } from "react"
import { Certificate } from "@/types/certificate"

export function useCertificatePDF() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<number | null>(null)
  const [isGeneratingPNG, setIsGeneratingPNG] = useState<number | null>(null)

  const generateCertificateHTML = (certificate: Certificate) => `
    <div style="text-align: center; color: #1e293b; font-family: Arial, sans-serif; position: relative; background-color: white; padding: 40px; border-radius: 8px; overflow: hidden;">
      <div style="position: absolute; top: 0; right: 0; width: 160px; height: 160px; background-color: rgba(61, 220, 151, 0.2); border-radius: 50%; margin-right: -80px; margin-top: -80px;"></div>
      <div style="position: absolute; bottom: 0; left: 0; width: 240px; height: 240px; background-color: rgba(123, 97, 255, 0.15); border-radius: 50%; margin-left: -80px; margin-bottom: -80px;"></div>
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 320px; height: 320px; background-color: rgba(56, 189, 248, 0.15); border-radius: 50%;"></div>

      <div style="border: 8px solid rgba(61, 220, 151, 0.2); padding: 32px; border-radius: 8px; background-color: white; box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05); position: relative; overflow: hidden; z-index: 10;">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 8px; background: linear-gradient(to right, #38bdf8, #7B61FF, #3DDC97);"></div>
        <div style="position: absolute; bottom: 0; right: 0; width: 100%; height: 8px; background: linear-gradient(to right, #3DDC97, #7B61FF, #38bdf8);"></div>

        <div style="position: absolute; top: 0; left: 0; width: 64px; height: 64px; border-top: 4px solid rgba(123, 97, 255, 0.3); border-left: 4px solid rgba(123, 97, 255, 0.3); border-top-left-radius: 8px;"></div>
        <div style="position: absolute; top: 0; right: 0; width: 64px; height: 64px; border-top: 4px solid rgba(61, 220, 151, 0.3); border-right: 4px solid rgba(61, 220, 151, 0.3); border-top-right-radius: 8px;"></div>
        <div style="position: absolute; bottom: 0; left: 0; width: 64px; height: 64px; border-bottom: 4px solid rgba(56, 189, 248, 0.3); border-left: 4px solid rgba(56, 189, 248, 0.3); border-bottom-left-radius: 8px;"></div>
        <div style="position: absolute; bottom: 0; right: 0; width: 64px; height: 64px; border-bottom: 4px solid rgba(123, 97, 255, 0.3); border-right: 4px solid rgba(123, 97, 255, 0.3); border-bottom-right-radius: 8px;"></div>

        <div style="text-align: center; position: relative; z-index: 10;">
          <div style="margin-bottom: 24px;">
            <h3 style="font-size: 28px; font-weight: bold; margin-bottom: 8px; color: #1e293b;">Certificate of Completion</h3>
            <div style="width: 128px; height: 4px; background: linear-gradient(to right, #7B61FF, #3DDC97); margin: 0 auto;"></div>
          </div>

          <p style="font-size: 18px; margin-bottom: 32px; color: #475569;">This certifies that</p>
          <p style="font-size: 24px; font-weight: bold; margin-bottom: 32px; color: #2A1A67;">Student Name</p>
          <p style="font-size: 18px; margin-bottom: 32px; color: #475569;">
            has successfully completed the ${certificate.theme} course
            with a grade of <span style="color: #2AB77A; font-weight: bold;">${certificate.score}%</span>.
          </p>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 48px;">
            <div style="text-align: left;">
              <p style="font-size: 14px; color: #64748b;">Date Issued:</p>
              <p style="font-size: 16px; font-weight: 500; color: #1e293b;">${new Date(certificate.date).toLocaleDateString()}</p>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center;">
              <div style="width: 80px; height: 80px; border-radius: 50%; background-color: rgba(123, 97, 255, 0.2); display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#7B61FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <p style="font-size: 12px; color: #64748b;">Verified</p>
            </div>

            <div style="text-align: right;">
              <p style="font-size: 14px; color: #64748b;">Certificate ID:</p>
              <p style="font-size: 16px; font-weight: 500; color: #1e293b;">${certificate.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `

  const downloadCertificate = async (certificate: Certificate) => {
    setIsGeneratingPDF(certificate.id)

    try {
      const { default: jsPDF } = await import("jspdf")
      const html2canvas = (await import("html2canvas")).default

      const certificateElement = document.createElement("div")
      certificateElement.style.width = "800px"
      certificateElement.style.padding = "40px"
      certificateElement.style.backgroundColor = "white"
      certificateElement.style.position = "absolute"
      certificateElement.style.left = "-9999px"
      certificateElement.style.top = "-9999px"

      certificateElement.innerHTML = generateCertificateHTML(certificate)
      document.body.appendChild(certificateElement)

      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      })

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      })

      const imgData = canvas.toDataURL("image/jpeg", 1.0)
      pdf.addImage(imgData, "JPEG", 0, 0, 297, 210)

      pdf.save(`certificate-${certificate.id}.pdf`)
      document.body.removeChild(certificateElement)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Could not generate PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(null)
    }
  }

  //function to download the certificate as a png
  const downloadCertificatePNG = async (certificate: Certificate) => {
    setIsGeneratingPNG(certificate.id)

    try {
      const html2canvas = (await import("html2canvas")).default

      const certificateElement = document.createElement("div")
      certificateElement.innerHTML = generateCertificateHTML(certificate)
      document.body.appendChild(certificateElement)

      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/png", 1.0)
      const link = document.createElement("a")
      link.href = imgData
      link.download = `certificate-${certificate.id}.png`
      link.click()

      document.body.removeChild(certificateElement)
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