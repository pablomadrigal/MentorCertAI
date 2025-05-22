import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function withAuth(
  handler: (req: Request, user: unknown) => Promise<NextResponse>
) {


  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )






  return async (req: Request) => {
    try {
      const supabase = createRouteHandlerClient({ cookies })
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error || !session) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }

      return handler(req, session.user)
    } catch (error) {
      return NextResponse.json(
        { error: 'Internal Server Error', details: error },
        { status: 500 }
      )
    }
  }
}

export async function withOptionalAuth(
  handler: (req: Request, user: unknown | null) => Promise<NextResponse>
) {
  return async (req: Request) => {
    try {
      const supabase = createRouteHandlerClient({ cookies })
      const { data: { session } } = await supabase.auth.getSession()
      return handler(req, session?.user || null)
    } catch (error) {
      return NextResponse.json(
        { error: 'Internal Server Error', details: error },
        { status: 500 }
      )
    }
  }
} 