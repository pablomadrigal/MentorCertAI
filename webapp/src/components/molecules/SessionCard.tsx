"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"
import { Button } from "@/components/atoms/Button"
import { Badge } from "@/components/atoms/Badge"
import { formatDate } from "@/lib/utils"

interface SessionCardProps {
  id: number
  dateTime: string
  mentorName?: string
  studentName?: string
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
  link,
  completed,
  userRole,
  onJoin,
}: SessionCardProps) {
  const formattedDate = formatDate(dateTime)
  const isPast = new Date(dateTime) < new Date()

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">
            {userRole === "student"
              ? "Session with " + (mentorName || "Mentor")
              : "Session with " + (studentName || "Student")}
          </CardTitle>
          <Badge variant={completed ? "success" : isPast ? "error" : "default"}>
            {completed ? "Completed" : isPast ? "Missed" : "Upcoming"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-text-secondary">Date & Time</p>
            <p className="font-medium">{formattedDate}</p>
          </div>

          {!completed && !isPast && (
            <Button onClick={onJoin} className="w-full">
              Join Session
            </Button>
          )}

          {completed && userRole === "student" && (
            <Button as="a" href={`/student/exam/${id}`} className="w-full">
              Take Exam
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
