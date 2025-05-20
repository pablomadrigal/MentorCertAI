import { Card, CardContent, CardHeader, CardTitle } from "../atoms/Card"
import Image from "next/image"

interface NFTCardProps {
    title: string;
    description: string;
    imageUrl: string;
    mintedAt: string;
    attributes: Array<{
        trait_type: string;
        value: string;
    }>;
}

export function NFTCard({ title, description, imageUrl, mintedAt, attributes }: NFTCardProps) {
    return (
        <div className="relative group">
            <div className="absolute inset-0 rounded-lg bg-linear-to-r from-primary-light via-secondary-main to-accent-main p-px"></div>
            <Card className="relative rounded-[7px] z-10 bg-surface">
                <CardHeader>
                    <CardTitle className="text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="relative h-48 w-full overflow-hidden rounded-md">
                            <Image
                                src={imageUrl || "/placeholder.svg?height=200&width=400&query=certificate"}
                                alt={title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-sm">{description}</p>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="rounded-md bg-background p-2">
                                <p className="text-xs text-text-secondary">Minted at</p>
                                <p className="font-medium">{mintedAt}</p>
                            </div>
                            {attributes.map((attr, index) => (
                                <div key={index} className="rounded-md bg-background p-2">
                                    <p className="text-xs text-text-secondary">{attr.trait_type}</p>
                                    <p className="font-medium">{attr.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 