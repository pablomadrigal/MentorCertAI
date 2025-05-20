"use client"

import { Button } from "@/components/atoms/Button"

interface VideoCallComponentProps {
    sessionId: number
    onEnd: () => void
}

export function VideoCallComponent({ sessionId, onEnd }: VideoCallComponentProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-surface rounded-lg shadow-md">
            <div className="w-full aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                <p className="text-white">Video Call Placeholder for call {sessionId}</p>
            </div>

            <div className="flex space-x-4">
                <Button variant="outline" onClick={onEnd}>
                    End Call
                </Button>
            </div>
        </div>
    )
} 