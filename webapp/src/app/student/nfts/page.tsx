"use client"

import { Header } from "../../../components/organisms/Header"
import { Footer } from "../../../components/organisms/Footer"
import { NFTList } from "../../../components/organisms/NFTList"

export default function StudentNFTs() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your NFTs</h1>
          <NFTList />
        </div>
      </main>

      <Footer />
    </div>
  )
}
