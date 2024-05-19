'use client';

import React, { useState, useEffect, useRef } from 'react';

// MockProvider 컴포넌트
export default function MockProvider({ children }: { children: React.ReactNode }) {
    const [isMocking, setIsMocking] = useState(false);
    const isWorkerStarted = useRef(false);

    useEffect(() => {
        async function enableApiMocking() {
            if (typeof window !== 'undefined' && !isWorkerStarted.current) {
                isWorkerStarted.current = true;
                const { worker } = await import('./browser');
                await worker.start();
                console.log('Worker started');
                setIsMocking(true);
            }
        }

        enableApiMocking();
    }, []);

    if (!isMocking) {
        return null; // Worker 활성화 전에는 컴포넌트를 렌더링하지 않음
    }

    return <>{children}</>; // Worker 활성화 후 컴포넌트 렌더링
}
