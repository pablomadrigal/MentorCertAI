"use client"

import { useState, useEffect } from "react"
import { CertificateCard } from "../molecules/CertificateCard"
import { useRouter } from "next/navigation"
import { Certificate } from "@/types/certificate"

export function CertificateList() {
    const router = useRouter()
    const [certificates, setCertificates] = useState<Certificate[]>([])

    useEffect(() => {
        // Mock data - in a real app, this would be an API call
        const mockCertificates: Certificate[] = [
            {
                id: 1,
                issueDate: new Date().toISOString(),
                grade: 95,
            },
            {
                id: 2,
                issueDate: new Date(Date.now() - 86400000).toISOString(),
                grade: 88,
            },
        ]

        setCertificates(mockCertificates)
    }, [])

    const handleDownload = (id: number) => {
        console.log("Downloading certificate:", id)
        // In a real app, this would trigger a download
    }

    const handleViewNFT = (id: number) => {
        router.push(`/student/nfts/${id}`)
    }

    if (certificates.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-text-secondary">No certificates found.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
                <CertificateCard
                    key={certificate.id}
                    {...certificate}
                    onDownload={() => handleDownload(certificate.id)}
                    onViewNFT={() => handleViewNFT(certificate.id)}
                />
            ))}
        </div>
    )
} 