"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import { Button } from "@/components/atoms/Button"
import { formatDate } from "@/utils/utils"
import Image from "next/image"
import { CertificateCardProps } from "@/types/certificate"

export function CertificateCard({ id, issueDate, score, image, onDownload, onViewNFT, isGeneratingPDF }: CertificateCardProps) {
  return (
    <div className="relative p-[1px] rounded-lg bg-gradient-to-r from-primary-light via-secondary-main to-accent-main shadow-md hover:shadow-lg transition-shadow duration-300">
      <Card className="relative rounded-[7px] z-10 bg-surface h-[550px] flex flex-col">
        <CardHeader className="pb-2">
          <div className="h-[56px] flex items-center">
            <CardTitle className="text-xl line-clamp-2" title={`Certificate #${id}`}>
              {`Certificate #${id}`}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col pt-0">
          <div className="flex-1 flex flex-col">
            <div className="relative h-52 w-full overflow-hidden rounded-md flex-shrink-0 mb-3 bg-surface-lighter">
              {image ? (
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Certificate #${id}`}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-text-secondary text-sm">Certificate Preview</div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-text-secondary">Issue Date</p>
                <p className="font-medium">{formatDate(issueDate)}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Score</p>
                <p className="font-medium">{score}%</p>
              </div>
            </div>

            <div className="flex space-x-2 mt-auto">
              <Button
                onClick={onDownload}
                disabled={isGeneratingPDF}
                className="flex-1 bg-[#7355f7] text-white hover:bg-secondary-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingPDF ? "Generating..." : "Download PDF"}
              </Button>
              <Button
                onClick={onViewNFT}
                className="flex-1 bg-[#36b9f3] text-white hover:brightness-110 hover:shadow-md transition-all duration-300"
              >
                View NFT
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
