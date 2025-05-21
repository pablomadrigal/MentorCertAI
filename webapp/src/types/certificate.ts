import { NFT } from "./nft"

export interface Certificate extends NFT {
  id: number
  user_id: number
  date: string
  score: number
  image: string
  session_id: number
  theme: string
}

export interface CertificateCardProps {
  id: number
  issueDate: string
  score: number
  image?: string
  onDownload: () => void
  onViewNFT: () => void
  isGeneratingPDF?: boolean
}

export interface CertificateListProps {
  certificates: Certificate[]
  isLoading: boolean
}

