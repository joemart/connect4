import {NextResponse} from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request:NextRequest){
    //do something
    console.log(request.nextUrl.pathname)
    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\.svg|register).*)"]
}