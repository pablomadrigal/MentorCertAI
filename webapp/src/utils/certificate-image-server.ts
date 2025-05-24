import { Certificate } from "@/types/certificate"
import { ImageResponse } from '@vercel/og'
import { generateCertificateHTML } from './certificate-image'

export const generateCertificateBase64Server = async (certificate: Certificate, userName: string, transactionHash?: string): Promise<string> => {
  try {
    const htmlContent = generateCertificateHTML(certificate, userName, transactionHash)
    const response = new ImageResponse(htmlContent, {
      width: 760,
      height: 600,
    })

    const buffer = await response.arrayBuffer()
    return `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`
  } catch (error) {
    console.error('Error generating certificate:', error)
    throw error
  }
}