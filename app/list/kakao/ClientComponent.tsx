'use client';
import React, { useEffect, useState } from 'react';
import { getServiceWebtoonList } from '@/services/API';
import { useInfiniteQuery } from '@tanstack/react-query';
import useObserver from '@/hooks/useObserver';
import Card from '@/components/Card';
import Skeleton from '@/utils/Skeleton';
import styles from '@/style/list.module.css';
import { WebtoonInfo } from '@/types/type';
import useScroll from '@/hooks/useScroll';
import { usePathname } from 'next/navigation';
import Error from '@/utils/ErrorComponent';

export default function Client2() {
    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        data,
        isError,
        error,
        refetch,
    } = useInfiniteQuery({
        queryKey: ['kakaowebtoon'],
        queryFn: ({ pageParam = 0 }) => {
            return getServiceWebtoonList(pageParam, 'kakao');
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.webtoons?.length < 12) {
                return undefined;
            } else {
                return allPages.length;
            }
        },
        initialPageParam: 0,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        retry: false,
        staleTime: 600000,
    });

    const ref = useObserver(hasNextPage, fetchNextPage);
    const scroll = useScroll(); //스크롤 높이 저장용
    const pathname = usePathname();

    useEffect(() => {
        if (scroll) {
            //scrorll이 0임을 방지
            window.sessionStorage.setItem(
                `${pathname}_scroll`,
                scroll.toString()
            );
        }
    }, [scroll, pathname]);

    useEffect(() => {
        const scrolly = window.sessionStorage.getItem(`${pathname}_scroll`);
        if (scrolly) {
            window.scrollTo({
                top: Number(scrolly),
            });
        }
    }, [pathname]);

    if (isError) {
        return <Error error={error} reset={refetch} />;
    }

    return (
        <>
            <div className={styles.background}>
                <div className={styles.container}>
                    {data?.pages.map((page: any) =>
                        page?.webtoons?.map((webtoon: WebtoonInfo) => (
                            <Card
                                key={webtoon._id}
                                _id={webtoon._id}
                                img={webtoon.img}
                                title={webtoon.title}
                                author={webtoon.author}
                                service={webtoon.service}
                                updateDays={webtoon.updateDays}
                                fanCount={webtoon.fanCount}
                            />
                        ))
                    )}
                </div>
                {!isPending && <div ref={ref}></div>}
                {isFetchingNextPage && <Skeleton />}
            </div>
        </>
    );
}
