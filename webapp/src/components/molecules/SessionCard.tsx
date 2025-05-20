"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../atoms/Card"
import { Button } from "../atoms/Button"
import { Badge } from "../atoms/Badge"
import { formatDate } from "../../lib/utils"

interface SessionCardProps {
    title: string;
    description: string;
    date: string;
    status: string;
    id: number
    dateTime: string
    mentorName?: string
    studentName?: string
    subject?: string
    link: string
    completed: boolean
    userRole: "student" | "mentor"
    onJoin: () => void
}

export function SessionCard({
    id,
    dateTime,
    mentorName,
    studentName,
    subject,
    link,
    completed,
    userRole,
    onJoin,
}: SessionCardProps) {
    const formattedDate = formatDate(dateTime)
    const isPast = new Date(dateTime) < new Date()

    return (
        <div className="relative p-px rounded-lg bg-linear-to-r from-primary-light via-secondary-main to-accent-main shadow-md hover:shadow-lg transition-shadow duration-300">
            <Card className="h-full rounded-[7px] flex flex-col">
                <CardHeader className="p-4">
                    <div className="flex justify-between items-center">
                        <CardTitle
                            className="text-base truncate"
                            title={
                                userRole === "student"
                                    ? "Session with " + (mentorName || "Mentor")
                                    : "Session with " + (studentName || "Student")
                            }
                        >
                            {userRole === "student"
                                ? "Session with " + (mentorName || "Mentor")
                                : "Session with " + (studentName || "Student")}
                        </CardTitle>
                        <Badge variant={completed ? "success" : isPast ? "error" : "default"} className="text-xs shrink-0 ml-2">
                            {completed ? "Completed" : isPast ? "Missed" : "Upcoming"}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 grow flex flex-col justify-between">
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <div>
                                <p className="text-xs text-text-secondary">Subject</p>
                                <p className="text-sm font-medium truncate" title={subject || "General Mentoring"}>
                                    {subject || "General Mentoring"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-text-secondary">Date & Time</p>
                                <p className="text-sm font-medium">{formattedDate}</p>
                            </div>
                        </div>
                    </div>

                    {!completed && !isPast && (
                        <Button
                            onClick={onJoin}
                            className="w-full text-sm py-1 h-auto mt-3 bg-linear-to-r from-secondary-dark to-secondary-main text-white hover:from-secondary-main hover:to-secondary-dark transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Join Session
                        </Button>
                    )}

                    {completed && userRole === "student" && (
                        <Button
                            onClick={onJoin}
                            className="w-full text-sm py-1 h-auto mt-3 bg-linear-to-r from-accent-dark to-accent-main text-primary-dark hover:from-accent-main hover:to-accent-light transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Take Exam
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    )
} 