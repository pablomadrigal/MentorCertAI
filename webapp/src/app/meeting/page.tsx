"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from "@/components/organisms/Header";
import { Button } from "@/components/atoms/Button";

export default function MeetingPage() {
    const [roomCode, setRoomCode] = useState('');
    const router = useRouter();

    // Handler for creating a new meeting
    const handleNewMeeting = () => {
        const newRoom = `${Math.random().toString(36).substring(2, 8)}`;
        router.push(`/meeting/${newRoom}`);
    };

    // Handler for joining a meeting by code
    const handleJoin = () => {
        if (roomCode.trim()) {
            router.push(`/meeting/${roomCode.trim()}`);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow flex flex-col items-center justify-center bg-gradient-primary py-20 relative">
                <div className="absolute inset-0 bg-linear-to-br from-primary-dark via-primary-main to-primary-dark opacity-90"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Video calls and meetings for everyone</h1>
                        <p className="text-xl mb-8 text-text-primary">Connect, collaborate, and celebrate from anywhere with our app.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button
                                onClick={handleNewMeeting}
                                size="lg"
                                className="w-full sm:w-auto bg-linear-to-r from-primary-main to-primary-light text-white hover:from-primary-light hover:to-primary-main transition-all brightness-110 shadow-lg hover:shadow-xl"
                            >
                                New Meeting
                            </Button>
                            <div className="flex gap-2 w-full sm:w-auto">
                                <input
                                    type="text"
                                    placeholder="Enter a code or link"
                                    className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-main bg-white/10 text-white placeholder-gray-400"
                                    value={roomCode}
                                    onChange={e => setRoomCode(e.target.value)}
                                />
                                <Button
                                    onClick={handleJoin}
                                    disabled={!roomCode.trim()}
                                    size="lg"
                                    className="bg-linear-to-r from-secondary-dark to-secondary-main text-white hover:from-secondary-main hover:to-secondary-dark transition-all brightness-110 shadow-lg hover:shadow-xl disabled:opacity-50"
                                >
                                    Join
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
} 