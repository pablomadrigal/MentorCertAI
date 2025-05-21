import { Card, CardContent, CardHeader, CardTitle } from "../atoms/Card"
import Image from "next/image"
import { NFTCardProps } from "@/types/ui"

export function NFTCard({ id, certificateId, metadata }: NFTCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{metadata.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                        <Image
                            src={metadata.image}
                            alt={metadata.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <p className="text-sm text-text-secondary">{metadata.description}</p>
                    <div className="space-y-2">
                        <p className="text-xs text-text-secondary">NFT id {id}</p>
                        <p className="text-xs text-text-secondary">Certificate id {certificateId}</p>
                        {metadata.attributes.map((attr, index) => (
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