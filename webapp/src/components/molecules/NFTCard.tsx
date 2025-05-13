import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import Image from "next/image"

interface NFTCardProps {
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

export function NFTCard({ id, metadata }: NFTCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{metadata.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative h-48 w-full overflow-hidden rounded-md">
            <Image
              src={metadata.image || "/placeholder.svg?height=200&width=400&query=certificate"}
              alt={metadata.name}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm">{metadata.description}</p>
          <div className="grid grid-cols-2 gap-2">
            {metadata.attributes.map((attr, index) => (
              <div key={index} className="rounded-md bg-background p-2">
                <p className="text-xs text-text-secondary">{attr.trait_type}</p>
                <p className="font-medium">{attr.value}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
