export interface NFT {
    id: number
    certificateId: string
    metadata: {
      name: string
      description: string
      image: string
      attributes: {
        trait_type: string
        value: string
      }[]
    }
} 