'use client';

import { useEffect } from 'react';
import style from '@/style/error.module.css';
import { onResetBookmark } from '@/utils/Bookmark';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    const onClickResetBtn = async () => {
        try {
            await onResetBookmark(); // onResetBookmark가 완료될 때까지 대기
            reset(); // 완료된 후 reset() 실행
        } catch (error) {
            console.error('북마크 리셋 중 오류 발생:', error);
        }
    };

    return (
        <div className={style.background}>
            <h3>에러가 발생했습니다.</h3>
            <h4>다시 시도하려면 아래 버튼을 클릭해주세요.</h4>
            <button onClick={onClickResetBtn}>다시 시도</button>
        </div>
    );
}
