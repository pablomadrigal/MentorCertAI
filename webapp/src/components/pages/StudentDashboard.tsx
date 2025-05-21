"use client"

import { useEffect, useState } from "react"
import { SessionList } from "@/components/organisms/SessionList"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/atoms/Button"
import { FilterType, Session } from "@/types/session"
import { NFT } from "@/types/nft"

export function StudentDashboard() {
    const [dataLoaded, setDataLoaded] = useState(false)
    const [activeFilter, setActiveFilter] = useState<FilterType>("all")
    const [sessions, setSessions] = useState<Session[]>([])
    const [nfts, setNfts] = useState<NFT[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sessionsResponse, nftsResponse] = await Promise.all([
                    fetch(`/api/sessions?filter=${activeFilter}`),
                    fetch('/api/nfts')
                ])

                const sessionsData = await sessionsResponse.json()
                const nftsData = await nftsResponse.json()

                setSessions(sessionsData)
                setNfts(nftsData)
                setDataLoaded(true)
            } catch (error) {
                console.error('Error fetching data:', error)
                setDataLoaded(true)
            }
        }

        fetchData()
    }, [activeFilter])

    // Count sessions by type
    const upcomingSessions = sessions.filter((s) => !s.completed).length
    const completedSessions = sessions.filter((s) => s.completed).length

    // Handle filter change
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

    return (
        <div className="flex flex-col min-h-screen">

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
                            <SessionList sessions={sessions} />
                        </div>

                        <div className="space-y-8">
                            {/* NFT Rewards section */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Your NFT Rewards</h2>
                                <div className="space-y-4">
                                    {nfts.slice(0, 2).map((nft) => (
                                        <div key={nft.id} className="relative group">
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
        </div>
    )
}
