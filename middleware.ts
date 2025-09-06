import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
const protectedRoutes = '/dashboard';
export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const sessionCookie = getSessionCookie(request);
  	const isProtectedRoute = pathname.startsWith(protectedRoutes);
	// Redirect unauthenticated users to /login
	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
	let res = NextResponse.next();
	return res;
}

export const config = {
	matcher: ["/dashboard/:path*"], // Protect /dashboard and all subroutes
};