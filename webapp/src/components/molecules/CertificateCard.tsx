"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../atoms/Card"
import { Button } from "@/components/atoms/Button"
import { formatDate } from "@/lib/utils"
import { CertificateCardProps } from "@/types/certificate"

export function CertificateCard({ id, issueDate, grade, onDownload, onViewNFT }: CertificateCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Certificate #{id}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Issue Date</span>
                        <span className="font-medium">{formatDate(issueDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Grade</span>
                        <span className="font-medium">{grade}%</span>
                    </div>
                    <div className="flex space-x-2">
                        <Button onClick={onDownload} variant="outline" className="flex-1">
                            Download
                        </Button>
                        <Button onClick={onViewNFT} variant="default" className="flex-1">
                            View NFT
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 