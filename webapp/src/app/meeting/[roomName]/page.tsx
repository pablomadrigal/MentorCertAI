"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useRoomContext, PreJoin, formatChatMessageLinks, VideoConference } from '@livekit/components-react';
import { RoomEvent, Room } from 'livekit-client';
import { RoomContext } from '@livekit/components-react';
import { Header } from "@/components/organisms/Header";

function RoomContent({ disconnect }: { disconnect: () => void }) {
    const room = useRoomContext();

    useEffect(() => {
        const handleDisconnected = () => {
            disconnect();
        };
        room.on(RoomEvent.Disconnected, handleDisconnected);
        return () => {
            room.off(RoomEvent.Disconnected, handleDisconnected);
        };
    }, [room, disconnect]);

    return (
        <div className="relative flex flex-col min-h-screen bg-gradient-primary">
            <div className="absolute inset-0 bg-linear-to-br from-primary-dark via-primary-main to-primary-dark opacity-90"></div>
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-4 p-4">
                <VideoConference
                    chatMessageFormatter={formatChatMessageLinks}
                />
            </div>
        </div>
    );
}

function RoomWrapper({ roomName, room, displayName, disconnect }: { roomName: string, room: Room, displayName?: string, disconnect: () => void }) {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (!roomName) return;
        fetch(`/api/get-token?identity=${displayName ?? 'user-' + Math.random().toString(36).substring(2, 8)}&room=${roomName}`)
            .then(res => res.json())
            .then(async data => {
                setToken(data.token);
                try {
                    await room.connect(process.env.NEXT_PUBLIC_LIVEKIT_URL!, data.token);
                    await room.localParticipant.enableCameraAndMicrophone();
                } catch (error) {
                    console.error('Error connecting to room:', error);
                }
            });

        return () => {
            room.disconnect();
        };
    }, [roomName, room, displayName]);

    if (!roomName) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="grow flex items-center justify-center bg-gradient-primary">
                    <div className="text-white text-xl">Room not found.</div>
                </main>
            </div>
        );
    }

    if (!token) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="grow flex items-center justify-center bg-gradient-primary">
                    <div className="text-white text-xl">Connecting to room...</div>
                </main>
            </div>
        );
    }

    return (
        <RoomContext.Provider value={room}>
            <RoomContent disconnect={disconnect} />
        </RoomContext.Provider>
    );
}

export default function RoomPage() {
    const params = useParams();
    const router = useRouter();
    const roomName = params?.roomName as string;
    const [enterRoom, setEnterRoom] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [room] = useState(() => new Room({
        adaptiveStream: true,
        dynacast: true,
    }));

    const livekitAIAgentURL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://mentorcertai.onrender.com/health";

    const handleDisconnect = () => {
        setEnterRoom(false);
        router.push('/meeting');
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(livekitAIAgentURL)
            if (response) setIsLoading(false)
        }
        fetchData()
    }, [livekitAIAgentURL])

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">
                {enterRoom ? (
                    <RoomWrapper roomName={roomName} room={room} disconnect={handleDisconnect} />
                ) : (
                    <div className="bg-gradient-primary min-h-[calc(100vh-64px)]">
                        <div className="absolute inset-0 bg-linear-to-br from-primary-dark via-primary-main to-primary-dark opacity-90"></div>
                        <div className="relative z-10 container mx-auto px-4 py-8">
                            {isLoading ? <div className="text-white text-xl">Preparing room...</div> : <PreJoin onSubmit={() => setEnterRoom(true)} />}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
} 