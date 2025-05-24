/* eslint-disable @next/next/no-img-element */
"use client"

import { NFTDisplayComponentProps } from "@/types/nft"
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/Card"
import Image from "next/image"
import { useImage } from "@/hooks/useImage"
import { Button } from "../atoms/Button"

const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ?? "0x013c34213f2935cdc8caa12af93f561a989aeaf0a8eaa6c4aa11d2dd00869adb"

export function NFTDisplayComponent({ nft }: NFTDisplayComponentProps) {
  const { url, isBase64, alt } = useImage({
    src: nft.nft_metadata?.image,
    alt: nft.nft_metadata?.name || `NFT#${nft.nft_id}`
  })

  const handleViewNFT = () => {
    window.open(`https://sepolia.voyager.online/nft/${NFT_CONTRACT_ADDRESS}/${nft.nft_id}`, '_blank')
  }

  return (
    <div className="relative group">
      {/* Capa de gradiente con tamaño fijo de 1px */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-light via-secondary-main to-accent-main p-[1px]"></div>
      <Card className="relative w-full max-w-md mx-auto rounded-[7px] z-10 bg-surface">
        <CardHeader>
          <CardTitle className="text-center">{` NFT ID: ${nft.nft_id} `}</CardTitle>
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

            {nft.nft_id && <div className="flex justify-center">
              <Button
                onClick={handleViewNFT}
                className="bg-[#36b9f3] text-white hover:brightness-110 hover:shadow-md transition-all duration-300"
              >
                View NFT
              </Button>
            </div>}

            {nft.nft_transaction && <div className="pt-4 border-t text-center">
              <p className="text-xs text-text-secondary text-center">Transaction ID:</p>
              <a href={`https://sepolia.etherscan.io/tx/${nft.nft_transaction}`} target="_blank" rel="noopener noreferrer"> {nft.nft_transaction}</a>
              <p className="text-xs text-text-secondary text-center">• Verified on Blockchain</p>
            </div>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
