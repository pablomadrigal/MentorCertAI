export interface Certificate {
  id: number
  issueDate: string
  grade: number
}

export interface CertificateCardProps extends Certificate {
  onDownload: () => void
  onViewNFT: () => void
} 