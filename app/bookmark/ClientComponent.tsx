'use client';

import { useState, useEffect, useRef } from 'react';
import Card from '@/components/Card';
import styles from '@/style/list.module.css';
import { CardInfo } from '@/types/type';
import { getBookMarkDataUpdate } from '@/utils/Bookmark';

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

const day: any = {
    0: '일요웹툰',
    1: '월요웹툰',
    2: '화요웹툰',
    3: '수요웹툰',
    4: '목요웹툰',
    5: '금요웹툰',
    6: '토요웹툰',
};

export default function ClientComponent() {
    const [webtoons, setWebtoons] = useState<CardInfo[]>();
    const [category, setCategory] = useState<string>(day[new Date().getDay()]);
    const initialWebtoons = useRef<CardInfo[]>([]); // 초기 전체 웹툰 목록을 저장

    useEffect(() => {
        const fetchData = async () => {
            const prev = window.localStorage.getItem('bookmark');
            let parsedData = [];

            if (prev) {
                // prev가 null이 아니라는 것은 데이터가 있다는 것
                parsedData = JSON.parse(prev);
                initialWebtoons.current = parsedData; // 초기 데이터 저장
            } else {
                // prev가 null이라면 빈 배열로 처리
                initialWebtoons.current = []; // 초기 데이터 저장
            }

            // 서버에서 최신 데이터 가져오기
            if (initialWebtoons.current?.length > 0) {
                const newWebtoons = await getBookMarkDataUpdate(
                    initialWebtoons.current
                );
                setWebtoons(setCategoryWebtoons(newWebtoons, category));
            } else {
                setWebtoons([]); // 데이터가 없는 경우 빈 배열 설정
            }
        };

        fetchData();
    }, [category]);

    const setCategoryWebtoons = (
        //요일별로 정렬
        webtoons: CardInfo[],
        category: string
    ): CardInfo[] => {
        const filters: { [key: string]: (item: CardInfo) => boolean } = {
            전체보기: () => true,
            정보없음: (item) =>
                item?.isEnd === false && item?.updateDays?.length === 0,
            완결: (item) => item.isEnd === true,
            월요웹툰: (item) => item?.updateDays?.includes('MON'),
            화요웹툰: (item) => item?.updateDays?.includes('TUE'),
            수요웹툰: (item) => item?.updateDays?.includes('WED'),
            목요웹툰: (item) => item?.updateDays?.includes('THU'),
            금요웹툰: (item) => item?.updateDays?.includes('FRI'),
            토요웹툰: (item) => item?.updateDays?.includes('SAT'),
            일요웹툰: (item) => item?.updateDays?.includes('SUN'),
        };

        const filterFunction = filters[category];
        return filterFunction ? webtoons?.filter(filterFunction) : [];
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
                        <div key={item}>
                            {category === item ? (
                                <button
                                    onClick={() => setCategory(item)}
                                    className={styles.selectedbtn}
                                >
                                    {item}
                                </button>
                            ) : (
                                <button
                                    onClick={() => setCategory(item)}
                                    className={styles.navigatebtn}
                                >
                                    {item}
                                </button>
                            )}
                        </div>
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
                    <div key={item}>
                        {category === item ? (
                            <button
                                onClick={() => setCategory(item)}
                                className={styles.selectedbtn}
                            >
                                {item}
                            </button>
                        ) : (
                            <button
                                onClick={() => setCategory(item)}
                                className={styles.navigatebtn}
                            >
                                {item}
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.container}>
                {webtoons?.map((webtoon: CardInfo) => (
                    <Card
                        key={webtoon.id}
                        id={webtoon.id}
                        thumbnail={webtoon.thumbnail}
                        title={webtoon.title}
                        authors={webtoon.authors}
                        provider={webtoon.provider}
                        setWebtoons={setWebtoons}
                        setCategoryWebtoons={setCategoryWebtoons}
                        category={category}
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
