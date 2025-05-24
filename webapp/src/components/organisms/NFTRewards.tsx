/* eslint-disable @next/next/no-img-element */
import { NFT } from "@/types/nft"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/atoms/Button"
import { useImage } from "@/hooks/useImage"

interface NFTRewardsProps {
    nfts: NFT[]
}

export function NFTRewards({ nfts }: NFTRewardsProps) {
    const displayedNfts = nfts.slice(0, 2)
    const imageProps1 = useImage({
        src: displayedNfts[0]?.nft_metadata?.image || displayedNfts[0]?.image,
        alt: displayedNfts[0]?.nft_metadata?.name || "NFT Image"
    })
    const imageProps2 = useImage({
        src: displayedNfts[1]?.nft_metadata?.image || displayedNfts[1]?.image,
        alt: displayedNfts[1]?.nft_metadata?.name || "NFT Image"
    })

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Your NFT Rewards</h2>
            <div className="space-y-4">
                {displayedNfts.map((nft, index) => {
                    const imageProps = index === 0 ? imageProps1 : imageProps2
                    return (
                        <div key={nft.nft_id} className="relative group">
                            <div className="absolute inset-0 rounded-lg bg-linear-to-r from-primary-light via-secondary-main to-accent-main p-px"></div>
                            <Card className="relative rounded-[7px] z-10 bg-surface">
                                <CardHeader className="p-4">
                                    {nft.nft_metadata ? <CardTitle className="text-base truncate" title={nft.nft_metadata.name}>
                                        {nft.nft_metadata.name}
                                    </CardTitle> : <CardTitle className="text-base truncate" title={nft.nft_id.toString()}>
                                        {nft.nft_id.toString()}
                                    </CardTitle>}
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0">
                                            {imageProps.isBase64 ? (
                                                <img
                                                    src={imageProps.url}
                                                    alt={imageProps.alt}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <Image
                                                    src={imageProps.url}
                                                    alt={imageProps.alt}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="grow">
                                            {nft.nft_metadata && nft.nft_metadata.attributes && (
                                                nft.nft_metadata.attributes.map((attr) => (
                                                    <p key={attr.trait_type} className="text-xs text-text-secondary mb-1">
                                                        {attr.trait_type}:{" "}
                                                        <span className="text-accent-main font-medium">
                                                            {attr.value}
                                                        </span>
                                                    </p>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )
                })}

                <Link href="/student/nfts" passHref>
                    <Button className="w-full bg-linear-to-r from-secondary-dark to-secondary-main text-white hover:from-secondary-main hover:to-secondary-dark transition-all duration-300">
                        View All NFTs
                    </Button>
                </Link>
            </div>
        </div>
    )
}