"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../atoms/Card"
import { Button } from "@/components/atoms/Button"
import { formatDate } from "@/lib/utils"

interface CertificateCardProps {
    id: number
    issueDate: string
    grade: number
    onDownload: () => void
    onViewNFT: () => void
}

export function CertificateCard({ id, issueDate, grade, onDownload, onViewNFT }: CertificateCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Certificate #{id}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-text-secondary">Issue Date</p>
                        <p className="font-medium">{formatDate(issueDate)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-text-secondary">Grade</p>
                        <p className="font-medium">{grade}%</p>
                    </div>
                    <div className="flex space-x-2">
                        <Button onClick={onDownload} variant="outline" className="flex-1">
                            Download PDF
                        </Button>
                        <Button onClick={onViewNFT} className="flex-1">
                            View NFT
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 