import { Card, CardContent, CardHeader, CardTitle } from "../atoms/Card"
import Image from "next/image"
import { NFTCardProps } from "@/types/ui"

export function NFTCard({ title, description, imageUrl, mintedAt, attributes }: NFTCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <p className="text-sm text-text-secondary">{description}</p>
                    <div className="space-y-2">
                        {attributes.map((attr, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <span className="text-text-secondary">{attr.trait_type}</span>
                                <span className="font-medium">{attr.value}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-text-secondary">Minted on {mintedAt}</p>
                </div>
            </CardContent>
        </Card>
    )
} 