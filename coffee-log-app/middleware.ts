import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 未認証ユーザーをサインインページにリダイレクト
  // (coffee/ や profile/ へのアクセス時)
  if (!session && (
    req.nextUrl.pathname.startsWith('/coffee') || 
    req.nextUrl.pathname.startsWith('/profile')
  )) {
    const redirectUrl = new URL('/signin', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // 認証済みユーザーをダッシュボードにリダイレクト
  // (signin や signup へのアクセス時)
  if (session && (
    req.nextUrl.pathname.startsWith('/signin') || 
    req.nextUrl.pathname.startsWith('/signup')
  )) {
    const redirectUrl = new URL('/coffee', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ['/coffee/:path*', '/profile/:path*', '/signin', '/signup'],
}