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
            let parsedData = JSON.parse(prev);
            // 데이터가 이미 변환된 구조인지 확인
            const needsTransformation = parsedData.some(
                (webtoon: any) =>
                    !webtoon.id ||
                    !Array.isArray(webtoon.thumbnail) ||
                    !Array.isArray(webtoon.authors)
            );

            if (needsTransformation) {
                // 데이터 변환 로직
                const updatedData = parsedData.map((webtoon: any) => ({
                    id: webtoon._id,
                    thumbnail: Array.isArray(webtoon.img)
                        ? webtoon.img
                        : [webtoon.img], // thumbnail은 배열로 변환
                    title: webtoon.title,
                    authors: Array.isArray(webtoon.author)
                        ? webtoon.author
                        : [webtoon.author], // authors는 배열로 변환
                    provider: webtoon.service,
                    updateDays: webtoon.updateDays,
                    fanCount: webtoon.fanCount ?? null,
                    kakaopage: webtoon.kakaopage ?? false,
                    url: webtoon.url ?? '',
                    isEnd: webtoon.isEnd ?? false,
                }));
                setWebtoons(updatedData);
                // 변환된 데이터로 LocalStorage 업데이트
                window.localStorage.setItem(
                    'bookmark',
                    JSON.stringify(updatedData)
                );
            } else {
                // 변환이 필요하지 않다면 그대로 사용
                setWebtoons(parsedData);
            }
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
