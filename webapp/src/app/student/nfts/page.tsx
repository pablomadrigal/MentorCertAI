"use client"

import { Header } from "../../../components/organisms/Header"
import { Footer } from "../../../components/organisms/Footer"
import { NFTList } from "../../../components/organisms/NFTList"
import { useEffect, useState } from "react"

export default function StudentNFTs() {
  const [nfts, setNfts] = useState()

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('/api/nfts/id')
      const data = await res.json()
      setNfts(data)
    }
    fetchPosts()
  }, [])

  if (!nfts) return <div>Loading...</div>

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your NFTs</h1>
          <NFTList nfts={nfts} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
