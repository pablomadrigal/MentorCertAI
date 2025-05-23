"use client"

import { useEffect, useState } from "react"
import { SessionList } from "@/components/organisms/SessionList"
import { NFTRewards } from "@/components/organisms/NFTRewards"
import { FilterType, Session } from "@/types/session"
import { NFT } from "@/types/nft"
import { useApi } from "@/hooks/useApi"

export function StudentDashboard() {
    const [activeFilter, setActiveFilter] = useState<FilterType>("all")
    const [sessions, setSessions] = useState<Session[]>([])
    const [nfts, setNfts] = useState<NFT[]>([])
    const { loading: sessionsLoading, error: sessionsError, get: getSessions } = useApi<Session[]>()
    const { loading: nftsLoading, error: nftsError, get: getNfts } = useApi<NFT[]>()

    useEffect(() => {
        const fetchData = async () => {
            const [sessionsResponse, nftsResponse] = await Promise.all([
                getSessions('/sessions'),
                getNfts('/nfts')
            ])

            if (sessionsResponse.data) setSessions(sessionsResponse.data)
            const nfts = nftsResponse?.data?.map((nft) => ({ ...nft, image: nft.image ?? "/data-science-certificate.png" })) ?? []
            if (nftsResponse.data) setNfts(nfts)
        }

        fetchData()
    }, [getSessions, getNfts])

    // Count sessions by type
    const upcomingSessions = sessions.filter((s) => s.date_time && new Date(s.date_time) > new Date()).length
    const completedSessions = sessions.filter((s) => !s.date_time || new Date(s.date_time) < new Date()).length

    // Handle filter change
    const handleFilterChange = (filter: FilterType) => {
        setActiveFilter(filter)
    }

    if (sessionsLoading || nftsLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-main"></div>
            </div>
        )
    }

    if (sessionsError || nftsError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500">Error loading data</div>
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
                            <SessionList sessions={sessions} filter={activeFilter} />
                        </div>

                        <div className="space-y-8">
                            <NFTRewards nfts={nfts} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
