import { NextResponse } from "next/server"

// In-memory database for NFTs
const nfts = [
  {
    id: 1,
    certificateId: 1,
    metadata: {
      name: "MentorCertAi Achievement - Web Development",
      description:
        "This NFT certifies the successful completion of a Web Development mentoring session and passing the certification exam.",
      image: "/placeholder.svg?key=2wtlb",
      attributes: [
        {
          trait_type: "Course",
          value: "Web Development",
        },
        {
          trait_type: "Grade",
          value: "85%",
        },
        {
          trait_type: "Date",
          value: new Date(Date.now() - 604800000).toLocaleDateString(),
        },
        {
          trait_type: "Student",
          value: "John Doe",
        },
      ],
    },
  },
  {
    id: 2,
    certificateId: 2,
    metadata: {
      name: "MentorCertAi Achievement - Data Science",
      description:
        "This NFT certifies the successful completion of a Data Science mentoring session and passing the certification exam.",
      image: "/data-science-certificate.png",
      attributes: [
        {
          trait_type: "Course",
          value: "Data Science",
        },
        {
          trait_type: "Grade",
          value: "92%",
        },
        {
          trait_type: "Date",
          value: new Date(Date.now() - 1209600000).toLocaleDateString(),
        },
        {
          trait_type: "Student",
          value: "John Doe",
        },
      ],
    },
  },
  {
    id: 3,
    certificateId: 3,
    metadata: {
      name: "MentorCertAi Achievement - UX Design",
      description:
        "This NFT certifies the successful completion of a UX Design mentoring session and passing the certification exam.",
      image: "/placeholder.svg?key=i3l1r",
      attributes: [
        {
          trait_type: "Course",
          value: "UX Design",
        },
        {
          trait_type: "Grade",
          value: "78%",
        },
        {
          trait_type: "Date",
          value: new Date(Date.now() - 2592000000).toLocaleDateString(),
        },
        {
          trait_type: "Student",
          value: "Jane Smith",
        },
      ],
    },
  },
]

export async function GET(request: Request, { params }: { params: { studentId: string } }) {
  // Get certificates for the student
  const response = await fetch(`http://localhost:3000/api/certificates/${params.studentId}`)
  const certificates = await response.json()

  // Get certificate IDs
  const certificateIds = certificates.map((cert: any) => cert.id)

  // Filter NFTs by certificate IDs
  const studentNFTs = nfts.filter((nft) => certificateIds.includes(nft.certificateId))

  return NextResponse.json(studentNFTs)
}
