import { NextResponse } from 'next/server'
import { Session } from '@/types/session'

// Mock data moved from client component
const mockSessions: Session[] = [
  {
    id: "101",
    studentId: 201,
    studentEmail: "emma@example.com",
    studentName: "Emma Wilson",
    mentorId: 3,
    mentorName: "Bob Johnson",
    subject: "JavaScript Fundamentals",
    dateTime: new Date(Date.now() + 172800000).toISOString(),
    link: "https://meet.mentorcertai.com/mock101",
    completed: false,
  },
  {
    id: "102",
    studentId: 202,
    studentEmail: "david@example.com",
    studentName: "David Miller",
    mentorId: 3,
    mentorName: "Bob Johnson",
    subject: "React Hooks Advanced",
    dateTime: new Date(Date.now() + 86400000).toISOString(),
    link: "https://meet.mentorcertai.com/mock102",
    completed: false,
  },
  {
    id: "103",
    studentId: 203,
    studentEmail: "sophia@example.com",
    studentName: "Sophia Chen",
    mentorId: 3,
    mentorName: "Bob Johnson",
    subject: "API Design Patterns",
    dateTime: new Date(Date.now() - 86400000).toISOString(),
    link: "https://meet.mentorcertai.com/mock103",
    completed: true,
  },
  {
    id: "104",
    studentId: 204,
    studentEmail: "james@example.com",
    studentName: "James Taylor",
    mentorId: 3,
    mentorName: "Bob Johnson",
    subject: "Database Optimization",
    dateTime: new Date(Date.now() - 172800000).toISOString(),
    link: "https://meet.mentorcertai.com/mock104",
    completed: true,
  },
  {
    id: "105",
    studentId: 205,
    studentEmail: "olivia@example.com",
    studentName: "Olivia Martinez",
    mentorId: 3,
    mentorName: "Bob Johnson",
    subject: "UI/UX Best Practices",
    dateTime: new Date(Date.now() + 345600000).toISOString(),
    link: "https://meet.mentorcertai.com/mock105",
    completed: false,
  },
  {
    id: "106",
    studentId: 206,
    studentEmail: "noah@example.com",
    studentName: "Noah Garcia",
    mentorId: 3,
    mentorName: "Bob Johnson",
    subject: "Mobile App Development",
    dateTime: new Date(Date.now() + 259200000).toISOString(),
    link: "https://meet.mentorcertai.com/mock106",
    completed: false,
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const filter = searchParams.get('filter') || 'all'
  
  let filteredSessions = mockSessions
  
  if (filter === 'upcoming') {
    filteredSessions = mockSessions.filter(session => !session.completed)
  } else if (filter === 'completed') {
    filteredSessions = mockSessions.filter(session => session.completed)
  }

  return NextResponse.json(filteredSessions)
} 