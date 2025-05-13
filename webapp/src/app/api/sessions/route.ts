import { NextResponse } from "next/server"

// In-memory database for sessions
const sessions = [
  {
    id: 1,
    studentId: 1,
    mentorId: 3,
    dateTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    link: "https://meet.mentorcertai.com/123456",
    completed: false,
  },
  {
    id: 2,
    studentId: 1,
    mentorId: 4,
    dateTime: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    link: "https://meet.mentorcertai.com/234567",
    completed: false,
  },
  {
    id: 3,
    studentId: 2,
    mentorId: 3,
    dateTime: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    link: "https://meet.mentorcertai.com/345678",
    completed: true,
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const studentId = searchParams.get("studentId")
  const mentorId = searchParams.get("mentorId")

  let filteredSessions = [...sessions]

  if (studentId) {
    filteredSessions = filteredSessions.filter((s) => s.studentId === Number.parseInt(studentId))
  }

  if (mentorId) {
    filteredSessions = filteredSessions.filter((s) => s.mentorId === Number.parseInt(mentorId))
  }

  return NextResponse.json(filteredSessions)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { studentId, mentorId, dateTime, link } = body

    // Create new session
    const newSession = {
      id: sessions.length + 1,
      studentId,
      mentorId,
      dateTime,
      link,
      completed: false,
    }

    sessions.push(newSession)

    return NextResponse.json(newSession)
  } catch (error) {
    console.error("Error creating session:", error)
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 })
  }
}
