import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const publicRoutes = [
	"/auth/signin", 
	"/auth/signup", 
	"/",
	"/play"
];

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const isPublicRoute = publicRoutes.includes(pathname);

	if (isPublicRoute) {
		return NextResponse.next();
	}

	const session = await auth.api.getSession({
		headers: await headers()
	});

	if (!session) {
		return NextResponse.redirect(new URL("/auth/signin", request.url));
	}

	return NextResponse.next();
};

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, robots.txt (metadata files)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
	],
};