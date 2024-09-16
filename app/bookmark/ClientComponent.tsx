'use client';

import { useState, useEffect, useRef } from 'react';
import Card from '@/components/Card';
import styles from '@/style/list.module.css';
import { WebtoonInfo } from '@/types/type';

const SelectedCategory = [
    '전체보기',
    '월요웹툰',
    '화요웹툰',
    '수요웹툰',
    '목요웹툰',
    '금요웹툰',
    '토요웹툰',
    '일요웹툰',
    '완결',
    '정보없음',
];

export default function ClientComponent() {
    const [webtoons, setWebtoons] = useState<WebtoonInfo[]>();
    const [category, setCategory] = useState<string>('전체보기');
    const initialWebtoons = useRef<WebtoonInfo[]>([]); // 초기 전체 웹툰 목록을 저장

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
                    updateDays: webtoon.updateDays.map((day: string) =>
                        day.toUpperCase()
                    ), // updateDays를 대문자로 변환
                    fanCount: webtoon.fanCount ?? null,
                    kakaopage: webtoon.kakaopage ?? false,
                    url: webtoon.url ?? '',
                    isEnd: webtoon.isEnd ?? false,
                }));
                setWebtoons(updatedData);
                // 변환된 데이터로 LocalStorage 업데이트
                initialWebtoons.current = updatedData; // 초기 데이터 저장
                window.localStorage.setItem(
                    'bookmark',
                    JSON.stringify(updatedData)
                );
            } else {
                // 변환이 필요하지 않다면 그대로 사용
                setWebtoons(parsedData);
                initialWebtoons.current = parsedData; // 초기 데이터 저장
            }
        } else {
            //prev가 null이라면 빈 배열을 렌더링
            setWebtoons([]);
            initialWebtoons.current = []; // 초기 데이터 저장
        }
    }, []);

    useEffect(() => {
        if (initialWebtoons.current) {
            setWebtoons(setCategoryWebtoon(initialWebtoons.current, category));
        }
    }, [category]);

    const setCategoryWebtoon = (
        webtoons: WebtoonInfo[],
        category: string
    ): WebtoonInfo[] => {
        const filters: { [key: string]: (item: WebtoonInfo) => boolean } = {
            전체보기: () => true,
            정보없음: (item) =>
                item.isEnd === false && item.updateDays.length === 0,
            완결: (item) => item.isEnd === true,
            월요웹툰: (item) => item.updateDays.includes('MON'),
            화요웹툰: (item) => item.updateDays.includes('TUE'),
            수요웹툰: (item) => item.updateDays.includes('WED'),
            목요웹툰: (item) => item.updateDays.includes('THU'),
            금요웹툰: (item) => item.updateDays.includes('FRI'),
            토요웹툰: (item) => item.updateDays.includes('SAT'),
            일요웹툰: (item) => item.updateDays.includes('SUN'),
        };

        const filterFunction = filters[category];
        return filterFunction ? webtoons.filter(filterFunction) : [];
    };

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
                <div className={styles.bookmarknavigate}>
                    {SelectedCategory.map((item: string) => (
                        <button key={item} onClick={() => setCategory(item)}>
                            {item}
                        </button>
                    ))}
                </div>
                <h2 className={styles.searchcontent}>
                    북마크에 등록된 작품이 없습니다.
                </h2>
            </div>
        );
    }

    return (
        <div className={styles.background}>
            <div className={styles.bookmarknavigate}>
                {SelectedCategory.map((item: string) => (
                    <button key={item} onClick={() => setCategory(item)}>
                        {item}
                    </button>
                ))}
            </div>
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
                        isUpdated={webtoon.isUpdated}
                    />
                ))}
            </div>
        </div>
    );
}
