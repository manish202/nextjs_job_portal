import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/features/auth/sessions";

const protectedRoutes = [
    {role: "admin", path: "/dashboard/admin"},
    {role: "applicant", path: "/dashboard/applicant"},
    {role: "employer", path: "/dashboard/employer"},
];

export const proxy = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const isProtectedRoute = protectedRoutes.some(({path}) => pathname.startsWith(path));
    if(isProtectedRoute){
        // check authentication
        const {status,user} = await getCurrentUser();
        if(!status) return NextResponse.redirect(new URL("/login", request.url));
        // check authorization
        const {path} = protectedRoutes.find(({role}) => role === user?.role) ?? {path:"/login"};
        if(!pathname.startsWith(path)) return NextResponse.redirect(new URL(path, request.url));
    }
    // if user is already loggedin then redirect them.
    if(['/login','/register'].includes(pathname)){
        const {status,message,user} = await getCurrentUser();
        if(status){
            const {path} = protectedRoutes.find(({role}) => role === user?.role) ?? {path:"/"};
            return NextResponse.redirect(new URL(path, request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        // Exclude API routes, static files, image optimizations, and .png files
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
}