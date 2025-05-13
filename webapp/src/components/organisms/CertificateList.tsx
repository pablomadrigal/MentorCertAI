"use client"

import { useSession } from "../../app/context/SessionContext"
import { CertificateCard } from "../molecules/CertificateCard"
import { useRouter } from "next/navigation"

export function CertificateList() {
  const { certificates, isLoading } = useSession()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-60 bg-gray-200 animate-pulse rounded-lg"></div>
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

  const handleDownloadCertificate = (certificateId: number) => {
    // In a real app, this would download the certificate PDF
    alert(`Downloading certificate ${certificateId}`)
  }

  const handleViewNFT = (certificateId: number) => {
    router.push(`/student/nfts?certificateId=${certificateId}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {certificates.map((certificate) => (
        <CertificateCard
          key={certificate.id}
          id={certificate.id}
          issueDate={certificate.issueDate}
          grade={certificate.grade}
          onDownload={() => handleDownloadCertificate(certificate.id)}
          onViewNFT={() => handleViewNFT(certificate.id)}
        />
      ))}
    </div>
  )
}
