"use client"

import { useState, useEffect } from "react"
import { CertificateCard } from "../molecules/CertificateCard"
import { useRouter } from "next/navigation"

interface Certificate {
    id: number
    issueDate: string
    grade: number
}

// Mock data for certificates
const mockCertificates: Certificate[] = [
    {
        id: 1,
        issueDate: "2024-03-15T10:00:00Z",
        grade: 95
    },
    {
        id: 2,
        issueDate: "2024-03-20T14:30:00Z",
        grade: 92
    }
]

export function CertificateList() {
    const router = useRouter()
    const [certificates, setCertificates] = useState<Certificate[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setCertificates(mockCertificates)
            setIsLoading(false)
        }, 1000)
    }, [])

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