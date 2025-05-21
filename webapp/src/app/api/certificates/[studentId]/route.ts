import { NextRequest, NextResponse } from "next/server"

// In-memory database for certificates
const certificates = [
  {
    id: 1,
    studentId: "1",
    issueDate: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
    grade: 85,
  },
  {
    id: 2,
    studentId: "1",
    issueDate: new Date(Date.now() - 1209600000).toISOString(), // 2 weeks ago
    grade: 92,
  },
  {
    id: 3,
    studentId: "2",
    issueDate: new Date(Date.now() - 2592000000).toISOString(), // 1 month ago
    grade: 78,
  },
]

export async function GET(
  request: NextRequest,
  { params } : { params: Promise<{ studentId: string }> }
) {
    const { studentId } = await params;

  const studentCertificates = certificates.filter((c) => c.studentId === studentId)

  return NextResponse.json(studentCertificates)
}
