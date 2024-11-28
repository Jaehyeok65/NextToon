'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation'; // Pathname을 얻기 위한 훅

const useScroll = (delay = 3000) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const pathname = usePathname(); // 커스텀 훅 내에서 pathname을 직접 호출

    // 스크롤 값을 sessionStorage에 저장
    useEffect(() => {
        const throttling = () => {
            if (!timerRef.current) {
                if (typeof window !== 'undefined') {
                    timerRef.current = setTimeout(() => {
                        const scrollY = window.scrollY;
                        if (scrollY !== 0 && pathname) {
                            window.sessionStorage.setItem(
                                `${pathname}_scroll`,
                                scrollY.toString()
                            );
                        }
                        timerRef.current = null;
                    }, delay);
                }
            }
        };

        window.addEventListener('scroll', throttling);

        return () => {
            window.removeEventListener('scroll', throttling);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [delay, pathname]); // pathname을 의존성 배열에 추가하여 pathname 변경 시에도 반응하도록 함

    // pathname이 변경될 때마다 이전에 저장된 스크롤 값을 복원
    useEffect(() => {
        const scrolly = window.sessionStorage.getItem(`${pathname}_scroll`);
        if (scrolly) {
            window.scrollTo({
                top: Number(scrolly),
            });
        }
    }, [pathname]); // pathname이 변경될 때마다 스크롤 복원
};

export default useScroll;
