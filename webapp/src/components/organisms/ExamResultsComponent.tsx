/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/atoms/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import { Certificate } from "@/types/certificate"
import { useApi } from "@/hooks/useApi"
import { useImage } from "@/hooks/useImage"
import { NFTDisplayComponent } from "../organisms/NFTDisplayComponent"
import Image from "next/image"

interface ExamResultsComponentProps {
    sessionId: string
}

export function ExamResultsComponent({ sessionId }: ExamResultsComponentProps) {
    const router = useRouter()
    const [certificate, setCertificate] = useState<Certificate | null>(null)
    const [passed, setPassed] = useState(false)
    const { get, loading } = useApi<Certificate>()

    const { url, isBase64, alt } = useImage({
        src: certificate?.image,
        alt: certificate ? `Certificate #${certificate.id}` : "Certificate"
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await get(`/certificates/${sessionId}`)
            if (response.data) {
                setCertificate(response.data)
                setPassed(true)
            }
        }

        fetchData()
    }, [get, sessionId])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main"></div>
            </div>
        )
    }

    if (!passed || !certificate) {
        return (
            <div className="text-center py-8">
                <p className="text-text-secondary">No certificate available.</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="relative p-px rounded-lg bg-linear-to-r from-primary-light via-secondary-main to-accent-main shadow-md mb-8">
                <Card className="rounded-[7px]">
                    <CardHeader>
                        <CardTitle className="text-center">Your Score: {certificate?.score}%</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center mb-6">
                            <div
                                className={`w-32 h-32 rounded-full border-8 ${passed ? "border-accent-main" : "border-error"} flex items-center justify-center`}
                            >
                                <span className="text-3xl font-bold">{certificate?.score}%</span>
                            </div>
                        </div>

                        <div className="text-center mb-6">
                            {passed ? (
                                <div className="text-accent-main font-bold text-xl">Congratulations! You passed the exam.</div>
                            ) : (
                                <div className="text-error font-bold text-xl">Unfortunately, you did not pass the exam.</div>
                            )}
                        </div>

                        <div className="flex justify-center">
                            <Button
                                onClick={() => router.push("/")}
                                variant="outline"
                                className="bg-surface-lighter border border-surface-lighter text-text-primary hover:bg-secondary-main hover:text-white transition-all duration-300"
                            >
                                Back to Dashboard
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {passed && certificate && certificate.nft_id && (
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center">Your Certificate</h2>
                        <div className="relative p-px rounded-lg bg-gradient-to-r from-primary-light via-secondary-main to-accent-main shadow-md">
                            <div className="bg-white p-8 rounded-[7px] text-slate-800 relative overflow-hidden">
                                <div className="relative h-[400px] w-full overflow-hidden rounded-md flex-shrink-0 mb-3 bg-surface-lighter">
                                    {isBase64 ? (
                                        <img
                                            src={url}
                                            alt={alt}
                                            className="w-full h-full object-contain"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <Image
                                            src={url}
                                            alt={alt}
                                            fill
                                            className="object-contain"
                                            unoptimized={isBase64}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center">Your NFT</h2>
                        <NFTDisplayComponent
                            nft={{
                                nft_id: certificate.nft_id,
                                nft_transaction: "",
                                nft_metadata: {
                                    name: `Certificate #${certificate.id}`,
                                    description: `Certificate of completion with score ${certificate.score}%`,
                                    image: certificate.image,
                                    attributes: [
                                        { trait_type: "Score", value: `${certificate.score}%` },
                                        { trait_type: "Date", value: new Date(certificate.date).toLocaleDateString() }
                                    ]
                                }
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
} 