"use client"

import { useRef, useCallback, useEffect } from 'react';

const useObserver = (hasNextPage: boolean, fetchNextPage: any) => {
    const ref = useRef<HTMLDivElement>(null);
    const target = useRef<NodeJS.Timeout | null>(null);

    const observerCallback = useCallback(
        ([entries]: any) => {
            if (entries.isIntersecting && hasNextPage) {
                if (!target.current) {
                    target.current = setTimeout(() => {
                        target.current = null;
                    }, 1000);
                    fetchNextPage();
                }
            }
        },
        [hasNextPage]
    );

    const option = { threshold: 0.25, rootMargin: '80px' };

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(observerCallback, option);
        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref, option, useCallback]);

    return ref;
};

export default useObserver;
