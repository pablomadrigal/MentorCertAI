"use client"

import { CertificateCard } from "../molecules/CertificateCard"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useCertificatePDF } from "@/hooks/useCertificatePDF"
import { Certificate, CertificateListProps } from "@/types/certificate"
import { useAuth } from "@/contexts/AuthContext"

export function CertificateList({ certificates, isLoading }: CertificateListProps) {
  const router = useRouter()
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

  const handleViewNFT = (certificateId: number) => {
    router.push(`/student/nfts?certificateId=${certificateId}`)
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
          onViewNFT={() => handleViewNFT(certificate.id ?? 0)}
          onDownloadPNG={() => handleDownloadPNG(certificate)}
          isGeneratingPDF={isGeneratingPDF === certificate.id}
        />
      ))}
    </div>
  )
}
