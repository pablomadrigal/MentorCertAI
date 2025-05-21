"use client"

import { Header } from "../../../components/organisms/Header"
import { Footer } from "../../../components/organisms/Footer"
import { CertificateList } from "../../../components/organisms/CertificateList"

export default function StudentCertificates() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Certificates</h1>
          <CertificateList />
        </div>
      </main>

      <Footer />
    </div>
  )
}
