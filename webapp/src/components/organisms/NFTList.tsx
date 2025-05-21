"use client"

import { NFTCard } from "../molecules/NFTCard"
import { NFT } from "@/types/nft"

export function NFTList({ nfts }: { nfts: NFT[] }) {


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
                <NFTCard key={nft.id} {...nft} />
            ))}
        </div>
    )
} 