"use client"

import { useEffect, useState } from "react"
import { Header } from "../../../components/organisms/Header"
import { Footer } from "../../../components/organisms/Footer"
import { SessionList } from "../../../components/organisms/SessionList"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/atoms/Card"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../../../components/atoms/Button"

// Datos de ejemplo para el dashboard
const mockSessions = [
  {
    id: 201,
    studentId: 1,
    studentEmail: "john@example.com",
    studentName: "John Doe",
    mentorId: 3,
    mentorName: "Bob Johnson",
    subject: "JavaScript Fundamentals",
    dateTime: new Date(Date.now() + 172800000).toISOString(), // 2 días en el futuro
    link: "https://meet.mentorcertai.com/mock201",
    completed: false,
  },
  {
    id: 202,
    studentId: 1,
    studentEmail: "john@example.com",
    studentName: "John Doe",
    mentorId: 4,
    mentorName: "Alice Brown",
    subject: "React Hooks Advanced",
    dateTime: new Date(Date.now() + 86400000).toISOString(), // 1 día en el futuro
    link: "https://meet.mentorcertai.com/mock202",
    completed: false,
  },
  {
    id: 203,
    studentId: 1,
    studentEmail: "john@example.com",
    studentName: "John Doe",
    mentorId: 3,
    mentorName: "Bob Johnson",
    subject: "API Design Patterns",
    dateTime: new Date(Date.now() - 86400000).toISOString(), // 1 día en el pasado
    link: "https://meet.mentorcertai.com/mock203",
    completed: true,
  },
  {
    id: 204,
    studentId: 1,
    studentEmail: "john@example.com",
    studentName: "John Doe",
    mentorId: 4,
    mentorName: "Alice Brown",
    subject: "Database Optimization",
    dateTime: new Date(Date.now() - 172800000).toISOString(), // 2 días en el pasado
    link: "https://meet.mentorcertai.com/mock204",
    completed: true,
  },
]

// Datos de ejemplo para NFTs
const mockNFTs = [
  {
    id: 1,
    certificateId: 1,
    metadata: {
      name: "JavaScript Mastery",
      description: "This NFT certifies completion of JavaScript Fundamentals mentoring session",
      image: "/javascript-certificate.png",
      attributes: [
        {
          trait_type: "Subject",
          value: "JavaScript Fundamentals",
        },
        {
          trait_type: "Grade",
          value: "95%",
        },
        {
          trait_type: "Date",
          value: new Date(Date.now() - 604800000).toLocaleDateString(),
        },
      ],
    },
  },
  {
    id: 2,
    certificateId: 2,
    metadata: {
      name: "React Developer",
      description: "This NFT certifies completion of React Advanced mentoring session",
      image: "/placeholder-gsng6.png",
      attributes: [
        {
          trait_type: "Subject",
          value: "React Advanced",
        },
        {
          trait_type: "Grade",
          value: "88%",
        },
        {
          trait_type: "Date",
          value: new Date(Date.now() - 1209600000).toLocaleDateString(),
        },
      ],
    },
  },
]

// Tipos de filtro para las sesiones
type FilterType = "all" | "upcoming" | "completed"

export default function StudentDashboard() {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [sessions, setSessions] = useState(mockSessions)
  const [nfts, setNfts] = useState(mockNFTs)

  useEffect(() => {
    // Your effect code here
  }, []);

  useEffect(() => {
    // Asegurarse de que siempre haya datos de ejemplo visibles
    const timer = setTimeout(() => {
      setSessions(mockSessions)
      setNfts(mockNFTs)
      setDataLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [setDataLoaded, mockSessions, mockNFTs])

  // Contar sesiones por tipo
  const upcomingSessions = sessions.filter((s) => !s.completed).length
  const completedSessions = sessions.filter((s) => s.completed).length

  // Manejar el cambio de filtro
  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter)
  }

  if (!dataLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-main"></div>
      </div>
    )
  }

  // Usar los NFTs de la sesión o los mock NFTs si no hay datos
  const displayNFTs = nfts.length > 0 ? nfts : mockNFTs

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                <h2 className="text-2xl font-bold">Your Sessions</h2>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleFilterChange("all")}
                    className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${activeFilter === "all"
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-surface-lighter text-text-secondary hover:bg-surface-lighter/80"
                      }`}
                  >
                    All Sessions
                  </button>
                  <button
                    onClick={() => handleFilterChange("upcoming")}
                    className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${activeFilter === "upcoming"
                      ? "bg-secondary-main text-white shadow-md"
                      : "bg-surface-lighter text-text-secondary hover:bg-surface-lighter/80"
                      }`}
                  >
                    {upcomingSessions} Upcoming
                  </button>
                  <button
                    onClick={() => handleFilterChange("completed")}
                    className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${activeFilter === "completed"
                      ? "bg-accent-main text-primary-dark shadow-md"
                      : "bg-surface-lighter text-text-secondary hover:bg-surface-lighter/80"
                      }`}
                  >
                    {completedSessions} Completed
                  </button>
                </div>
              </div>
              <SessionList filter={activeFilter} />
            </div>

            <div className="space-y-8">
              {/* Sección de NFTs */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Your NFT Rewards</h2>
                <div className="space-y-4">
                  {displayNFTs.slice(0, 2).map((nft) => (
                    <div key={nft.id} className="relative group">
                      {/* Capa de gradiente con tamaño fijo de 1px */}
                      <div className="absolute inset-0 rounded-lg bg-linear-to-r from-primary-light via-secondary-main to-accent-main p-px"></div>
                      <Card className="relative rounded-[7px] z-10 bg-surface">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base truncate" title={nft.metadata.name}>
                            {nft.metadata.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex items-center space-x-4">
                            <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0">
                              <Image
                                src={nft.metadata.image || "/placeholder.svg"}
                                alt={nft.metadata.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="grow">
                              <p className="text-xs text-text-secondary mb-1">
                                {nft.metadata.attributes.find((attr) => attr.trait_type === "Subject")?.value}
                              </p>
                              <p className="text-xs text-text-secondary">
                                Grade:{" "}
                                <span className="text-accent-main font-medium">
                                  {nft.metadata.attributes.find((attr) => attr.trait_type === "Grade")?.value}
                                </span>
                              </p>
                              <p className="text-xs text-text-secondary">
                                {nft.metadata.attributes.find((attr) => attr.trait_type === "Date")?.value}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}

                  <Link href="/student/nfts" passHref>
                    <Button className="w-full bg-linear-to-r from-secondary-dark to-secondary-main text-white hover:from-secondary-main hover:to-secondary-dark transition-all duration-300">
                      View All NFTs
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
