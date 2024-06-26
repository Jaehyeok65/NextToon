'use client';

import { useEffect } from 'react';
import style from '@/style/error.module.css';

export default function ErrorComponent({
    error,
    reset,
}: {
    error?: Error;
    reset?: () => void;
}) {
    useEffect(() => {
        error && console.error(error);
    }, [error]);

    return (
        <div className={style.background}>
            <h3>에러가 발생했습니다.</h3>
            {reset && <h4>다시 시도하려면 아래 버튼을 클릭해주세요.</h4>}
            {reset && (
                <button
                    onClick={
                        () => reset()
                    }
                >
                    다시 시도
                </button>
            )}
        </div>
    );
}
