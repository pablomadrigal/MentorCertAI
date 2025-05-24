import { NFT } from "./nft"

export interface Certificate extends NFT {
  id?: number
  user_id: number
  date: string
  score: number
  image: string
  session_id: string
  theme: string
  certificate_metadata?: object
}

export interface CertificateCardProps {
  id: number
  issueDate: string
  score: number
  image?: string
  nft_id: number
  onDownload: () => void
  onViewNFT: () => void
  onDownloadPNG: () => void
  isGeneratingPDF?: boolean
}

export interface CertificateListProps {
  certificates: Certificate[]
  isLoading: boolean
}

