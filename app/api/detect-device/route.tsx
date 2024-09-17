// app/api/detect-device/route.ts

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const userAgent = request.headers.get('user-agent') || '';
    let depth = 4; // 기본값을 데스크탑 크기로 설정

    if (/Mobi|Android/i.test(userAgent)) {
        depth = 1; // 모바일 화면일 때 depth를 1로 설정
    }

    return NextResponse.json({ depth });
}
