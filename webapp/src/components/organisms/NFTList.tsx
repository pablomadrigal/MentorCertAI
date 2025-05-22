"use client"

import { NFTCard } from "@/components/molecules/NFTCard"
import { NFTListProps } from "@/types/nft"

export function NFTList({ nfts, isLoading }: NFTListProps) {

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
        <NFTCard key={nft.nft_id} {...nft} />
      ))}
    </div>
  )
}
