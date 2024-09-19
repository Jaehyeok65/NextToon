'use client';

import { useState, useEffect, useRef } from 'react';
import Card from '@/components/Card';
import styles from '@/style/list.module.css';
import { WebtoonInfo } from '@/types/type';
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
    const [webtoons, setWebtoons] = useState<WebtoonInfo[]>();
    const [category, setCategory] = useState<string>(day[new Date().getDay()]);
    const initialWebtoons = useRef<WebtoonInfo[]>([]); // 초기 전체 웹툰 목록을 저장

    useEffect(() => {
        const prev = window.localStorage.getItem('bookmark');
        if (prev) {
            //prev가 null이 아니라는 것은 데이터가 있다는 것
            let parsedData = JSON.parse(prev);
            setWebtoons(setCategoryWebtoon(parsedData, category));
            initialWebtoons.current = parsedData; // 초기 데이터 저장
        } else {
            //prev가 null이라면 빈 배열을 렌더링
            setWebtoons([]);
            initialWebtoons.current = []; // 초기 데이터 저장
        }
    }, []);

    useEffect(() => {
        if (initialWebtoons.current) {
            const fetchData = async () => {
                await getUpdateData();
            };

            fetchData();
        }
    }, [category]);

    const getUpdateData = async () => {
        //북마크에 있는 데이터들을 서버에서 최신화
        if (initialWebtoons.current) {
            const newWebtoons = await getBookMarkDataUpdate(
                initialWebtoons.current
            );
            setWebtoons(setCategoryWebtoon(newWebtoons, category));
        }
    };

    const setCategoryWebtoon = (
        //요일별로 정렬
        webtoons: WebtoonInfo[],
        category: string
    ): WebtoonInfo[] => {
        const filters: { [key: string]: (item: WebtoonInfo) => boolean } = {
            전체보기: () => true,
            정보없음: (item) =>
                item.isEnd === false && item.updateDays.length === 0,
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
