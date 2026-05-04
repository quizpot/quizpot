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
		'/((?!api|img|_next/static|_next/image|favicon.ico|robots.txt).*)',
	],
};