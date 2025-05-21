import { NextResponse } from 'next/server'
import { NFT } from '@/types/nft'

// Mock data for NFTs
const mockNFTs: NFT[] = [
    {
      nft_id: 1,
      certificateId: 1,
      nft_metadata: {
        name: "JavaScript Mastery",
        description: "This NFT certifies completion of JavaScript Fundamentals mentoring session",
        image: "/javascript-certificate.png",
        attributes: [
          {
            trait_type: "Subject",
            value: "JavaScript Fundamentals",
          },
          {
            trait_type: "Grade",
            value: "95%",
          },
          {
            trait_type: "Date",
            value: new Date(Date.now() - 604800000).toLocaleDateString(),
          },
        ],
      },
      nft_transaction: ''
    },
  {
    nft_id: 2,
    certificateId: 2,
    nft_metadata: {
      name: "React Developer",
      description: "This NFT certifies completion of React Advanced mentoring session",
      image: "/placeholder-gsng6.png",
      attributes: [
        {
          trait_type: "Subject",
          value: "React Advanced",
        },
        {
          trait_type: "Grade",
          value: "88%",
        },
        {
          trait_type: "Date",
          value: new Date(Date.now() - 1209600000).toLocaleDateString(),
        },
      ],
    },
    nft_transaction: ''
  },
]

export async function GET() {
  return NextResponse.json(mockNFTs)
} 