"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../atoms/Card"
import Image from "next/image"

interface NFTDisplayComponentProps {
    nft: {
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
}

export function NFTDisplayComponent({ nft }: NFTDisplayComponentProps) {
    return (
        <div className="relative group">
            <div className="absolute inset-0 rounded-lg bg-linear-to-r from-primary-light via-secondary-main to-accent-main p-px"></div>
            <Card className="relative w-full max-w-md mx-auto rounded-[7px] z-10 bg-surface">
                <CardHeader>
                    <CardTitle className="text-center">{nft.metadata.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="relative h-64 w-full overflow-hidden rounded-md">
                            <Image
                                src={nft.metadata.image || "/placeholder.svg?height=300&width=400&query=certificate+nft"}
                                alt={nft.metadata.name}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="text-center">
                            <p className="text-text-secondary">{nft.metadata.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {nft.metadata.attributes.map((attr, index) => (
                                <div key={index} className="rounded-md bg-background p-3 text-center">
                                    <p className="text-xs text-text-secondary">{attr.trait_type}</p>
                                    <p className="font-medium">{attr.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t">
                            <p className="text-xs text-text-secondary text-center">NFT ID: {nft.id} • Verified on Blockchain</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 