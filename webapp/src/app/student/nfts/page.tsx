"use client"

import { Header } from "@/components/organisms/Header"
import { Footer } from "@/components/organisms/Footer"
import { NFTList } from "@/components/organisms/NFTList"
import { useEffect, useState } from "react"
import { useApi } from "@/hooks/useApi"
import { NFT } from "@/types/nft"

export default function StudentNFTs() {
  const [nfts, setNfts] = useState<NFT[]>([])
  const { get, loading } = useApi<NFT[]>()

  useEffect(() => {
    const fetchData = async () => {
      const nftsResponse = await get('/nfts')
      const nfts = nftsResponse?.data?.map((nft) => ({ ...nft, image: nft.image ?? "/data-science-certificate.png" })) ?? []
      if (nftsResponse.data) setNfts(nfts)
    }

    fetchData()
  }, [get])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your NFTs</h1>
          <NFTList nfts={nfts} isLoading={loading} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
