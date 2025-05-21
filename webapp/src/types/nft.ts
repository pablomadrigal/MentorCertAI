export interface NFT {
  id: number
  certificateId: number
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