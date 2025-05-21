import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MentorCertAi",
  description: "AI-powered mentoring with blockchain certification",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
