'use client';
import React, { useEffect, useState } from 'react';
import { getServiceTotalList } from '@/services/API';
import { useInfiniteQuery } from '@tanstack/react-query';
import Card from '@/components/Card';
import styles from '@/style/list.module.css';
import { WebtoonInfo } from '@/types/type';
import useScroll from '@/hooks/useScroll';

export default function ClientComponent({ service }: { service: string }) {
    const { fetchNextPage, hasNextPage, isFetchingNextPage, isPending, data } =
        useInfiniteQuery({
            queryKey: ['total', service],
            queryFn: ({ pageParam = 0 }) => {
                return getServiceTotalList(pageParam, service);
            },
            getNextPageParam: (lastPage, allPages) => {
                if (lastPage?.webtoons?.length < 1000) {
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

    useEffect(() => {
        if (hasNextPage) {
            getTotalWebtoons();
        }
    }, [hasNextPage, data]);

    useEffect(() => {
        if (!hasNextPage) {
            if (data) {
                //데이터가 있을 때만 처리하도록 로직 설계
                setWebtoons(getSortByFanCount(data?.pages));
            }
        }
    }, [hasNextPage]);

    useEffect(() => {
        if (scroll) {
            //scrorll이 0임을 방지
            window.sessionStorage.setItem(
                `sortedlist/${service}_scroll`,
                scroll.toString()
            );
        }
    }, [scroll, service]);

    useEffect(() => {
        const scrolly = window.sessionStorage.getItem(`sortedlist/${service}_scroll`);
        if (scrolly && webtoons) {
            window.scrollTo({
                top: Number(scrolly),
            });
        }
    }, [service, webtoons]);

    const getTotalWebtoons = () => {
        fetchNextPage();
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
    //console.log(data?.pages);

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
                {webtoons?.slice(0, 300).map((webtoon: WebtoonInfo) => (
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
        </div>
    );
}
