/* eslint-disable @next/next/no-img-element */
"use client"

import { NFTDisplayComponentProps } from "@/types/nft"
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/Card"
import Image from "next/image"
import { useImage } from "@/hooks/useImage"

export function NFTDisplayComponent({ nft }: NFTDisplayComponentProps) {
  const { url, isBase64, alt } = useImage({
    src: nft.nft_metadata?.image,
    alt: nft.nft_metadata?.name || `NFT#${nft.nft_id}`
  })

  return (
    <div className="relative group">
      {/* Capa de gradiente con tamaño fijo de 1px */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-light via-secondary-main to-accent-main p-[1px]"></div>
      <Card className="relative w-full max-w-md mx-auto rounded-[7px] z-10 bg-surface">
        <CardHeader>
          <CardTitle className="text-center">{nft.nft_metadata?.name ? nft.nft_metadata.name : ` NFT#${nft.nft_id} `}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="relative h-64 w-full overflow-hidden rounded-md">
              {isBase64 ? (
                <img
                  src={url}
                  alt={alt}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={url}
                  alt={alt}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            <div className="text-center">
              <p className="text-text-secondary">{nft.nft_metadata?.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {nft.nft_metadata?.attributes?.map((attr, index) => (
                <div key={index} className="rounded-md bg-background p-3 text-center">
                  <p className="text-xs text-text-secondary">{attr.trait_type}</p>
                  <p className="font-medium">{attr.value}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-text-secondary text-center">NFT ID: {nft.nft_id} Transaction ID: {nft.nft_transaction} • Verified on Blockchain</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
