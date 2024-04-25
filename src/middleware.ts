import Signup from "@/app/(auth)/signup/page"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const session = await supabase.auth.getSession()
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session.data.session) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }
  const emailLinkError = "Email Link Is Invalid Or Has Expired"
  if (
    req.nextUrl.searchParams.get("error_description") === emailLinkError &&
    req.nextUrl.pathname !== "signup"
  ) {
    return NextResponse.redirect(
      new URL(
        `/signup?error_description=${req.nextUrl.searchParams.get(
          "error_description"
        )}`,
        req.url
      )
    )
  }
  if (["/login", "/signup"].includes(req.nextUrl.pathname)) {
    if (session.data.session) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }
  return res
}
