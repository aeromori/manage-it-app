import { NextResponse } from "next/server";

//  middleware
export function proxy(request: any) {
    const token = request.cookies.get("user")?.value;
    const { pathname } = new URL(request.url);

    //  just add the routes you want to protect
    const protectedRoutes = ["/", "/users"];

    // redirect to home if user is logged in and trying to access login page
    if (token && pathname === "/login") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // redirect to login if user is not logged in and trying to access protected routes
    if (!token && protectedRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/users", "/login"],
};
