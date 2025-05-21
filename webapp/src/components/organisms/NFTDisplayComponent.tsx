"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../atoms/Card"
import Image from "next/image"
import { NFTDisplayComponentProps } from "@/types/ui"

export function NFTDisplayComponent({ nft }: NFTDisplayComponentProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{nft.metadata.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                        <Image
                            src={nft.metadata.image}
                            alt={nft.metadata.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <p className="text-sm text-text-secondary">{nft.metadata.description}</p>
                    <div className="space-y-2">
                        {nft.metadata.attributes.map((attr, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <span className="text-text-secondary">{attr.trait_type}</span>
                                <span className="font-medium">{attr.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 