"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../../app/context/AuthContext"
import { useSession } from "../../../app/context/SessionContext"
import { Header } from "../../../components/organisms/Header"
import { Footer } from "../../../components/organisms/Footer"
import { NFTList } from "../../../components/organisms/NFTList"

export default function StudentNFTs() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const { fetchNFTs } = useSession()

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "student")) {
      router.push("/login")
    } else if (user) {
      fetchNFTs()
    }
  }, [user, authLoading, router, fetchNFTs])

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-main"></div>
      </div>
    )
  }

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
