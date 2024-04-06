'use client';
import React, { useEffect, useState } from 'react';
import { getTotalList } from '@/services/API';
import { useInfiniteQuery } from '@tanstack/react-query';
import Card from '@/components/Card';
import styles from '@/style/list.module.css';
import { WebtoonInfo } from '@/types/type';
import useScroll from '@/hooks/useScroll';
import { getCurrentDepth, setCurrentDepth } from '@/utils/SortedUtil';

export default function ClientComponent() {
    const perPage = 5000;
    const defaultdepth = 1000;
    const { fetchNextPage, hasNextPage, isFetchingNextPage, isPending, data } =
        useInfiniteQuery({
            queryKey: ['total'],
            queryFn: ({ pageParam = 0 }) => {
                return getTotalList(pageParam, perPage);
            },
            getNextPageParam: (lastPage, allPages) => {
                if (lastPage?.webtoons?.length < perPage) {
                    return undefined;
                } else {
                    return allPages.length;
                }
            },
            initialPageParam: 0,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
            staleTime: 600000,
        });

    const scroll = useScroll();

    const [webtoons, setWebtoons] = useState<any>();
    const [depth, setDepth] = useState<number>(1000);

    useEffect(() => {
        if (hasNextPage) {
            getTotalWebtoons();
        }
    }, [hasNextPage, data]);

    useEffect(() => {
        if (!hasNextPage) {
            if (data) {
                //데이터가 있을 때만 처리하도록 로직 설계
                setWebtoons(getFilterByFinished(data?.pages));
            }
        }
    }, [hasNextPage]);

    useEffect(() => {
        if (scroll) {
            //scrorll이 0임을 방지
            window.sessionStorage.setItem(
                `sortedlist/finish_scroll`,
                scroll.toString()
            );
        }
    }, [scroll]);

    useEffect(() => {
        const scrolly = window.sessionStorage.getItem(
            `sortedlist/finish_scroll`
        );
        if (scrolly && webtoons) {
            window.scrollTo({
                top: Number(scrolly),
            });
        }
    }, [webtoons]);

    useEffect(() => {
        const current = getCurrentDepth('finish');
        if (current) {
            setDepth(current);
        }
    }, []);

    const getTotalWebtoons = () => {
        fetchNextPage();
    };

    const getFilterByFinished = (data: any) => {
        let array: any = [];
        data.map((item: any) => (array = [...array, item.webtoons]));
        const Array = array.reduce(
            (acc: any, curr: number) => acc.concat(curr),
            []
        );
        const finishedArray = Array.filter(
            (item: any) => item.updateDays[0] === 'finished'
        );
        const sortedArray = finishedArray.sort(
            (a: any, b: any) => b.fanCount - a.fanCount
        );
        return sortedArray;
    };

    const getSortByFanCount = (data: any) => {
        //데이터를 fanCount 내림차순으로 정렬
        let array: any = [];
        data.map((item: any) => (array = [...array, item.webtoons]));
        const Array = array.reduce(
            (acc: any, curr: number) => acc.concat(curr),
            []
        );
        const sortedArray = Array.sort(
            (a: any, b: any) => b.fanCount - a.fanCount
        );
        return sortedArray;
    };

    const getNextWebtoons = () => {
        //다음 웹툰 리스트를 가져옴
        if (depth === webtoons.length) {
            //depth와 length가 같다면 더이상 가져올 다음 데이터가 없다는 뜻
            window.alert('마지막 페이지입니다.');
            return;
        }

        if (depth + defaultdepth > webtoons.length) {
            setDepth(webtoons.length);
            setCurrentDepth('finish', webtoons.length);
        } else {
            setDepth((prev) => prev + defaultdepth);
            setCurrentDepth('finish', depth + defaultdepth);
        }
    };

    if (!webtoons) {
        return (
            <div className={styles.background}>
                <h2 className={styles.searchcontent}>Loading...</h2>
            </div>
        );
    }

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                {webtoons?.slice(0, depth).map((webtoon: WebtoonInfo) => (
                    <Card
                        key={webtoon._id}
                        _id={webtoon._id}
                        img={webtoon.img}
                        title={webtoon.title}
                        author={webtoon.author}
                        service={webtoon.service}
                        setWebtoons={setWebtoons}
                        updateDays={webtoon.updateDays}
                        fanCount={webtoon.fanCount}
                    />
                ))}
            </div>
            <div>
                <button onClick={getNextWebtoons} className={styles.flexbtn}>
                    더 보기
                </button>
            </div>
        </div>
    );
}
