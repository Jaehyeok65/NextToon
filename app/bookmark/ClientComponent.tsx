'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import styles from '@/style/list.module.css';
import { WebtoonInfo } from '@/types/type';

export default function ClientComponent() {
    const [webtoons, setWebtoons] = useState<WebtoonInfo[]>();

    useEffect(() => {
        const prev = window.localStorage.getItem('bookmark');
        if (prev) {
            //prev가 null이 아니라는 것은 데이터가 있다는 것
            setWebtoons(JSON.parse(prev));
        } else {
            //prev가 null이라면 빈 배열을 렌더링
            setWebtoons([]);
        }
    }, []);

    if (!webtoons) {
        return (
            <div className={styles.background}>
                <h2 className={styles.searchcontent}>Loading...</h2>
            </div>
        );
    }

    if (webtoons?.length === 0) {
        return (
            <div className={styles.background}>
                <h2 className={styles.searchcontent}>
                    북마크에 등록된 작품이 없습니다.
                </h2>
            </div>
        );
    }

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                {webtoons?.map((webtoon: WebtoonInfo) => (
                    <Card
                        key={webtoon.id}
                        id={webtoon.id}
                        thumbnail={webtoon.thumbnail}
                        title={webtoon.title}
                        authors={webtoon.authors}
                        provider={webtoon.provider}
                        setWebtoons={setWebtoons}
                        updateDays={webtoon.updateDays}
                        fanCount={webtoon.fanCount}
                        isEnd={webtoon.isEnd}
                    />
                ))}
            </div>
        </div>
    );
}
