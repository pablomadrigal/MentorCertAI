"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import { NFT } from "@/types/nft"
import Image from "next/image"
import { useState } from "react"

export function NFTCard(nft: NFT) {
  const [showFullDescription, setShowFullDescription] = useState(false)

  // Truncar la descripción si es demasiado larga
  const isDescriptionLong = nft.nft_metadata?.description?.length ? nft.nft_metadata?.description?.length > 100 : false
  const truncatedDescription = isDescriptionLong ? `${nft.nft_metadata?.description?.substring(0, 100)}...` : nft.nft_metadata?.description

  return (
    <div className="relative p-[1px] rounded-lg bg-gradient-to-r from-primary-light via-secondary-main to-accent-main shadow-md hover:shadow-lg transition-shadow duration-300">
      <Card className="relative rounded-[7px] z-10 bg-surface h-[620px] flex flex-col">
        <CardHeader className="pb-2">
          <div className="h-[56px] flex items-center">
            <CardTitle className="text-xl line-clamp-2" title={nft.nft_metadata?.name}>
              {nft.nft_metadata?.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col pt-0">
          <div className="flex-1 flex flex-col">
            <div className="relative h-52 w-full overflow-hidden rounded-md flex-shrink-0 mb-3">
              {nft.nft_metadata && nft.nft_metadata.image ? <Image
                src={nft.nft_metadata.image}
                alt={nft.nft_metadata.name || "NFT Image"}
                fill
                className="object-cover"
              /> : nft.image ? <Image
                src={nft.image}
                alt={nft.nft_metadata?.name || "NFT Image"}
                fill
                className="object-cover"
              /> : <Image
                src="/data-science-certificate.png"
                alt="Placeholder"
                fill
                className="object-cover"
              />}
            </div>
            {nft.nft_metadata?.description && (
              <div className="relative mb-2">
                <p className="text-sm h-[70px] overflow-hidden">
                  {isDescriptionLong ? (
                    <span
                      className="cursor-pointer relative group"
                      onMouseEnter={() => setShowFullDescription(true)}
                      onMouseLeave={() => setShowFullDescription(false)}
                    >
                      {truncatedDescription}
                      {showFullDescription && (
                        <span className="absolute z-50 bottom-full left-0 w-64 bg-surface-lighter p-3 rounded-md shadow-lg text-xs border border-surface-lighter">
                          {nft.nft_metadata?.description}
                        </span>
                      )}
                    </span>
                  ) : (
                    nft.nft_metadata?.description
                  )}
                </p>
              </div>
            )}

            {nft.nft_metadata?.attributes && (
              <div className="grid grid-cols-2 gap-2 mt-auto">
                {nft.nft_metadata.attributes.map((attr, index) => (
                  <div key={index} className="rounded-md bg-background p-2">
                    <p className="text-xs text-text-secondary truncate" title={attr.trait_type}>
                      {attr.trait_type}
                    </p>
                    <p className="font-medium truncate" title={attr.value}>
                      {attr.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
