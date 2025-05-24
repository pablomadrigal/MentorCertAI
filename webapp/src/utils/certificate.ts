import { Certificate } from "@/types/certificate"

export const generateCertificateHTML = (
  certificate: Certificate,
  userName: string,
  transactionHash?: string
) => `
  <div style="width: 760px; margin: 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 32px rgba(30,41,59,0.08); padding: 48px 56px; font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; position: relative; border: 2px solid #7B61FF;">
    <div style="border-top: 8px solid #38bdf8; border-radius: 8px 8px 0 0; width: 100%; margin-bottom: 32px;"></div>
    <h1 style="text-align: center; font-size: 38px; letter-spacing: 2px; font-weight: 700; color: #2A1A67; margin-bottom: 0;">CERTIFICATE</h1>
    <h2 style="text-align: center; font-size: 20px; font-weight: 500; color: #3DDC97; margin: 0 0 8px 0; letter-spacing: 1px;">OF COMPLETION</h2>
    <p style="text-align: center; font-size: 16px; color: #475569; margin-bottom: 32px;">This certificate is presented to</p>
    <div style="text-align: center; margin-bottom: 16px;">
      <span style="font-size: 32px; font-weight: bold; color: #7B61FF; font-family: 'Brush Script MT', cursive, Arial; border-bottom: 2px solid #7B61FF; padding: 10px 30px;">${userName}</span>
    </div>
    <div style="text-align: center; font-size: 18px; color: #475569; margin-bottom: 24px;">
      has successfully completed the <span style="color: #2A1A67; font-weight: 600;">${certificate.theme}</span> course<br/>
      with a grade of <span style="color: #2AB77A; font-weight: bold;">${certificate.score}%</span>.
    </div>
    <div style="text-align: center; font-size: 14px; color: #64748b; margin-bottom: 32px; max-width: 600px; margin-left: auto; margin-right: auto;">
      This certificate is issued by MentorCertAI to recognize outstanding achievement and commitment to learning.
    </div>
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 48px;">
      <div style="text-align: left;">
        <div style="font-size: 14px; color: #64748b;">Date Issued</div>
        <div style="font-size: 16px; font-weight: 500; color: #1e293b; border-bottom: 1px solid #cbd5e1; width: 120px; padding-bottom: 10px;">${new Date(certificate.date).toLocaleDateString()}</div>
      </div>
      <div style="text-align: center; flex: 1;">
        
      </div>
      <div style="text-align: right;">
        <div style="font-size: 14px; color: #64748b;">Certificate ID</div>
        <div style="font-size: 16px; font-weight: 500; color: #1e293b; border-bottom: 1px solid #cbd5e1; width: 120px; padding-bottom: 10px;">${certificate.id}</div>
      </div>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px;">
      ${transactionHash ? `<div style="text-align: center; flex: 1;">
        <div style="font-size: 14px; color: #64748b;">Transaction Hash</div>
        <div style="font-size: 13px; color: #475569; border-bottom: 1px solid #cbd5e1; width: 260px; margin: 0 auto; word-break: break-all;">${transactionHash || ""}</div>
      </div>` : ""}
    </div>
    <div style="border-bottom: 8px solid #3DDC97; border-radius: 0 0 8px 8px; width: 100%; margin-top: 40px;"></div>
  </div>
`;

export const generateCertificatePDF = async (certificate: Certificate, userName: string, transactionHash?: string) => {
  const { default: jsPDF } = await import("jspdf")
  const html2canvas = (await import("html2canvas")).default

  const certificateElement = document.createElement("div")
  certificateElement.style.width = "800px"
  certificateElement.style.padding = "20px"
  certificateElement.style.backgroundColor = "white"
  certificateElement.style.position = "absolute"
  certificateElement.style.left = "-9999px"
  certificateElement.style.top = "-9999px"

  certificateElement.innerHTML = generateCertificateHTML(certificate, userName, transactionHash)
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

  document.body.removeChild(certificateElement)
  return pdf
}

export const generateCertificatePNG = async (certificate: Certificate, userName: string, transactionHash?: string) => {
  const html2canvas = (await import("html2canvas")).default

  const certificateElement = document.createElement("div")
  certificateElement.innerHTML = generateCertificateHTML(certificate, userName, transactionHash)
  document.body.appendChild(certificateElement)

  const canvas = await html2canvas(certificateElement, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  })

  document.body.removeChild(certificateElement)
  return canvas.toDataURL("image/png", 1.0)
}

export const generateCertificateBase64 = async (certificate: Certificate, userName: string, transactionHash?: string) => {
  const html2canvas = (await import("html2canvas")).default

  const certificateElement = document.createElement("div")
  certificateElement.innerHTML = generateCertificateHTML(certificate, userName, transactionHash)
  document.body.appendChild(certificateElement)

  const canvas = await html2canvas(certificateElement, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  })

  document.body.removeChild(certificateElement)
  return canvas.toDataURL("image/png", 1.0).split(",")[1] // Remove "data:image/png;base64," prefix
} 