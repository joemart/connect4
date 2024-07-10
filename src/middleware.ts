import {NextResponse, type NextRequest} from "next/server"

export function middleware(request:NextRequest){

    // const user = ""

    // if(!user)
    //     return Response.redirect(new URL("/", request.url))
    // if(!request.nextUrl.pathname.startsWith("/potato/aaa"))
    //     return Response.redirect(new URL("/potato/aaa"))

    return NextResponse.next()
}

export const config = {
    // matcher: ["/register"]
}