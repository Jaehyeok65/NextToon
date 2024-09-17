import { NextResponse, userAgent } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    
    const userAgent = request.headers.get('user-agent') || '';

    if (/Mobi|Android/i.test(userAgent)) {
        request.nextUrl.pathname = 'device/mobile';
    }
    else {
        request.nextUrl.pathname = 'device/desktop';
    }
    return NextResponse.rewrite(request.nextUrl);
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}