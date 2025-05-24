"use client"

import { CertificateCard } from "../molecules/CertificateCard"
import { useEffect } from "react"
import { useCertificatePDF } from "@/hooks/useCertificatePDF"
import { Certificate, CertificateListProps } from "@/types/certificate"
import { useAuth } from "@/contexts/AuthContext"

const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ?? "0x013c34213f2935cdc8caa12af93f561a989aeaf0a8eaa6c4aa11d2dd00869adb"

export function CertificateList({ certificates, isLoading }: CertificateListProps) {
  const { isGeneratingPDF, downloadCertificate, downloadCertificatePNG } = useCertificatePDF()
  const { user } = useAuth()

  // Cargar jsPDF dinámicamente para evitar problemas con SSR
  useEffect(() => {
    // Precargar la biblioteca jsPDF para mejorar el rendimiento
    import("jspdf").catch((err) => console.error("Error precargando jsPDF:", err))

  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[550px] bg-gray-200 animate-pulse rounded-lg"></div>
        ))}
      </div>
    )
  }

  if (certificates.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text-secondary">No certificates found.</p>
      </div>
    )
  }

  const handleViewNFT = (nft_id: number) => {
    console.log(nft_id)
    window.open(`https://sepolia.voyager.online/nft/${NFT_CONTRACT_ADDRESS}/${nft_id}`, '_blank')
  }

  const handleDownload = (certificate: Certificate) => {
    downloadCertificate(certificate, user?.full_name ?? "Student foo")
  }

  const handleDownloadPNG = (certificate: Certificate) => {
    downloadCertificatePNG(certificate, user?.full_name ?? "Student foo")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {certificates.map((certificate: Certificate) => (
        <CertificateCard
          key={certificate.id}
          id={certificate.id ?? 0}
          issueDate={certificate.date}
          score={certificate.score}
          image={certificate.image}
          onDownload={() => handleDownload(certificate)}
          onViewNFT={() => handleViewNFT(certificate.nft_id)}
          onDownloadPNG={() => handleDownloadPNG(certificate)}
          isGeneratingPDF={isGeneratingPDF === certificate.id}
          nft_id={certificate.nft_id}
        />
      ))}
    </div>
  )
}
