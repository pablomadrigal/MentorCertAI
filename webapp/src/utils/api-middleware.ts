import { NextResponse } from 'next/server'
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.SUPABASE_JWT_SECRET || ''

interface JWTPayload {
  userId: string;
  email: string;
  [key: string]: unknown;
}

export async function withAuth(
  req: Request,
  handler: (req: Request, user: JWTPayload) => Promise<NextResponse>
) {
  try {
    const authHeader = req.headers.get('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    
    return handler(req, decoded)
  } catch (error: unknown) {
    console.error('JWT verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    )
  }
}