import { NextResponse } from 'next/server'
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.SUPABASE_JWT_SECRET || ''

export interface JWTPayload {
  userId: string;
  email: string;
  role?: string;
  user_metadata?: JWTUserMetadata;
  [key: string]: unknown;
}

export interface JWTUserMetadata {
  accept_terms?: boolean;
  email?: string;
  email_verified?: boolean;
  full_name?: string;
  phone_verified?: boolean;
  private_key?: string;
  public_key?: string;
  role?: string;
  sub?: string;
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
    if (decoded?.user_metadata?.role) decoded.role = decoded.role as string
    return handler(req, decoded)
  } catch (error: unknown) {
    console.error('JWT verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    )
  }
}