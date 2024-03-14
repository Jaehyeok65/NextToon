'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import style from '@/style/main.module.css';

export default function Home() {
    const router = useRouter();

    return (
        <div className={style.background}>
            <div onClick={() => router.push('/list')}>전체웹툰 바로가기</div>
            <div onClick={() => router.push('/list/naver')}>
                네이버 웹툰 바로가기
            </div>
            <div onClick={() => router.push('/list/kakao')}>
                카카오 웹툰 바로가기
            </div>
            <div onClick={() => router.push('/list/kakaopage')}>
                카카오페이지 웹툰 바로가기
            </div>
            <div onClick={() => router.push('/sortedlist')}>
                인기 웹툰 바로가기
            </div>
            <div onClick={() => router.push('/bookmark')}>북마크 바로가기</div>
        </div>
    );
}
