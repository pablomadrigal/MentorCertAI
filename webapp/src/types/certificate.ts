export interface Certificate {
  id: number
  issueDate: string
  grade: number
  userId: string
}

export interface CertificateCardProps extends Certificate {
  onDownload: () => void
  onViewNFT: () => void
} 