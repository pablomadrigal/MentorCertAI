export interface NFT {
    nft_id: number
    certificateId?: number
    nft_transaction: string
    nft_metadata?: NFTMetadata
    image?: string
} 

export interface NFTMetadata {
  name?: string
  description?: string
  image?: string
  attributes?: {
    trait_type: string
    value: string
  }[]
}

export interface NFTListProps {
    nfts: NFT[]
    isLoading: boolean
}

export interface NFTDisplayComponentProps {
    nft: NFT
}