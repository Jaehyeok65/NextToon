'use client';

import { useEffect, useRef, useState } from 'react';

const useScroll = (delay = 3000) => {
    const [scrollY, setScrollY] = useState(0);
    const timerRef: any = useRef(null);

    const throttling = () => {
        if (!timerRef.current) {
            timerRef.current = setTimeout(() => {
                setScrollY(() => window.scrollY);
                timerRef.current = null;
            }, delay);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', throttling);

        return () => {
            window.removeEventListener('scroll', throttling);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return scrollY;
};

export default useScroll;
