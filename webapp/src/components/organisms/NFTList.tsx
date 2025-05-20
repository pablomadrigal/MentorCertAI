"use client"

import { useState, useEffect } from "react"
import { NFTCard } from "../molecules/NFTCard"

interface NFT {
    id: number
    metadata: {
        name: string
        description: string
        image: string
        attributes: Array<{
            trait_type: string
            value: string
        }>
    }
}

// Mock data for NFTs
const mockNFTs: NFT[] = [
    {
        id: 1,
        metadata: {
            name: "JavaScript Fundamentals Certificate",
            description: "Certificate for completing JavaScript Fundamentals course",
            image: "/placeholder.svg?height=200&width=400&query=certificate",
            attributes: [
                { trait_type: "Course", value: "JavaScript Fundamentals" },
                { trait_type: "Grade", value: "95%" },
                { trait_type: "Issue Date", value: "2024-03-15" }
            ]
        }
    },
    {
        id: 2,
        metadata: {
            name: "React Advanced Certificate",
            description: "Certificate for completing React Advanced course",
            image: "/placeholder.svg?height=200&width=400&query=certificate",
            attributes: [
                { trait_type: "Course", value: "React Advanced" },
                { trait_type: "Grade", value: "92%" },
                { trait_type: "Issue Date", value: "2024-03-20" }
            ]
        }
    }
]

export function NFTList() {
    const [nfts, setNfts] = useState<NFT[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setNfts(mockNFTs)
            setIsLoading(false)
        }, 1000)
    }, [])

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-lg"></div>
                ))}
            </div>
        )
    }

    if (nfts.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-text-secondary">No NFTs found.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nfts.map((nft) => (
                <NFTCard key={nft.id} id={nft.id} metadata={nft.metadata} />
            ))}
        </div>
    )
} 