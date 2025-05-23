"use client"

import { Header } from "@/components/organisms/Header"
import { Footer } from "@/components/organisms/Footer"
import { CertificateList } from "@/components/organisms/CertificateList"
import { useEffect, useState } from "react"
import { Certificate } from "@/types/certificate"
import { useApi } from "@/hooks/useApi"

export default function StudentCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const { get, loading } = useApi<Certificate[]>()

  useEffect(() => {
    const fetchData = async () => {
      const nftsResponse = await get('/certificates')
      const nfts = nftsResponse?.data?.map((nft) => ({ ...nft, image: nft.image ?? "/data-science-certificate.png" })) ?? []
      if (nftsResponse.data) setCertificates(nfts)
    }
    fetchData()
  }, [get])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Certificates</h1>
          <CertificateList certificates={certificates} isLoading={loading} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
