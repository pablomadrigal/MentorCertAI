"use client"

import { Header } from "@/components/organisms/Header"
import { Footer } from "@/components/organisms/Footer"
import { CertificateList } from "@/components/organisms/CertificateList"
import { useEffect, useState } from "react"
import { Certificate } from "@/types/certificate"
import { useAuth } from "@/contexts/AuthContext"
export default function StudentCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchCertificates = async () => {
      const response = await fetch(`/api/user/${user?.sub}/certificates`)
      const certificatesData: Certificate[] = await response.json()
      setCertificates(certificatesData)
      setIsLoading(false)
    }
    fetchCertificates()
  }, [user?.sub])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Certificates</h1>
          <CertificateList certificates={certificates} isLoading={isLoading} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
