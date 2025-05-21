import type React from "react"

export interface FormFieldProps {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export interface LogoProps {
  className?: string
  linkClassName?: string
  size?: "default" | "small"
}

export interface NFTCardProps {
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

export interface NFTDisplayComponentProps {
  nft: {
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
} 