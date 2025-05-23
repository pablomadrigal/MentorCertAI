import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/atoms/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import { NFTDisplayComponent } from "@/components/organisms/NFTDisplayComponent"
import { Certificate } from "@/types/certificate"
import { NFT } from "@/types/nft"
import { useApi } from "@/hooks/useApi"

interface ExamResultsComponentProps {
    sessionId: string
}

export function ExamResultsComponent({ sessionId }: ExamResultsComponentProps) {
    const router = useRouter()
    const [certificate, setCertificate] = useState<Certificate | null>(null)
    const { get, loading, error } = useApi<Certificate[]>()

    useEffect(() => {
        const loadResults = async () => {
            try {
                const { data } = await get(`/api/certificates/${sessionId}`)
                setCertificate(data?.[0] ?? null)
            } catch (error) {
                console.error("Error fetching results:", error)
            }
        }

        loadResults()
    }, [sessionId])

    if (!certificate) {
        return (
            <div className="text-center">
                <div className="text-2xl font-bold">No certificate found</div>
            </div>
        )
    }

    const passed = certificate?.score >= 70
    const nft: NFT = {
        nft_id: certificate?.nft_id,
        certificateId: certificate?.id,
        nft_metadata: certificate?.nft_metadata,
        nft_transaction: certificate?.nft_transaction
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
                                onClick={() => router.push("/student/dashboard")}
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
                        <div className="relative p-px rounded-lg bg-linear-to-r from-primary-light via-secondary-main to-accent-main shadow-md">
                            <div className="bg-white p-8 rounded-[7px] text-slate-800 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-accent-main/20 rounded-full -mr-20 -mt-20"></div>
                                <div className="absolute bottom-0 left-0 w-60 h-60 bg-secondary-main/15 rounded-full -ml-20 -mb-20"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-light/15 rounded-full"></div>

                                <div className="border-8 border-accent-main/20 p-8 rounded-lg bg-white shadow-inner relative overflow-hidden z-10">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary-light via-secondary-main to-accent-main"></div>
                                    <div className="absolute bottom-0 right-0 w-full h-2 bg-linear-to-r from-accent-main via-secondary-main to-primary-light"></div>

                                    <div className="text-center relative z-10">
                                        <div className="mb-6">
                                            <h3 className="text-3xl font-bold mb-2 text-slate-900">Certificate of Completion</h3>
                                            <div className="w-32 h-1 bg-linear-to-r from-secondary-main to-accent-main mx-auto"></div>
                                        </div>

                                        <p className="text-lg mb-8 text-slate-700">This certifies that</p>
                                        <p className="text-2xl font-bold mb-8 text-secondary-dark">{"Student"}</p>
                                        <p className="text-lg mb-8 text-slate-700">
                                            has successfully completed the mentoring session and passed the certification exam with a
                                            score of <span className="text-accent-dark font-bold">{certificate?.score}%</span>.
                                        </p>

                                        <div className="flex justify-between items-center mt-12">
                                            <div className="text-left">
                                                <p className="text-sm text-slate-600">Date Issued:</p>
                                                <p className="text-md font-medium text-slate-800">{new Date().toLocaleDateString()}</p>
                                            </div>

                                            <div className="flex flex-col items-center">
                                                <div className="w-20 h-20 rounded-full bg-secondary-main/20 flex items-center justify-center mb-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="w-12 h-12 text-secondary-main"
                                                    >
                                                        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                                        <path d="m9 12 2 2 4-4" />
                                                    </svg>
                                                </div>
                                                <p className="text-xs text-slate-600">Verified</p>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-sm text-slate-600">Certificate ID:</p>
                                                <p className="text-md font-medium text-slate-800">{certificate.id}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-center">
                                    <Button className="bg-accent-main text-primary-dark hover:bg-accent-light">
                                        Download Certificate
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center">Your NFT</h2>
                        <NFTDisplayComponent nft={nft} />
                    </div>
                </div>
            )}
        </div>
    )
} 