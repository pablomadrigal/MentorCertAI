import { NextResponse } from "next/server"

// In-memory database for students
const students = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "student" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "student" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "mentor" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "mentor" },
]

export async function GET() {
  return NextResponse.json(students)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, role } = body

    // Check if student already exists
    const existingStudent = students.find((s) => s.email === email)
    if (existingStudent) {
      return NextResponse.json(existingStudent)
    }

    // Create new student
    const newStudent = {
      id: students.length + 1,
      name: email.split("@")[0], // Generate a name from email
      email,
      role,
    }

    students.push(newStudent)

    return NextResponse.json(newStudent)
  } catch (error) {
    console.error("Error creating student:", error)
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 })
  }
}
